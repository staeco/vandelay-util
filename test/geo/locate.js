/*eslint no-console: 0*/
import should from 'should'
import bootstrapUtil from '../bootstrapUtil'
import southAveFakeAddr from '../fixtures/pelias-structured-700_south_av-syracuse-ny-not_real_addr.json'
import harrisonStRealAddr from '../fixtures/pelias-structured-401_harrison_st-syracuse-ny.json'

let util

describe('geo#locate', function () {
  afterEach('cleanup util', () => util && util.close())
  it('should exist', async () => {
    const util = await bootstrapUtil()
    should.exist(util.geo.locate)
    should.equal(typeof util.geo.locate, 'function')
  })
  it('invalid address should return no results', async () => {
    util = await bootstrapUtil({
      structured: (req, res) => { // provide response for structured query
        should.deepEqual(req.query, {
          address: '700 SOUTH AV',
          locality: 'syracuse',
          region: 'new york'
        }, 'Request should generate proper query for input values')
        res.json(southAveFakeAddr)
      }
    })
    const loc = await util.geo.locate({
      address: '700 SOUTH AV',
      city: 'syracuse',
      region: 'new york'
    })
    should.not.exist(loc, 'util.geo.locate should return null for an invalid address')
  })
  it('valid address should return valid results', async () => {
    util = await bootstrapUtil({
      structured: (req, res) => { // provide response for structured query
        should.deepEqual(req.query, {
          address: '401 Harrison St',
          locality: 'syracuse',
          region: 'new york',
          postalcode: '13202',
          country: 'United States'
        }, 'Request should generate proper query for input values')
        res.json(harrisonStRealAddr) //lazy, I know, but it works
      }
    })

    const loc = await util.geo.locate({
      address: '401 Harrison St',
      city: 'syracuse',
      region: 'new york',
      postalCode: '13202',
      country: 'United States'
    })

    should.deepEqual(loc, {
      type: 'Point',
      coordinates: [ -76.146974, 43.044696 ],
      bbox: undefined,
      properties: {
        short: '401 Harrison Street',
        full: '401 Harrison Street, Syracuse, NY, USA',
        city: 'Syracuse',
        postalCode: '13202',
        county: undefined,
        region: 'New York',
        country: 'United States'
      }
    })
    util.close()
  })
})
