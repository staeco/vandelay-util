import request from 'superagent'
import { Agent } from 'http'

const { pelias } = global.__vandelay_util_config
const agent = new Agent({ keepAlive: true })

const makeRequest = async (opts) => request.get(opts.host)
  .retry(10)
  .type('json')
  .agent(agent)
  .set('apikey', pelias.key)
  .query(opts.query)

const parseResponse = ([ res ]) => ({
  type: res.geometry.type,
  coordinates: res.geometry.coordinates,
  bbox: res.bbox,
  properties: {
    short: res.properties.name,
    full: res.properties.label,
    city: res.properties.locality,
    county: res.properties.county,
    region: res.properties.region,
    postalCode: res.properties.postalcode,
    country: res.properties.country
  }
})

const handleQuery = async ({ host, query, minConfidence = 0.9 }) => {
  const { pelias } = global.__vandelay_util_config
  if (!pelias) throw new Error('Missing pelias configuration option (in geo.locate)')
  try {
    const { body } = await makeRequest({ host, query })
    if (!body || !body.features || !body.features[0]) return
    const features = body.features.filter((f) => f.properties.confidence >= minConfidence) // filter by confidence
    if (!features[0]) return // if there are no features, confidence was too low
    return parseResponse(features)
  } catch (err) {
    throw new Error(`${err.message || err} (in geo.locate)`)
  }
}

export default handleQuery
