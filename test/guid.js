/*eslint no-console: 0*/
import should from 'should'
import createUtil from './helpers/createUtil'

const util = createUtil()

describe('guid', () => {
  it('should exist', async () => {
    should.exist(util.guid)
    should.equal(typeof util.guid, 'function')
  })
  it('should return undefined given no args', async () => {
    should.not.exist(util.guid())
    should.not.exist(util.guid(null, null))
  })
  it('should return a valid guid with 1 argument', async () => {
    util.guid(123).should.equal('a665a459-0422-4d41-8486-efdc4fb8a04a')
  })
  it('should return a valid guid with multiple arguments', async () => {
    util.guid(123, 'abc', 'xyz').should.equal('5701598f-c410-4e67-8d67-ffce16af1535')
  })
})
