import request from 'superagent'
import polyline from '@mapbox/polyline'
import QuickLRU from 'quick-lru'
import { Agent } from 'http'
import geoPrecision from 'geojson-precision'

const { pelias } = global.__vandelay_util_config
const lru = new QuickLRU({ maxSize: 10000 })
const agent = new Agent({ keepAlive: true })

const types = {
  driving: 'auto',
  walking: 'pedestrian',
  cycling: 'bicycle',
  bus: 'bus',
  any: 'multimodal'
}

export default async ({ type, start, end, optional }) => {
  if (!pelias) throw new Error('Missing pelias configuration option (in geo.navigate)')
  if (!types[type]) throw new Error(`Invalid type: ${type} (in geo.navigate)`)
  if (!start || !start.coordinates) throw new Error('Missing start coordinates (in geo.navigate)')
  if (!end || !end.coordinates) throw new Error('Missing end coordinates (in geo.navigate)')
  if (start.type !== 'Point') throw new Error('Invalid start type, expected Point (in geo.navigate)')
  if (end.type !== 'Point') throw new Error('Invalid end type, expected Point (in geo.navigate)')

  const startPoint = geoPrecision(start, 6) // set fixed precision as Valhalla can be picky
  const endPoint = geoPrecision(end, 6)

  const path = {
    type: 'LineString',
    coordinates: [ startPoint.coordinates, endPoint.coordinates ]
  }
  const q = {
    json: JSON.stringify({
      costing: types[type],
      locations: [
        { lat: startPoint.coordinates[1], lon: startPoint.coordinates[0] },
        { lat: endPoint.coordinates[1], lon: endPoint.coordinates[0] }
      ]
    })
  }
  // check if cache has it first
  const lruKey = JSON.stringify(q)
  if (lru.has(lruKey)) return lru.get(lruKey)

  // not in cache, fetch it
  let out
  try {
    const { body } = await request.get(pelias.hosts.route)
      .retry(10)
      .set('apikey', pelias.key)
      .type('json')
      .agent(agent)
      .query(q)
    out = polyline.toGeoJSON(body.trip.legs[0].shape, 6) // decode using Valhalla's fixed precision
  } catch (err) {
    if (!optional) {
      if (err.response && err.response.body && err.response.body.error) {
        throw new Error(`${err.response.body.error} (in geo.navigate)`)
      }
      throw new Error(`${err.message || err} (in geo.navigate)`)
    }
  }
  if (!out && optional) out = path

  // put it in cache for later
  lru.set(lruKey, out)
  return out
}
