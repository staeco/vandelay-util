/*eslint no-console: 0*/
import should from 'should'
import createUtil from '../src'

const util = createUtil()

describe('date', () => {
  it('should exist', async () => {
    should.exist(util.date)
    should.equal(typeof util.date, 'function')
  })
  it('should return undefined given no args', async () => {
    should.not.exist(util.date())
    should.not.exist(util.date(null))
  })
  it('should return undefined given bad args', async () => {
    should.not.exist(util.date('abc'))
  })
  it('should return a valid date from string', async () => {
    util.date('12/27/1993 EST').toISOString().should.equal('1993-12-27T05:00:00.000Z')
  })
  it('should return a valid date from number', async () => {
    util.date(1000).toISOString().should.equal('1970-01-01T00:00:01.000Z')
  })
})
