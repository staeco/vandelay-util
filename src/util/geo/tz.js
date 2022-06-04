import { find } from 'geo-tz'

// switch to lon, lat for consistency with geojson
export default (o) => {
  const [ lon, lat ] = o.coordinates || o
  if (lon == null || lat == null) throw new Error('Missing coordinates')
  const zones = find(lat, lon)
  return zones && zones[0]
}
