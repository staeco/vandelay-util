import QuickLRU from 'quick-lru'
import handleQuery from '../../lib/pelias'

const { pelias } = global.__vandelay_util_config
const lru = new QuickLRU({ maxSize: 10000 })

export default async ({ address, city, region, postalCode, country, minConfidence }) => {
  if (!address) throw new Error('Missing address text (in geo.locate)')
  const query = {
    locality: city,
    postalcode: postalCode,
    region,
    country,
    address
  }

  // check if cache has it first
  const lruKey = JSON.stringify(query)
  if (lru.has(lruKey)) return lru.get(lruKey)

  const opts = {
    query,
    host: pelias.hosts.structured,
    minConfidence
  }

  // not in cache, fetch it
  const out = await handleQuery(opts)
  if (!out) return
  lru.set(lruKey, out)
  return out
}
