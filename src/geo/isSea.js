import isSea from 'is-sea'

// switch to lon, lat for consistency with geojson
export default (lon, lat) => isSea(lat, lon)
