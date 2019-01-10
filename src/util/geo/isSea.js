import isSea from 'is-sea'

// switch to lon, lat for consistency with geojson
export default (o) => {
  const [ lon, lat ] = o.coordinates || o
  if (lon == null || lat == null) throw new Error('Missing coordinates')
  return isSea(lat, lon)
}
