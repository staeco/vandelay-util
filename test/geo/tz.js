/*eslint no-console: 0*/
import should from 'should'
import createUtil from '../../src/util'

const util = createUtil()

describe('geo#tz', () => {
  it('should exist', async () => {
    should.exist(util.geo.tz)
    should.equal(typeof util.geo.tz, 'function')
  })
  it('should return right timezone given array coords', async () => {
    util.geo.tz([ -118.250587 , 34.031179 ]).should.equal('America/Los_Angeles')
  })
  it('should return right timezone for LA', async () => {
    util.geo.tz({
      type: 'Point',
      coordinates: [ -118.250587 , 34.031179 ]
    }).should.equal('America/Los_Angeles')
  })
  it('should return right timezone for shanghai', async () => {
    util.geo.tz({
      type: 'Point',
      coordinates: [ 121.456424, 31.224417 ]
    }).should.equal('Asia/Shanghai')
  })
})
