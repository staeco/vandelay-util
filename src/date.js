export default (v) => {
  if (!v) return null
  const d = new Date(v)
  return isNaN(d) ? null : d
}
