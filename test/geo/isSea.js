/*eslint no-console: 0*/
import should from 'should'
import createUtil from '../helpers/createUtil'

const util = createUtil()

describe('geo#isSea', () => {
  it('should exist', () => {
    should.exist(util.geo.isSea)
    should.equal(typeof util.geo.isSea, 'function')
  })
  it('should return true given array coords', () => {
    util.geo.isSea([ 0, 0 ]).should.equal(true)
  })
  it('should return true given a point', () => {
    util.geo.isSea({
      type: 'Point',
      coordinates: [ 0, 0 ]
    }).should.equal(true)
  })
})
