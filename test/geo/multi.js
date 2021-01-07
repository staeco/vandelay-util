/*eslint no-console: 0*/
import should from 'should'
import createUtil from '../helpers/createUtil'

const util = createUtil()

describe('geo#multi', () => {
  it('should exist', () => {
    should.exist(util.geo.multi)
    should.equal(typeof util.geo.multi, 'function')
  })
  it('should return undefined given no args', () => {
    should.not.exist(util.geo.multi())
    should.not.exist(util.geo.multi(null))
  })
  it('should work with polygon', () => {
    const src = {
      type: 'Polygon',
      coordinates: [
        [ [ 100.0, 0.0 ], [ 101.0, 0.0 ], [ 101.0, 1.0 ], [ 100.0, 1.0 ], [ 100.0, 0.0 ] ],
        [ [ 100.2, 0.2 ], [ 100.8, 0.2 ], [ 100.8, 0.8 ], [ 100.2, 0.8 ], [ 100.2, 0.2 ] ]
      ]
    }
    const expected = {
      type: 'MultiPolygon',
      coordinates: [ src.coordinates ]
    }
    util.geo.multi(src).should.eql(expected)
    util.geo.multi(expected).should.eql(expected)
  })
  it('should work with linestring', () => {
    const src = {
      type: 'LineString',
      coordinates: [
        [ 100.0, 0.0 ], [ 101.0, 1.0 ]
      ]
    }
    const expected = {
      type: 'MultiLineString',
      coordinates: [ src.coordinates ]
    }
    util.geo.multi(src).should.eql(expected)
    util.geo.multi(expected).should.eql(expected)
  })
})
