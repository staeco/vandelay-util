"use strict";

exports.__esModule = true;

var _stae = require("stae");

Object.keys(_stae).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _stae[key]) return;
  exports[key] = _stae[key];
});