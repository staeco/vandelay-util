'use strict';

exports.__esModule = true;

var _wkx = require('wkx');

var _wkx2 = _interopRequireDefault(_wkx);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = str => {
  if (str == null) return;
  return _wkx2.default.Geometry.parse(str).toGeoJSON();
};

module.exports = exports.default;