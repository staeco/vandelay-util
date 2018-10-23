/*eslint no-console: 0*/
import should from 'should'
import createUtil from '../src'

const util = createUtil()

describe('number', () => {
  it('should exist', async () => {
    should.exist(util.number)
    should.equal(typeof util.number, 'function')
  })
  it('should return undefined given no args', async () => {
    should.not.exist(util.number())
    should.not.exist(util.number(null))
    should.not.exist(util.number(''))
    should.not.exist(util.number('   '))
  })
  it('should parse currency', async () => {
    util.number('$100.56').should.equal(100.56)
  })
  it('should return a number', async () => {
    util.number(100.56).should.equal(100.56)
  })
  it('should be lax', async () => {
    util.number('costs $100.56').should.equal(100.56)
  })
  it('should handle negatives', async () => {
    util.number('it is -100.56').should.equal(-100.56)
  })
})
