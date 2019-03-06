import decamelize from 'decamelize'

export default (v) => {
  if (v == null) return
  return decamelize(String(v), ' ')
}
