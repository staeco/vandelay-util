"use strict";

exports.__esModule = true;
exports.default = void 0;

var _slugify = _interopRequireDefault(require("@sindresorhus/slugify"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = (...v) => {
  const args = v.filter(i => i != null).map(v => v instanceof Date ? v.toLocaleDateString() : v);
  if (args.length === 0) return;
  return (0, _slugify.default)(args.join(' ')).toLowerCase();
};

exports.default = _default;
module.exports = exports.default;