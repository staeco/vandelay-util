import request from 'superagent'
import QuickLRU from 'quick-lru'
import { Agent } from 'http'
import geojson from './geojson'
import capitalize from '../capitalize'
import _ from '../_'

const { pelias } = global.__vandelay_util_config
const agent = new Agent({ keepAlive: true })
const lru = new QuickLRU({ maxSize: 10000 })

const makeRequest = async (opts) =>
  request.get(opts.host)
    .retry(10)
    .type('json')
    .agent(agent)
    .set('apikey', pelias.key)
    .query(opts.query)

const parseResponse = (body) => {
  const res = body.features[0]
  return {
    type: res.geometry.type,
    coordinates: res.geometry.coordinates,
    bbox: res.bbox,
    properties: {
      short: res.properties.name,
      full: res.properties.label,
      city: res.properties.locality,
      county: res.properties.county,
      region: res.properties.region,
      country: res.properties.country
    }
  }
}

const handleQuery = async (opts) => {
  try {
    const { body } = await makeRequest(opts)
    if (!body || !body.features || !body.features[0]) return
    return parseResponse(body)
  } catch (err) {
    throw new Error(`${err.message || err} (in geo.locate)`)
  }
}

const locateCity = async ({ city, region, country }) => {
  const query = {
    text: `${city}, ${region} ${country}`,
    size: 1
  }

  // check if cache has it first
  const lruKey = JSON.stringify(query)
  if (lru.has(lruKey)) return lru.get(lruKey)

  const opts = {
    query,
    host: pelias.hosts.search
  }
  // not in cache, fetch it
  const out = handleQuery(opts)
  if (!out) return
  // put it in cache for later
  lru.set(lruKey, out)
  return out
}

const runOverpassQuery = async (query) => {
  const qs = `[out:json];
    ${query}
  out body;`
  const { body } = await request
    .post('http://overpass-api.de/api/interpreter')
    .send(qs)
    .retry(10)
    .agent(agent)
  return body
}

const locateWay = async ({ street, bbox }) => {
  const query = `way
      ["name"~"${capitalize.words(street)}"]
      (${bbox[1]}, ${bbox[0]}, ${bbox[3]}, ${bbox[2]});`
  return runOverpassQuery(query)
}

const lookupNodeId = async (nodeId) => {
  const { elements } = await runOverpassQuery(`node(${nodeId});`)
  return elements[0]
}

const intersectionSplitExp = /[/,]/

const locateIntersection = async ({ intersection, city, region, country }) => {
  const { bbox } = await locateCity({ city, region, country }) //get city's bounding box

  // use bounding box in searches
  const streets = _.map(intersection.split(intersectionSplitExp), _.trim) // split street intersections on forward slash and comma
  const waysData = await Promise.all(_.map(streets, async (street) => {
    const way = await locateWay({ street, bbox })
    return _.uniq(_.flatten(_.map(way.elements, (e) => e.nodes)))
  }))
  const intersectionNodeId = _.intersection(waysData[0], waysData[1])
  const node = await lookupNodeId(intersectionNodeId)
  return geojson(node)
}

export default async ({ address, city, region, country }) => {
  if (!pelias) throw new Error('Missing pelias configuration option (in geo.locate)')
  if (!address) throw new Error('Missing address text (in geo.locate)')
  const query = {
    locality: city,
    region,
    country,
    address
  }

  // check if cache has it first
  const lruKey = JSON.stringify(query)
  if (lru.has(lruKey)) return lru.get(lruKey)

  const opts = {
    query,
    host: pelias.hosts.structured
  }
  // not in cache, fetch it
  let out
  try {
    out = await handleQuery(opts)
  } catch (err) {
    out = await locateIntersection({ intersection: address, city, region, country })
  }
  if (!out) return
  // put it in cache for later
  lru.set(lruKey, out)
  return out
}
