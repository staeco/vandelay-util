/*eslint no-console: 0*/
import should from 'should'
import createUtil from '../src/util'

const util = createUtil()

describe('moment', () => {
  it('should exist', async () => {
    should.exist(util.moment)
    should.equal(typeof util.moment, 'function')
    should.equal(typeof util.moment.tz, 'function')
  })
})
