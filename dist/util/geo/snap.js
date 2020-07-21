'use strict';

exports.__esModule = true;

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _polyline = require('@mapbox/polyline');

var _polyline2 = _interopRequireDefault(_polyline);

var _http = require('http');

var _geojsonPrecision = require('geojson-precision');

var _geojsonPrecision2 = _interopRequireDefault(_geojsonPrecision);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const { pelias } = global.__vandelay_util_config;
const agent = new _http.Agent({ keepAlive: true });

const types = {
  driving: 'auto',
  walking: 'pedestrian',
  cycling: 'bicycle',
  bus: 'bus'
};

const encodePath = path => (0, _geojsonPrecision2.default)(path, 6) // Valhalla wants 6-digit precision
.coordinates.map(i => ({
  lon: i[0],
  lat: i[1]
}));

exports.default = async ({ type, path, optional }) => {
  if (!pelias) throw new Error('Missing pelias configuration option (in geo.snap)');
  if (!types[type]) throw new Error(`Invalid type: ${type} (in geo.snap)`);
  if (!path || !path.coordinates) throw new Error('Missing path (in geo.snap)');
  if (path.type !== 'LineString') throw new Error('Invalid path type, expected LineString (in geo.snap)');

  const q = {
    costing: types[type],
    shape: encodePath(path)

    // not in cache, fetch it
  };let out;
  try {
    const { body } = await _superagent2.default.post(pelias.hosts.trace).retry(10).type('json').set('apikey', pelias.key).agent(agent).send(q);
    out = _polyline2.default.toGeoJSON(body.trip.legs[0].shape, 6);
  } catch (err) {
    if (!optional) {
      if (err.response && err.response.body && err.response.body.error) {
        throw new Error(`${err.response.body.error} (in geo.snap)`);
      }
      throw new Error(`${err.message || err} (in geo.snap)`);
    }
  }
  if (!out && optional) out = path;
  return out;
};

module.exports = exports.default;