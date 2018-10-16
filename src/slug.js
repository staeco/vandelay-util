import slugify from '@sindresorhus/slugify'

export default (...v) =>
  slugify(v.join(' '))
