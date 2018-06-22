const parsePolygon = (feature) => {
  if (!feature.coordinates) throw new Error('feature.coordinates is required')
  const isPolygon = feature.type === 'Polygon'
  const coordinates = isPolygon ? [ feature.coordinates ] : feature.coordinates
  return {
    coordinates,
    type: 'MultiPolygon'
  }
}

export default (feature) => parsePolygon(feature.geometry || feature)
