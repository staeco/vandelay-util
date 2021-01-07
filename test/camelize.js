/*eslint no-console: 0*/
import should from 'should'
import createUtil from './helpers/createUtil'

const util = createUtil()

describe('camelize', () => {
  it('should exist', async () => {
    should.exist(util.camelize)
    should.equal(typeof util.camelize, 'function')
  })
  it('should return undefined given no args', async () => {
    should.not.exist(util.camelize())
    should.not.exist(util.camelize(null))
  })
  it('should camelize an uppercase string', async () => {
    util.camelize('YO SUP').should.equal('yoSup')
  })
  it('should camelize two words', async () => {
    util.camelize('yo yo').should.equal('yoYo')
  })
})
