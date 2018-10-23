export default (v) => {
  if (v == null) return
  const d = new Date(v)
  return isNaN(d) ? undefined : d
}
