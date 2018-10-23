/*eslint no-console: 0*/
import should from 'should'
import createUtil from '../../src'

const util = createUtil()

describe('geo.turf', () => {
  it('should exist', async () => {
    should.exist(util.geo.turf)
    should.equal(typeof util.geo.turf, 'object')
    should.equal(typeof util.geo.turf.area, 'function')
  })
})
