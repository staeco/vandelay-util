'use strict';

exports.__esModule = true;

var _phone = require('phone');

var _phone2 = _interopRequireDefault(_phone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (v, country) => {
  const res = (0, _phone2.default)(String(v), country);
  if (!res || res.length === 0) return null;
  return res[0];
};

module.exports = exports.default;