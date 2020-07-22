import handleQuery from '../../lib/pelias'

const { pelias } = global.__vandelay_util_config

export default async ({ text, sources, layers, filter, minConfidence }) => {
  if (!text) throw new Error('Missing address text (in geo.search)')
  const query = {
    text,
    layers: layers ? layers.join(',') : undefined,
    sources: sources ? sources.join(',') : undefined
  }

  return handleQuery({
    debugName: 'geo.search',
    query,
    filter,
    minConfidence,
    host: pelias.hosts.search
  })
}
