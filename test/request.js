/*eslint no-console: 0*/
import should from 'should'
import createUtil from './helpers/createUtil'

const util = createUtil()

describe('request', () => {
  it('should exist', async () => {
    should.exist(util.request)
    should.equal(typeof util.request.post, 'function')
    should.equal(typeof util.request.get, 'function')
  })
})
