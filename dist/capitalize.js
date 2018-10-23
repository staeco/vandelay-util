'use strict';

exports.__esModule = true;

var _capitalize = require('capitalize');

var _capitalize2 = _interopRequireDefault(_capitalize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const cap = v => {
  if (v == null) return;
  return (0, _capitalize2.default)(String(v));
};
cap.words = v => {
  if (v == null) return;
  return _capitalize2.default.words(String(v));
};
exports.default = cap;
module.exports = exports.default;