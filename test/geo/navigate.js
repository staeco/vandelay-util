import should from 'should'
import createUtil from '../helpers/createUtil'
import correctNavResponse from '../fixtures/navigation-test-correctly-decoded-response.json'

const util = createUtil()

describe('geo#navigate', () => {
  it('should exist', async () => {
    should.exist(util.geo.navigate)
    should.equal(typeof util.geo.navigate, 'function')
  })
  it('should work correctly', async () => {
    const startPoint = {
      type: 'Point',
      coordinates: [
        -73.94692993164062, // row.pickupLongitude,
        40.79255294799805 // row.pickupLatitude
      ]
    }
    const endPoint = {
      type: 'Point',
      coordinates: [
        -73.95156860351562, // row.dropoffLongitude,
        40.82516098022461 // row.dropoffLatitude
      ]
    }
    const path = await util.geo.navigate({
      type: 'driving',
      optional: true,
      start: startPoint,
      end: endPoint
    })
    should.exist(path)
    should.deepEqual(path, correctNavResponse)
  })
})
