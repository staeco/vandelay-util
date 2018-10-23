import wkx from 'wkx'

export default (str) => {
  if (str == null) return
  return wkx.Geometry.parse(str).toGeoJSON()
}
