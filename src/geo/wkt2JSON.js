import wkx from 'wkx'

export default (str) => wkx.Geometry.parse(str).toGeoJSON()
