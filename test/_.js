/*eslint no-console: 0*/
import should from 'should'
import createUtil from '../src'

const util = createUtil()

describe('_', () => {
  it('should exist', async () => {
    should.exist(util._)
    should.equal(typeof util._, 'function')
    should.equal(typeof util._.map, 'function')
  })
})
