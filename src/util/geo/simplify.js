import { simplify } from '@turf/turf'

// 1 = 69 miles
// 0.001 = 1 city block
// 0.0001 = 10 meter
// 0.00001 = 1 meter
// 0.0000001 = actual practical limit of surveying, 11mm
export default (geometry, { tolerance=0.00001 }={}) => {
  if (geometry == null) return
  geometry = geometry.geometry || geometry
  if (!geometry.type) throw new Error('type is required')
  if (!geometry.coordinates) throw new Error('coordinates is required')

  const isSingle = geometry.type.indexOf('Multi') !== 0
  if (!isSingle) return geometry // is a multi, return early
  const { type, coordinates, ...rest } = geometry
  const res = simplify(geometry, { tolerance })
  return {
    type,
    ...rest,
    coordinates: res.coordinates
  }
}
