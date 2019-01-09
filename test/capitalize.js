/*eslint no-console: 0*/
import should from 'should'
import createUtil from '../src/util'

const util = createUtil()

describe('capitalize', () => {
  it('should exist', async () => {
    should.exist(util.capitalize)
    should.equal(typeof util.capitalize, 'function')
  })
  it('should return undefined given no args', async () => {
    should.not.exist(util.capitalize())
    should.not.exist(util.capitalize(null))
  })
  it('should capitalize an uppercase string', async () => {
    util.capitalize('YO').should.equal('Yo')
  })
  it('should capitalize just the first word', async () => {
    util.capitalize('yo yo').should.equal('Yo yo')
  })
  it('should capitalize every word when asked to', async () => {
    util.capitalize.words('yo yo').should.equal('Yo Yo')
  })
})
