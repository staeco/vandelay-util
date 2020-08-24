"use strict";

exports.__esModule = true;
exports.default = void 0;

var _capitalize = _interopRequireDefault(require("capitalize"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const cap = v => {
  if (v == null) return;
  return (0, _capitalize.default)(String(v));
};

cap.words = v => {
  if (v == null) return;
  return _capitalize.default.words(String(v));
};

var _default = cap;
exports.default = _default;
module.exports = exports.default;