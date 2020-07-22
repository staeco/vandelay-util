import handleQuery from '../../lib/pelias'

const { pelias } = global.__vandelay_util_config

export default async ({ address, city, region, postalCode, country, sources, minConfidence }) => {
  if (!address) throw new Error('Missing address text (in geo.locate)')
  const query = {
    locality: city,
    postalcode: postalCode,
    region,
    country,
    address,
    sources: sources ? sources.join(',') : undefined
  }
  return handleQuery({
    query,
    host: pelias.hosts.structured,
    minConfidence
  })
}
