'use strict';

exports.__esModule = true;

var _fahrenheitToCelsius = require('fahrenheit-to-celsius');

var _fahrenheitToCelsius2 = _interopRequireDefault(_fahrenheitToCelsius);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = v => {
  if (typeof v === 'string') v = parseFloat(v);
  return (0, _fahrenheitToCelsius2.default)(v);
};

module.exports = exports['default'];