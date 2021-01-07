/*eslint no-console: 0*/
import should from 'should'
import createUtil from './helpers/createUtil'

const util = createUtil()

describe('moment', () => {
  it('should exist', async () => {
    should.exist(util.moment)
    should.equal(typeof util.moment, 'function')
    should.equal(typeof util.moment.tz, 'function')
  })
})
