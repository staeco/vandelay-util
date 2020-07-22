import handleQuery from '../../lib/pelias'

const { pelias } = global.__vandelay_util_config

export default async ({ address, city, region, postalCode, country, sources, layers, filter, minConfidence }) => {
  if (!address) throw new Error('Missing address text (in geo.locate)')
  const query = {
    locality: city,
    postalcode: postalCode,
    region,
    country,
    address,
    layers: layers ? layers.join(',') : undefined,
    sources: sources ? sources.join(',') : undefined
  }
  return handleQuery({
    debugName: 'geo.locate',
    query,
    host: pelias.hosts.structured,
    filter,
    minConfidence
  })
}
