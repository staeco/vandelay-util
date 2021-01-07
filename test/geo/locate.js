/*eslint no-console: 0*/
import should from 'should'
import createUtil from '../helpers/createUtil'

const util = createUtil()

describe('geo#locate', () => {
  it('should exist', async () => {
    should.exist(util.geo.locate)
    should.equal(typeof util.geo.locate, 'function')
  })
  it('invalid address should return no results', async () => {
    const loc = await util.geo.locate({
      address: '9999999999 SOUTH AV',
      city: 'syracuse',
      region: 'new york'
    })
    should.not.exist(loc, 'util.geo.locate should return null for an invalid address')
  })
  it('valid address should return valid results', async () => {
    const loc = await util.geo.locate({
      address: '401 Harrison St',
      city: 'syracuse',
      region: 'new york',
      postalCode: '13202',
      country: 'United States'
    })

    should.deepEqual(loc, {
      type: 'Point',
      coordinates: [ -76.146769, 43.044734 ],
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
  })
})
