import camelize from 'camelcase'

export default (v) => {
  if (v == null) return
  return camelize(String(v))
}
