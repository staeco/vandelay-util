/*eslint no-console: 0*/
import should from 'should'
import createUtil from '../src'

const util = createUtil()

describe('normalize', () => {
  it('should exist', async () => {
    should.exist(util.normalize)
    should.equal(typeof util.normalize, 'function')
  })
  it('should return undefined given no args', async () => {
    should.not.exist(util.normalize())
    should.not.exist(util.normalize(null))
    should.not.exist(util.normalize(''))
    should.not.exist(util.normalize('   '))
  })
  it('should return a lowercase string', async () => {
    util.normalize('YO').should.equal('yo')
  })
  it('should return a trimmed lowercase string', async () => {
    util.normalize('  YO  ').should.equal('yo')
  })
  it('should replace multiple spaces between words', async () => {
    util.normalize('  YO  YO  ').should.equal('yo yo')
  })
})
