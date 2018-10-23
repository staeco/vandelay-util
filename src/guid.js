import aguid from 'aguid'

export default (...v) => {
  const args = v.filter((i) => i != null)
  if (args.length === 0) return
  return aguid(args.join('-'))
}
