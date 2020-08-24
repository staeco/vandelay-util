"use strict";

exports.__esModule = true;
exports.default = void 0;

var _convertUnits = _interopRequireDefault(require("convert-units"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const dummy = {
  from: () => {},
  to: () => {}
};

var _default = v => {
  if (v == null) return dummy;
  if (typeof v === 'string') v = parseFloat(v);
  if (isNaN(v)) return dummy;
  if (typeof v !== 'number') return dummy;
  return (0, _convertUnits.default)(v);
};

exports.default = _default;
module.exports = exports.default;