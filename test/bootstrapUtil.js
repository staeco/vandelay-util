/*eslint no-console: 0*/
import createUtil from '../src'
import express from 'express'
import should from 'should'
import getPort from 'get-port'

const traceURL = '/trace_route'
const structuredURL = '/v1/search/structured/'
const searchURL = '/v1/search'
const routeURL = '/route'

const useNetwork = () => {
  const { USE_NET, VANDELAY_UTIL_CONFIG } = process.env
  return USE_NET && USE_NET.toLowerCase() === 'true' && VANDELAY_UTIL_CONFIG
}

const getPeliasConfig = async (port) => {
  if (useNetwork()) {
    const { VANDELAY_UTIL_CONFIG } = process.env
    const conf = await require(VANDELAY_UTIL_CONFIG)
    return conf
  }
  return {
    pelias: {
      key: 'stae-1234',
      hosts: {
        trace: `http://localhost:${port}${traceURL}`,
        structured: `http://localhost:${port}${structuredURL}`,
        search: `http://localhost:${port}${searchURL}`,
        route: `http://localhost:${port}${routeURL}`
      }
    }
  }
}

/**
 * Wrap requests to ensure API key passthrough
 */
const wrap = (lam) => (req, res) => {
  const { apikey } = req.headers
  should.exist(apikey, 'An API key is expected by this service')
  should.equal(apikey, 'stae-1234', 'API key does not equal configured value')
  return lam(req, res)
}

const cleanupUtil = () => {
  Object.keys(require.cache)
    .filter((m) => m.includes('src/util') || m.includes('src/lib'))
    .map((m) => delete require.cache[m]) // remove from cache so they can be initialized properly
}

const bootstrapUtil = async (responses) => {
  let port
  let server
  if (!useNetwork()) {
    port = await getPort()
    const app = express()
    if (responses) {
      if (responses.structured) app.get(structuredURL, wrap(responses.structured))
      if (responses.trace) console.log('TRACE NOT IMPLEMENTED!')
      if (responses.search) console.log('SEARCH NOT IMPLEMENTED!')
      if (responses.route) app.get(routeURL, wrap(responses.route))
    }
    server = app.listen(port)
  }
  cleanupUtil()
  const util = createUtil(await getPeliasConfig(port))
  util.close = () => {
    cleanupUtil()
    return server && server.close()
  }
  return util
}

bootstrapUtil.cleanupUtil = cleanupUtil

export default bootstrapUtil
