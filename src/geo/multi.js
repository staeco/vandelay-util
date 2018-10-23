export default (geometry) => {
  if (geometry == null) return
  geometry = geometry.geometry || geometry
  if (!geometry.type) throw new Error('type is required')
  if (!geometry.coordinates) throw new Error('coordinates is required')
  const isSingle = geometry.type.indexOf('Multi') !== 0
  if (!isSingle) return geometry // is a multi, return early
  return {
    type: `Multi${geometry.type}`,
    coordinates: [ geometry.coordinates ]
  }
}
