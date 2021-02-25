import decamelize from 'decamelize'

export default (v, separator = ' ') => {
  if (v == null) return
  return decamelize(String(v), { separator })
}
