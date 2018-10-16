import slugify from 'slugify'

export default (...v) =>
  slugify(v.join('-'), {
    replacement: '-',
    lower: true
  })
