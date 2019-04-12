/*eslint no-console: 0*/
import should from 'should'
import util from '../src/util'

describe('util', () => {
  it('should exist', async () => {
    should.exist(util)
    should.equal(typeof util, 'function')
  })
  it('should return a url given a config', async () => {
    const o = util({ pelias: { a: 123 } })
    should.exist(o)
  })
})
