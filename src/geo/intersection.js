import request from 'superagent'
import QuickLRU from 'quick-lru'
import capitalize from '../capitalize'
import handleQuery from './../../lib/pelias'
import * as turf from '@turf/turf'
import { Agent } from 'http'
import { trim, uniq, flatten, intersection as findIntersection } from 'lodash'

const { pelias } = global.__vandelay_util_config
const cityLru = new QuickLRU({ maxSize: 1000 })
const wayLru = new QuickLRU({ maxSize: 8000 })

const agent = new Agent({ keepAlive: true })

const locateCity = async ({ city, region, country }) => {
  const query = {
    text: `${city}, ${region} ${country}`,
    size: 1
  }

  // check if cache has it first
  const lruKey = JSON.stringify(query)
  if (cityLru.has(lruKey)) return cityLru.get(lruKey)

  const opts = {
    query,
    host: pelias.hosts.search
  }
  // not in cache, fetch it
  const out = await handleQuery(opts)
  if (!out) return
  // put it in cache for later
  cityLru.set(lruKey, out)
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
  if (wayLru.has(query)) return wayLru.get(query)
  const out = runOverpassQuery(query)
  wayLru.set(query, out)
  return out
}

const lookupNodeId = async (nodeId) => {
  const { elements } = await runOverpassQuery(`node(${nodeId});`)
  return elements[0]
}

const intersectionSplitExp = /[/,]/

export default async ({ intersection, city, region, country }) => {
  if (!pelias) throw new Error('Missing pelias configuration option (in geo.locate)')
  const { bbox } = await locateCity({ city, region, country }) //get city's bounding box

  // use bounding box in searches
  const streets = intersection.split(intersectionSplitExp).map(trim) // split street intersections on forward slash and comma
  const waysData = await Promise.all(streets.map(async (street) => {
    const way = await locateWay({ street, bbox })
    return uniq(flatten(way.elements.map((e) => e.nodes)))
  }))
  const intersectionNodeId = findIntersection(waysData[0], waysData[1])
  const node = await lookupNodeId(intersectionNodeId)
  return turf.point([ node.lon, node.lat ]).geometry
}
