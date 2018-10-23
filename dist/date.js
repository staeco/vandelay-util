"use strict";

exports.__esModule = true;

exports.default = v => {
  if (v == null) return;
  const d = new Date(v);
  return isNaN(d) ? undefined : d;
};

module.exports = exports.default;