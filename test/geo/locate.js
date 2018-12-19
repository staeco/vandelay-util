/*eslint no-console: 0*/
import should from 'should'
import rewire from 'rewire'

const locate = rewire('../../src/geo/locate.js')

// get request cache so it can be manipulated
const cache = locate.__get__('lru')
// mock pelias config even though cache is used
locate.__set__('pelias', {
  key: '1234',
  hosts: {
    structured: '',
    search: ''
  }
})

describe('geo#locate', function () {
  this.timeout(4000)
  it('should exist', async () => {
    should.exist(locate)
    should.equal(typeof locate, 'function')
  })
  it('should locate an intersection', async () => {
    // set the cache for the bounding box for SF
    cache.set(JSON.stringify({
      text: 'San Francisco, CA USA',
      size: 1
    }), JSON.parse('{"geocoding":{"version":"0.2","attribution":"http://geo.municipal.network/attribution","query":{"text":"San Francisco, CA USA","size":1,"private":false,"lang":{"name":"English","iso6391":"en","iso6393":"eng","defaulted":false},"querySize":20,"parser":"libpostal","parsed_text":{"city":"san francisco","state":"ca","country":"usa"}},"engine":{"name":"Pelias","author":"Mapzen","version":"1.0"},"timestamp":1545079780911},"type":"FeatureCollection","features":[{"type":"Feature","geometry":{"type":"Point","coordinates":[-122.431272,37.778008]},"properties":{"id":"85922583","gid":"whosonfirst:locality:85922583","layer":"locality","source":"whosonfirst","source_id":"85922583","name":"San Francisco","confidence":1,"match_type":"exact","accuracy":"centroid","country":"United States","country_gid":"whosonfirst:country:85633793","country_a":"USA","region":"California","region_gid":"whosonfirst:region:85688637","region_a":"CA","county":"San Francisco County","county_gid":"whosonfirst:county:102087579","locality":"San Francisco","locality_gid":"whosonfirst:locality:85922583","locality_a":"SF","continent":"North America","continent_gid":"whosonfirst:continent:102191575","label":"San Francisco, CA, USA"},"bbox":[-122.51489,37.70808,-122.35698,37.83239]}],"bbox":[-122.51489,37.70808,-122.35698,37.83239]}'))
    const intersectionPoint = await locate({
      address: 'polk st /california st',
      city: 'San Francisco',
      region: 'CA',
      country: 'USA'
    })
    should(intersectionPoint).deepEqual({
      type: 'Point',
      coordinates: [ -122.4207014, 37.7905842 ]
    })
  })
})
