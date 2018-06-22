import f2c from 'fahrenheit-to-celsius'

export default (v) => {
  if (typeof v === 'string') v = parseFloat(v)
  return f2c(v)
}
