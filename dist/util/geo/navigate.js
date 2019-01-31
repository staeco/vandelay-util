'use strict';

exports.__esModule = true;

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _polyline = require('@mapbox/polyline');

var _polyline2 = _interopRequireDefault(_polyline);

var _quickLru = require('quick-lru');

var _quickLru2 = _interopRequireDefault(_quickLru);

var _http = require('http');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const { pelias } = global.__vandelay_util_config;
const lru = new _quickLru2.default({ maxSize: 10000 });
const agent = new _http.Agent({ keepAlive: true });

const types = {
  driving: 'auto',
  walking: 'pedestrian',
  cycling: 'bicycle',
  bus: 'bus',
  any: 'multimodal'
};

exports.default = async ({ type, start, end, optional }) => {
  if (!pelias) throw new Error('Missing pelias configuration option (in geo.navigate)');
  if (!types[type]) throw new Error(`Invalid type: ${type} (in geo.navigate)`);
  if (!start || !start.coordinates) throw new Error('Missing start coordinates (in geo.navigate)');
  if (!end || !end.coordinates) throw new Error('Missing end coordinates (in geo.navigate)');
  if (start.type !== 'Point') throw new Error('Invalid start type, expected Point (in geo.navigate)');
  if (end.type !== 'Point') throw new Error('Invalid end type, expected Point (in geo.navigate)');

  const path = {
    type: 'LineString',
    coordinates: [start.coordinates, end.coordinates]
  };
  const q = {
    json: JSON.stringify({
      costing: types[type],
      locations: [{ lat: start.coordinates[1], lon: start.coordinates[0] }, { lat: end.coordinates[1], lon: end.coordinates[0] }]
    })
    // check if cache has it first
  };const lruKey = JSON.stringify(q);
  if (lru.has(lruKey)) return lru.get(lruKey);

  // not in cache, fetch it
  let out;
  try {
    const { body } = await _superagent2.default.get(pelias.hosts.route).retry(10).set('apikey', pelias.key).type('json').agent(agent).query(q);
    out = _polyline2.default.toGeoJSON(body.trip.legs[0].shape);
  } catch (err) {
    if (!optional) {
      if (err.response && err.response.body && err.response.body.error) {
        throw new Error(`${err.response.body.error} (in geo.navigate)`);
      }
      throw new Error(`${err.message || err} (in geo.navigate)`);
    }
  }
  if (!out && optional) out = path;

  // put it in cache for later
  lru.set(lruKey, out);
  return out;
};

module.exports = exports.default;