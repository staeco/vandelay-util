/*eslint no-console: 0*/
import should from 'should'
import createUtil from '../src'

const util = createUtil()

describe('phone', () => {
  it('should exist', async () => {
    should.exist(util.phone)
    should.equal(typeof util.phone, 'function')
  })
  it('should return undefined given no args', async () => {
    should.not.exist(util.phone())
    should.not.exist(util.phone(null))
    should.not.exist(util.phone(''))
    should.not.exist(util.phone('   '))
  })
  it('should return undefined given bad args', async () => {
    should.not.exist(util.phone(' 123 '))
    should.not.exist(util.phone(123))
  })
  it('should return a USA phone number', async () => {
    util.phone('4805335949').should.equal('+14805335949')
    util.phone('(480) 533-5949').should.equal('+14805335949')
    util.phone('480-533-5949').should.equal('+14805335949')
  })
  it('should return from a number', async () => {
    util.phone(4805335949).should.equal('+14805335949')
  })
  it('should work with a hong kong number', async () => {
    should.not.exist(util.phone('6123-6123'))
    util.phone('6123-6123', 'HKG').should.equal('+85261236123')
    util.phone('+852 6569-8900').should.equal('+85265698900')
  })
})
