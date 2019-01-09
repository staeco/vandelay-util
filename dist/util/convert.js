'use strict';

exports.__esModule = true;

var _convertUnits = require('convert-units');

var _convertUnits2 = _interopRequireDefault(_convertUnits);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const dummy = {
  from: () => {},
  to: () => {}
};

exports.default = v => {
  if (v == null) return dummy;
  if (typeof v === 'string') v = parseFloat(v);
  if (isNaN(v)) return dummy;
  if (typeof v !== 'number') return dummy;
  return (0, _convertUnits2.default)(v);
};

module.exports = exports.default;