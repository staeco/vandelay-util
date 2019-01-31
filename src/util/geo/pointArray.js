import _ from 'lodash'

export default ({ longitude, latitude, elevation }) => {
  if (!longitude || !latitude) return null
  return _.compact([ longitude, latitude, elevation ])
}
