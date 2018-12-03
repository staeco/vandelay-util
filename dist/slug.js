'use strict';

exports.__esModule = true;

var _slugify = require('@sindresorhus/slugify');

var _slugify2 = _interopRequireDefault(_slugify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (...v) => {
  const args = v.filter(i => i != null).map(v => v instanceof Date ? v.toLocaleDateString() : v);
  if (args.length === 0) return;
  return (0, _slugify2.default)(args.join(' ')).toLowerCase();
};

module.exports = exports.default;