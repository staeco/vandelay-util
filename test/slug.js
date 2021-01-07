/*eslint no-console: 0*/
import should from 'should'
import createUtil from './helpers/createUtil'

const util = createUtil()

describe('slug', () => {
  it('should exist', async () => {
    should.exist(util.slug)
    should.equal(typeof util.slug, 'function')
  })
  it('should return undefined given no args', async () => {
    should.not.exist(util.slug())
    should.not.exist(util.slug(null, null))
  })
  it('should return a valid slug with 1 argument', async () => {
    util.slug(123).should.equal('123')
  })
  it('should return a valid slug with multiple arguments', async () => {
    util.slug(123, '456 abc', 'xyz').should.equal('123-456-abc-xyz')
  })
  it('should return a valid slug with multiple messed uparguments', async () => {
    util.slug(123, '456 abc', null, 'xyz').should.equal('123-456-abc-xyz')
  })
})
