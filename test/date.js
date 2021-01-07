/*eslint no-console: 0*/
import should from 'should'
import createUtil from './helpers/createUtil'

const util = createUtil()

describe('date', () => {
  it('should exist', async () => {
    should.exist(util.date)
    should.equal(typeof util.date, 'function')
  })
  it('should return undefined given no args', async () => {
    should.not.exist(util.date(undefined, 'America/New_York'))
    should.not.exist(util.date(null, 'America/New_York'))
  })
  it('should return undefined given bad args', async () => {
    should.not.exist(util.date('abc', 'America/New_York'))
  })
  it('should return a valid date from string', async () => {
    // PST
    util.date('12/27/1993', 'America/Los_Angeles').should.equal('1993-12-27T08:00:00.000Z')
    util.date('12/27/93', 'America/Los_Angeles').should.equal('1993-12-27T08:00:00.000Z')

    // EST
    util.date('12/27/1993', 'America/New_York').should.equal('1993-12-27T05:00:00.000Z')
    util.date('12/27/93 00:00', 'America/New_York').should.equal('1993-12-27T05:00:00.000Z')
  })
  it('should handle ISO string inputs', async () => {
    util.date('1993-12-27T08:00:00.000Z', 'America/New_York').should.equal('1993-12-27T08:00:00.000Z')
    util.date('1993-12-27T05:00:00.000Z', 'America/Los_Angeles').should.equal('1993-12-27T05:00:00.000Z')
  })
  it('should return a valid date from number', async () => {
    // EST
    util.date(1000, 'America/New_York').should.equal('1970-01-01T00:00:01.000Z')
    util.date('1000', 'America/New_York').should.equal('1970-01-01T00:00:01.000Z')

    // PST
    util.date(1000, 'America/Los_Angeles').should.equal('1970-01-01T00:00:01.000Z')
    util.date('1000', 'America/Los_Angeles').should.equal('1970-01-01T00:00:01.000Z')
  })
  it('should return valid date from preparsed date', async () => {
    util.date(new Date('12/27/1993'), 'America/Los_Angeles').should.equal('1993-12-27T08:00:00.000Z')
    util.date(new Date('12/27/1993'), 'America/New_York').should.equal('1993-12-27T05:00:00.000Z')
  })
  it('should return a valid date from number with timezone', async () => {
    util.date('2014-06-01 12:00', 'America/New_York').should.equal('2014-06-01T16:00:00.000Z')
  })
})
