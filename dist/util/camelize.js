'use strict';

exports.__esModule = true;

var _camelcase = require('camelcase');

var _camelcase2 = _interopRequireDefault(_camelcase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = v => {
  if (v == null) return;
  return (0, _camelcase2.default)(String(v));
};

module.exports = exports.default;