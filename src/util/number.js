import numeral from 'numeral'

export default (v) => {
  if (v == null) return
  return numeral(v).value()
}
