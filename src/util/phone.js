import phone from 'phone'

export default (v, country) => {
  const res = phone(String(v), country)
  if (!res || res.length === 0) return null
  return res[0]
}
