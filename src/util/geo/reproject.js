import { SpatialReference, Geometry } from 'gdal-next'

const wgs84 = SpatialReference.fromProj4('+init=epsg:4326')

export default (geojson, crs) => {
  const toParse = crs
    ? {
      crs: {
        type: 'name',
        properties: {
          name: crs
        }
      },
      ...geojson
    }
    : geojson
  if (!toParse.crs) throw new Error('Missing CRS! Must be defined in either the input object or provided as an argument.')
  const geom = Geometry.fromGeoJson(toParse)
  if (!geom) throw new Error('Invalid geometry in reproject!')
  geom.transformTo(wgs84)
  const obj = geom.toObject()
  if (!geojson.properties) return obj
  return {
    ...obj,
    properties: geojson.properties
  }
}
