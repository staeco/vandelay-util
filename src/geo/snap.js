import request from 'superagent'
import polyline from 'polyline'
import QuickLRU from 'quick-lru'
import { Agent } from 'http'

const { pelias } = global.__vandelay_util_config
const lru = new QuickLRU({ maxSize: 10000 })
const agent = new Agent({ keepAlive: true })

const types = {
  driving: 'auto',
  walking: 'pedestrian',
  cycling: 'bicycle',
  bus: 'bus'
}

export default async ({ type, path, optional }) => {
  if (!pelias) throw new Error('Missing pelias configuration option')
  if (!types[type]) throw new Error(`Invalid type: ${type}`)
  if (!path || !path.coordinates) throw new Error('Missing path')
  if (path.type !== 'LineString') throw new Error('Invalid path type, expected LineString')

  const q = {
    costing: types[type],
    encoded_polyline: polyline.fromGeoJSON(path)
  }

  // check if cache has it first
  const lruKey = JSON.stringify(q)
  if (lru.has(lruKey)) return lru.get(lruKey)

  // not in cache, fetch it
  let out
  try {
    const { body } = await request.get(pelias.hosts.trace)
      .type('json')
      .set('apikey', pelias.key)
      .agent(agent)
      .send(q)
    out = polyline.toGeoJSON(body.trip.legs[0].shape)
  } catch (err) {
    if (!optional) throw err
  }
  if (!out && optional) out = path

  // put it in cache for later
  lru.set(lruKey, out)
  return out
}
