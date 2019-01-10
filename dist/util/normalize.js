'use strict';

exports.__esModule = true;

exports.default = v => {
  if (v == null) return;
  const o = String(v).trim();
  if (o.length === 0) return;
  return o.replace(/\s\s+/g, ' ').toLowerCase();
};

module.exports = exports.default;