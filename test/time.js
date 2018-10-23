/*eslint no-console: 0*/
import should from 'should'
import createUtil from '../src'

const util = createUtil()

describe('time', () => {
  it('should exist', async () => {
    should.exist(util.time)
    should.equal(typeof util.time, 'function')
    should.equal(typeof util.time.tz, 'function')
  })
})
