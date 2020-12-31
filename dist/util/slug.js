"use strict";

exports.__esModule = true;
exports.default = void 0;

var _slugify = _interopRequireDefault(require("@sindresorhus/slugify"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _ref(i) {
  return i != null;
}

function _ref2(v) {
  return v instanceof Date ? v.toLocaleDateString() : v;
}

var _default = (...v) => {
  const args = v.filter(_ref).map(_ref2);
  if (args.length === 0) return;
  return (0, _slugify.default)(args.join(' ')).toLowerCase();
};

exports.default = _default;
module.exports = exports.default;