"use strict";

exports.__esModule = true;
exports.default = void 0;

var _wkx = _interopRequireDefault(require("wkx"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = str => {
  if (str == null) return;
  return _wkx.default.Geometry.parse(str).toGeoJSON();
};

exports.default = _default;
module.exports = exports.default;