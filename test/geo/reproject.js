/*eslint no-console: 0*/
import should from 'should'
import createUtil from '../helpers/createUtil'

const util = createUtil()
const expected = {
  type: 'Point',
  properties: {
    test: 'abc'
  },
  coordinates: [
    11.965261850066433,
    57.704505637111694
  ]
}

describe('geo#reproject', () => {
  it('should exist', () => {
    should.exist(util.geo.reproject)
    should.equal(typeof util.geo.reproject, 'function')
  })
  it('should reproject correctly auto-detecting crs', () => {
    util.geo.reproject({
      type: 'Point',
      crs: {
        type: 'name',
        properties: {
          name: 'EPSG:3006'
        }
      },
      properties: {
        test: 'abc'
      },
      coordinates: [
        319180,
        6399862
      ]
    }).should.eql(expected)
  })
  it('should reproject correctly with manual crs', () => {
    util.geo.reproject({
      type: 'Point',
      properties: {
        test: 'abc'
      },
      coordinates: [
        319180,
        6399862
      ]
    }, 'EPSG:3006').should.eql(expected)
  })
})
