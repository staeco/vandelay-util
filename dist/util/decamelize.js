"use strict";

exports.__esModule = true;
exports.default = void 0;

var _decamelize = _interopRequireDefault(require("decamelize"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = v => {
  if (v == null) return;
  return (0, _decamelize.default)(String(v), ' ');
};

exports.default = _default;
module.exports = exports.default;