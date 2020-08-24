"use strict";

exports.__esModule = true;
exports.default = void 0;

var _numeral = _interopRequireDefault(require("numeral"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = v => {
  if (v == null) return;
  return (0, _numeral.default)(v).value();
};

exports.default = _default;
module.exports = exports.default;