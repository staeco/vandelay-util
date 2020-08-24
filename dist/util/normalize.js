"use strict";

exports.__esModule = true;
exports.default = void 0;

var _default = v => {
  if (v == null) return;
  const o = String(v).trim();
  if (o.length === 0) return;
  return o.replace(/\s\s+/g, ' ').toLowerCase();
};

exports.default = _default;
module.exports = exports.default;