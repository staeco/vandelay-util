import mph2kmh from 'mph-to-kmh'

export default (v) => {
  if (v == null) return
  return mph2kmh(v)
}
