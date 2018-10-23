import f2c from 'fahrenheit-to-celsius'

export default (v) => {
  if (v == null) return
  if (typeof v === 'string') v = parseFloat(v)
  const t = typeof v
  if (t !== 'number') throw new Error(`Expected number, got: ${t}`)
  return f2c(v)
}
