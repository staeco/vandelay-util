'use strict';

exports.__esModule = true;

var _geoTz = require('geo-tz');

var _geoTz2 = _interopRequireDefault(_geoTz);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// switch to lon, lat for consistency with geojson
exports.default = o => {
  const [lon, lat] = o.coordinates || o;
  if (lon == null || lat == null) throw new Error('Missing coordinates');
  const zones = (0, _geoTz2.default)(lat, lon);
  return zones && zones[0];
};

module.exports = exports.default;