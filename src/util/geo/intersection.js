import request from 'superagent'
import capitalize from '../capitalize'
import handleQuery from '../../lib/pelias'
import * as turf from '@turf/turf'
import { trim, uniq, flatten, intersection as findIntersection } from 'lodash'

const { pelias } = global.__vandelay_util_config

// make sure geonames isnt used! https://github.com/pelias/pelias/issues/326
const defaultSources = [
  'whosonfirst',
  'openstreetmap',
  'openaddresses'
]
const locateCity = async ({ city, region, sources }) => {
  // specifying country here returns bad results
  const query = {
    text: `${city}, ${region}`,
    size: 1,
    layers: 'coarse', // anything but address and venue
    sources: sources ? sources.join(',') : undefined
  }
  const opts = {
    query,
    host: pelias.hosts.search
  }
  return handleQuery(opts)
}

const runOverpassQuery = async (query) => {
  const qs = `[out:json];
    ${query}
  out body;`
  const { body } = await request
    .post('https://overpass-api.de/api/interpreter')
    .send(qs)
    .retry(10)
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

export default async ({ intersection, city, region, sources = defaultSources }) => {
  if (!pelias) throw new Error('Missing pelias configuration option (in geo.locate)')
  const cityRes = await locateCity({ city, region, sources }) // get city's bounding box

  if (!cityRes) return null // couldn't locate city

  // use bounding box in searches
  const streets = intersection.split(intersectionSplitExp).map(trim) // split street intersections on forward slash and comma
  const waysData = await Promise.all(streets.map(async (street) => {
    const way = await locateWay({ street, bbox: cityRes.bbox })
    return uniq(flatten(way.elements.map((e) => e.nodes)))
  }))
  const intersectionNodeId = findIntersection(waysData[0], waysData[1])
  const node = await lookupNodeId(intersectionNodeId)
  return turf.point([ node.lon, node.lat ]).geometry
}
