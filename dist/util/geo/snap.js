'use strict';

exports.__esModule = true;

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _polyline = require('@mapbox/polyline');

var _polyline2 = _interopRequireDefault(_polyline);

var _quickLru = require('quick-lru');

var _quickLru2 = _interopRequireDefault(_quickLru);

var _http = require('http');

var _numeral = require('numeral');

var _numeral2 = _interopRequireDefault(_numeral);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const { pelias } = global.__vandelay_util_config;
const lru = new _quickLru2.default({ maxSize: 10000 });
const agent = new _http.Agent({ keepAlive: true });

const types = {
  driving: 'auto',
  walking: 'pedestrian',
  cycling: 'bicycle',
  bus: 'bus'
};

const encodePath = path => _lodash2.default.map(path.coordinates, i => ({
  lon: (0, _numeral2.default)(i[0].toFixed(6)).value(), // Valhalla wants 6-digit precision
  lat: (0, _numeral2.default)(i[1].toFixed(6)).value()
}));

exports.default = async ({ type, path, optional }) => {
  if (!pelias) throw new Error('Missing pelias configuration option (in geo.snap)');
  if (!types[type]) throw new Error(`Invalid type: ${type} (in geo.snap)`);
  if (!path || !path.coordinates) throw new Error('Missing path (in geo.snap)');
  if (path.type !== 'LineString') throw new Error('Invalid path type, expected LineString (in geo.snap)');

  const q = {
    costing: types[type],
    shape: encodePath(path)

    // check if cache has it first
  };const lruKey = JSON.stringify(q);
  if (lru.has(lruKey)) return lru.get(lruKey);

  // not in cache, fetch it
  let out;
  try {
    const { body } = await _superagent2.default.post(pelias.hosts.trace).retry(10).type('json').set('apikey', pelias.key).agent(agent).send(q);
    out = _polyline2.default.toGeoJSON(body.trip.legs[0].shape);
  } catch (err) {
    if (!optional) {
      if (err.response && err.response.body && err.response.body.error) {
        throw new Error(`${err.response.body.error} (in geo.snap)`);
      }
      throw new Error(`${err.message || err} (in geo.snap)`);
    }
  }
  if (!out && optional) out = path;

  // put it in cache for later
  lru.set(lruKey, out);
  return out;
};

module.exports = exports.default;