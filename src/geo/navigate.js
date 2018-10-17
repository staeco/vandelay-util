import request from 'superagent'
import polyline from '@mapbox/polyline'
import QuickLRU from 'quick-lru'
import { Agent } from 'http'

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

  const path = {
    type: 'LineString',
    coordinates: [ start.coordinates, end.coordinates ]
  }
  const q = {
    json: JSON.stringify({
      costing: types[type],
      locations: [
        { lat: start.coordinates[1], lon: start.coordinates[0] },
        { lat: end.coordinates[1], lon: end.coordinates[0] }
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
    out = polyline.toGeoJSON(body.trip.legs[0].shape)
  } catch (err) {
    if (!optional) throw err
  }
  if (!out && optional) out = path

  // put it in cache for later
  lru.set(lruKey, out)
  return out
}
