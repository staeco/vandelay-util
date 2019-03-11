/*eslint no-console: 0*/
import should from 'should'
import createUtil from '../src/util'

const util = createUtil()

describe('memo', () => {
  it('should exist', async () => {
    should.exist(util.memo)
    should.equal(typeof util.memo, 'function')
    should.equal(typeof util.memo.promise, 'function')
  })
})
