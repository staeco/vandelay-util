"use strict";

exports.__esModule = true;
exports.default = void 0;

var _isSea = _interopRequireDefault(require("is-sea"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// switch to lon, lat for consistency with geojson
var _default = o => {
  const [lon, lat] = o.coordinates || o;
  if (lon == null || lat == null) throw new Error('Missing coordinates');
  return (0, _isSea.default)(lat, lon);
};

exports.default = _default;
module.exports = exports.default;