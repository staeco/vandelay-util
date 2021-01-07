/*eslint no-console: 0*/
import createUtil from '../../src'

// this config is meant to be public
// it is throttled to shit and worthless outside of running these basic tests!
const pelias = {
  key: 'stae-fad55205-1bd7-4736-82e5-d77d0286ce5e',
  hosts: {
    trace: 'http://route.municipal.network/trace_route',
    structured: 'http://geo.municipal.network/v1/search/structured',
    search: 'http://geo.municipal.network/v1/search',
    route: 'http://route.municipal.network/route'
  }
}

export default () => createUtil({ pelias })
