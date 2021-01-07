/*eslint no-console: 0*/
import should from 'should'
import createUtil from '../helpers/createUtil'

const util = createUtil()

describe('geo.turf', () => {
  it('should exist', () => {
    should.exist(util.geo.turf)
    should.equal(typeof util.geo.turf, 'object')
    should.equal(typeof util.geo.turf.area, 'function')
  })
})
