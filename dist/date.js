"use strict";

exports.__esModule = true;

exports.default = v => {
  if (!v) return null;
  const d = new Date(v);
  return isNaN(d) ? null : d;
};

module.exports = exports.default;