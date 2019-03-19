import request from 'superagent'
import polyline from '@mapbox/polyline'
import QuickLRU from 'quick-lru'
import { Agent } from 'http'
import numeral from 'numeral'
import simplify from './simplify'
import _ from 'lodash'

const { pelias } = global.__vandelay_util_config
const lru = new QuickLRU({ maxSize: 10000 })
const agent = new Agent({ keepAlive: true })

const types = {
  driving: 'auto',
  walking: 'pedestrian',
  cycling: 'bicycle',
  bus: 'bus'
}

const encodePath = (path) => _.map(simplify(path, { tolerance: 0.000001 }).coordinates, (i) => ({
  lon: numeral(i[0].toFixed(6)).value(), // Valhalla wants 6-digit precision
  lat: numeral(i[1].toFixed(6)).value()
}))


export default async ({ type, path, optional }) => {
  if (!pelias) throw new Error('Missing pelias configuration option (in geo.snap)')
  if (!types[type]) throw new Error(`Invalid type: ${type} (in geo.snap)`)
  if (!path || !path.coordinates) throw new Error('Missing path (in geo.snap)')
  if (path.type !== 'LineString') throw new Error('Invalid path type, expected LineString (in geo.snap)')

  const q = {
    costing: types[type],
    shape: encodePath(path)
  }

  // check if cache has it first
  const lruKey = JSON.stringify(q)
  if (lru.has(lruKey)) return lru.get(lruKey)

  // not in cache, fetch it
  let out
  try {
    const { body } = await request.post(pelias.hosts.trace)
      .retry(10)
      .type('json')
      .set('apikey', pelias.key)
      .agent(agent)
      .send(q)
    out = polyline.toGeoJSON(body.trip.legs[0].shape, 6)
  } catch (err) {
    if (!optional) {
      if (err.response && err.response.body && err.response.body.error) {
        throw new Error(`${err.response.body.error} (in geo.snap)`)
      }
      throw new Error(`${err.message || err} (in geo.snap)`)
    }
  }
  if (!out && optional) out = path

  // put it in cache for later
  lru.set(lruKey, out)
  return out
}
