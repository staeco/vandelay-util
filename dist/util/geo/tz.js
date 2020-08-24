"use strict";

exports.__esModule = true;
exports.default = void 0;

var _geoTz = _interopRequireDefault(require("geo-tz"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// switch to lon, lat for consistency with geojson
var _default = o => {
  const [lon, lat] = o.coordinates || o;
  if (lon == null || lat == null) throw new Error('Missing coordinates');
  const zones = (0, _geoTz.default)(lat, lon);
  return zones && zones[0];
};

exports.default = _default;
module.exports = exports.default;