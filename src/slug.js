import slugify from '@sindresorhus/slugify'


export default (...v) => {
  const args = v
    .filter((i) => i != null)
    .map((v) => v instanceof Date ? v.toLocaleDateString() : v)
  if (args.length === 0) return
  return slugify(args.join(' ')).toLowerCase()
}
