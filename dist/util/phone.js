"use strict";

exports.__esModule = true;
exports.default = void 0;

var _phone = _interopRequireDefault(require("phone"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = (v, country) => {
  const res = (0, _phone.default)(String(v), country);
  if (!res || res.length === 0) return null;
  return res[0];
};

exports.default = _default;
module.exports = exports.default;