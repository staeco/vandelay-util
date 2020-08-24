"use strict";

exports.__esModule = true;
exports.default = void 0;

var _requireDir = _interopRequireDefault(require("require-dir"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = (config = {}) => {
  // hack to pass keys way down without using env
  global.__vandelay_util_config = config;
  return (0, _requireDir.default)(__dirname, {
    recurse: true
  });
};

exports.default = _default;
module.exports = exports.default;