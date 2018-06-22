import aguid from 'aguid'

export default (...v) =>
  aguid(v.join('-'))
