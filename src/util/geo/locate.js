import handleQuery from '../../lib/pelias'

const { pelias } = global.__vandelay_util_config

export default async ({ address, city, region, postalCode, country, minConfidence }) => {
  if (!address) throw new Error('Missing address text (in geo.locate)')
  const query = {
    locality: city,
    postalcode: postalCode,
    region,
    country,
    address
  }
  return handleQuery({
    query,
    host: pelias.hosts.structured,
    minConfidence
  })
}
