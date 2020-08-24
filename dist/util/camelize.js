"use strict";

exports.__esModule = true;
exports.default = void 0;

var _camelcase = _interopRequireDefault(require("camelcase"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = v => {
  if (v == null) return;
  return (0, _camelcase.default)(String(v));
};

exports.default = _default;
module.exports = exports.default;