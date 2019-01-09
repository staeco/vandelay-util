import dir from 'require-dir'

export default (config = {}) => {
  // hack to pass keys way down without using env
  global.__vandelay_util_config = config
  return dir(__dirname, { recurse: true })
}
