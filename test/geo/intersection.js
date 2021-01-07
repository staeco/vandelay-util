import should from 'should'
import createUtil from '../helpers/createUtil'

const util = createUtil()

describe('geo#intersection', () => {
  it('should exist', async () => {
    should.exist(util.geo.intersection)
    should.equal(typeof util.geo.intersection, 'function')
  })
  it('should intersection an intersection', async () => {
    const intersectionPoint = await util.geo.intersection({
      intersection: 'polk st /california st',
      city: 'San Francisco',
      region: 'CA'
    })
    should(intersectionPoint).deepEqual({
      type: 'Point',
      coordinates: [ -122.4207014, 37.7905842 ]
    })
  })
})
