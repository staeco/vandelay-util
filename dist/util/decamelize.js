'use strict';

exports.__esModule = true;

var _decamelize = require('decamelize');

var _decamelize2 = _interopRequireDefault(_decamelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = v => {
  if (v == null) return;
  return (0, _decamelize2.default)(String(v), ' ');
};

module.exports = exports.default;