/*eslint no-console: 0*/
import should from 'should'
import createUtil from '../../src/util'

const util = createUtil()

describe('geo#simplify', () => {
  it('should exist', async () => {
    should.exist(util.geo.simplify)
    should.equal(typeof util.geo.simplify, 'function')
  })
  it('should return undefined given no args', async () => {
    should.not.exist(util.geo.simplify())
    should.not.exist(util.geo.simplify(null))
  })
  it('should work with polygon', async () => {
    const src = {
      type: 'Polygon',
      coordinates: [
        [ [ 100.0, 0.0 ], [ 101.0, 0.0 ], [ 101.0, 1.0 ], [ 100.0, 1.0 ], [ 100.0, 0.0 ] ],
        [ [ 100.2, 0.2 ], [ 100.8, 0.2 ], [ 100.8, 0.8 ], [ 100.2, 0.8 ], [ 100.2, 0.2 ] ]
      ]
    }
    const expected = {
      type: 'Polygon',
      coordinates: src.coordinates
    }
    util.geo.simplify(src).should.eql(expected)
    util.geo.simplify(expected).should.eql(expected)
  })
  it('should work with linestring', async () => {
    const src = {
      type: 'LineString',
      coordinates: [
        [ 100.0, 0.0 ], [ 101.0, 1.0 ]
      ]
    }
    const expected = {
      type: 'LineString',
      coordinates: src.coordinates
    }
    util.geo.simplify(src).should.eql(expected)
    util.geo.simplify(expected).should.eql(expected)
  })
})
