import convert from 'convert-units'

const dummy = {
  from: () => {},
  to: () => {}
}
export default (v) => {
  if (v == null) return dummy
  if (typeof v === 'string') v = parseFloat(v)
  if (isNaN(v)) return dummy
  if (typeof v !== 'number') return dummy
  return convert(v)
}
