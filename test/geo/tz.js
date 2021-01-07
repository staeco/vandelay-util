/*eslint no-console: 0*/
import should from 'should'
import createUtil from '../helpers/createUtil'

const util = createUtil()

describe('geo#tz', () => {
  it('should exist', () => {
    should.exist(util.geo.tz)
    should.equal(typeof util.geo.tz, 'function')
  })
  it('should return right timezone given array coords', () => {
    util.geo.tz([ -118.250587 , 34.031179 ]).should.equal('America/Los_Angeles')
  })
  it('should return right timezone for LA', () => {
    util.geo.tz({
      type: 'Point',
      coordinates: [ -118.250587 , 34.031179 ]
    }).should.equal('America/Los_Angeles')
  })
  it('should return right timezone for shanghai', () => {
    util.geo.tz({
      type: 'Point',
      coordinates: [ 121.456424, 31.224417 ]
    }).should.equal('Asia/Shanghai')
  })
})
