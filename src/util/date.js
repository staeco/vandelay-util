import moment from 'moment-timezone'

export default (v, tz) => {
  if (!tz) throw new Error('Missing timezone (in util.date)')
  if (v == null) return
  const dv = new Date(v)
  if (isNaN(dv)) return
  const d = moment.tz(dv, tz)
  if (!d.isValid()) return
  return d.toISOString()
}
