'use strict';

exports.__esModule = true;

var _slugify = require('@sindresorhus/slugify');

var _slugify2 = _interopRequireDefault(_slugify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (...v) => (0, _slugify2.default)(v.join(' ')).toLowerCase();

module.exports = exports.default;