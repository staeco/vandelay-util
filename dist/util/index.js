'use strict';

exports.__esModule = true;

var _requireDir = require('require-dir');

var _requireDir2 = _interopRequireDefault(_requireDir);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (config = {}) => {
  // hack to pass keys way down without using env
  global.__vandelay_util_config = config;
  return (0, _requireDir2.default)(__dirname, { recurse: true });
};

module.exports = exports.default;