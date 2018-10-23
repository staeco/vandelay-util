'use strict';

exports.__esModule = true;

var _numeral = require('numeral');

var _numeral2 = _interopRequireDefault(_numeral);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = v => {
  if (v == null) return;
  return (0, _numeral2.default)(v).value();
};

module.exports = exports.default;