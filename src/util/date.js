import moment from 'moment-timezone'
import numeral from 'numeral'

const parseNum = (v) => String(v).match(/^[-+]?\d*$/) ? numeral(v).value() : null
const pad = (num) => String(num).padStart(2,0)

const produceDateFormat = (timestamp) => {
  if (!timestamp.isValid()) return
  return timestamp.toISOString()
}

export default (v, tz) => {
  if (!tz) throw new Error('Missing timezone (in util.date)')
  if (v == null) return
  const dv = new Date(v)
  if (isNaN(dv)) return
  const epoch = parseNum(v)
  if (epoch) {
    return produceDateFormat(moment.unix(epoch / 1000).utc())
  }
  const dateString = `${dv.getFullYear()}-${pad(dv.getMonth()+1)}-${pad(dv.getDate())} ${pad(dv.getHours())}:${pad(dv.getMinutes())}:${pad(dv.getSeconds())}`
  return produceDateFormat(moment.tz(dateString, 'YYYY-MM-DD HH:mm:ss', tz).utc())
}
