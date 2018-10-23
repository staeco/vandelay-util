import slugify from '@sindresorhus/slugify'


export default (...v) => {
  const args = v.filter((i) => i != null)
  if (args.length === 0) return
  return slugify(args.join(' ')).toLowerCase()
}
