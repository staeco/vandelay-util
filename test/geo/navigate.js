import should from 'should'
import bootstrapUtil from '../bootstrapUtil'
import valhallaRoute from '../fixtures/valhalla-route-points.json'
import correctNavResponse from '../fixtures/navigation-test-correctly-decoded-response.json'

let util

describe('geo#navigate', () => {
  afterEach('cleanup util', () => util && util.close && util.close())
  it('should exist', async () => {
    const util = await bootstrapUtil()
    should.exist(util.geo.navigate)
    should.equal(typeof util.geo.navigate, 'function')
  })
  it('should use 6-digit precision for navigation', async () => {
    util = await bootstrapUtil({
      route: (req, res) => {
        const request = JSON.parse(req.query.json)
        should.notDeepEqual(request, {
          costing: 'auto',
          locations: [
            {
              lat: 40.79255294799805,
              lon: -73.94692993164062
            },
            {
              lat: 40.82516098022461,
              lon: -73.95156860351562
            }
          ]
        })
        should(request).deepEqual({ // assert fixed 6-digit precision
          costing: 'auto',
          locations: [
            {
              lat: 40.792553,
              lon: -73.94693
            },
            {
              lat: 40.825161,
              lon: -73.951569
            }
          ]
        })
        res.json(valhallaRoute)
      }
    })

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
