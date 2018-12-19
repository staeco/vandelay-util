export default ({ lat, lon }) => {
  return {
    type: 'Point',
    coordinates: [ lon, lat ]
  }
}
