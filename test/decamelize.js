/*eslint no-console: 0*/
import should from 'should'
import createUtil from '../src/util'

const util = createUtil()

describe('decamelize', () => {
  it('should exist', async () => {
    should.exist(util.decamelize)
    should.equal(typeof util.decamelize, 'function')
  })
  it('should return undefined given no args', async () => {
    should.not.exist(util.decamelize())
    should.not.exist(util.decamelize(null))
  })
  it('should decamelize two words', async () => {
    util.decamelize('yoSup').should.equal('yo sup')
  })
})
