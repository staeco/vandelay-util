import capitalize from 'capitalize'

const cap = (v) => {
  if (v == null) return
  return capitalize(String(v))
}
cap.words = (v) => {
  if (v == null) return
  return capitalize.words(String(v))
}
export default cap
