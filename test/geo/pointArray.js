/*eslint no-console: 0*/
import should from 'should'
import _ from 'lodash'
import createUtil from '../../src/util'

const util = createUtil()

describe('geo#pointArray', () => {
  it('should exist', async () => {
    should.exist(util.geo.pointArray)
    should.equal(typeof util.geo.pointArray, 'function')
  })
  it('should return valid point array for coords', async () => {
    _.isEqual(util.geo.pointArray({ longitude: -118.250587, latitude: 34.031179, elevation: 1024 }), [ -118.250587 , 34.031179 , 1024 ]).should.be.true()

    _.isEqual(util.geo.pointArray({ longitude: -118.250587, latitude: 34.031179 }), [ -118.250587 , 34.031179 ]).should.be.true()
  })
  it('should return null when either latitude or longitude is left out', async () => {
    should(util.geo.pointArray({ longitude: -118.250587, latitude: null })).be.null()
    should(util.geo.pointArray({ longitude: null, latitude: 34.031179 })).be.null()
  })
})
