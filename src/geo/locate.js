import request from 'superagent'
import QuickLRU from 'quick-lru'
import { Agent } from 'http'

const { pelias } = global.__vandelay_util_config
const agent = new Agent({ keepAlive: true })
const lru = new QuickLRU({ maxSize: 10000 })

const makeRequest = (opts) =>
  request.get(opts.host)
    .type('json')
    .agent(agent)
    .set('apikey', pelias.key)
    .query(opts.query)

const parseResponse = (body) => {
  const res = body.features[0]
  return {
    type: res.geometry.type,
    coordinates: res.geometry.coordinates,
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
  const { body } = await makeRequest(opts)

  if (!body || !body.features || !body.features[0]) return
  return parseResponse(body)
}

export default async ({ address, city, region, country }) => {
  if (!pelias) throw new Error('Missing pelias configuration option')
  if (!address) throw new Error('Missing address')
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
  const out = handleQuery(opts)

  if (!out) return
  // put it in cache for later
  lru.set(lruKey, out)
  return out
}
