"use strict";

exports.__esModule = true;
exports.default = void 0;

var _superagent = _interopRequireDefault(require("superagent"));

var _polyline = _interopRequireDefault(require("@mapbox/polyline"));

var _geojsonPrecision = _interopRequireDefault(require("geojson-precision"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  pelias
} = global.__vandelay_util_config;
const types = {
  driving: 'auto',
  walking: 'pedestrian',
  cycling: 'bicycle',
  bus: 'bus',
  any: 'multimodal'
};

var _default = async ({
  type,
  start,
  end,
  optional,
  sources
}) => {
  if (!pelias) throw new Error('Missing pelias configuration option (in geo.navigate)');
  if (!types[type]) throw new Error(`Invalid type: ${type} (in geo.navigate)`);
  if (!start || !start.coordinates) throw new Error('Missing start coordinates (in geo.navigate)');
  if (!end || !end.coordinates) throw new Error('Missing end coordinates (in geo.navigate)');
  if (start.type !== 'Point') throw new Error('Invalid start type, expected Point (in geo.navigate)');
  if (end.type !== 'Point') throw new Error('Invalid end type, expected Point (in geo.navigate)');
  const startPoint = (0, _geojsonPrecision.default)(start, 6); // set fixed precision as Valhalla can be picky

  const endPoint = (0, _geojsonPrecision.default)(end, 6);
  const path = {
    type: 'LineString',
    coordinates: [startPoint.coordinates, endPoint.coordinates]
  };
  const q = {
    json: JSON.stringify({
      costing: types[type],
      locations: [{
        lat: startPoint.coordinates[1],
        lon: startPoint.coordinates[0]
      }, {
        lat: endPoint.coordinates[1],
        lon: endPoint.coordinates[0]
      }]
    }),
    sources: sources ? sources.join(',') : undefined
  };
  let out;

  try {
    const {
      body
    } = await _superagent.default.get(pelias.hosts.route).retry(10).set('apikey', pelias.key).type('json').query(q);
    out = _polyline.default.toGeoJSON(body.trip.legs[0].shape, 6); // decode using Valhalla's fixed precision
  } catch (err) {
    if (!optional) {
      if (err.response && err.response.body && err.response.body.error) {
        throw new Error(`${err.response.body.error} (in geo.navigate)`);
      }

      throw new Error(`${err.message || err} (in geo.navigate)`);
    }
  }

  if (!out && optional) out = path;
  return out;
};

exports.default = _default;
module.exports = exports.default;