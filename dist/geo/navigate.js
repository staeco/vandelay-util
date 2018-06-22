'use strict';

exports.__esModule = true;

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _polyline = require('polyline');

var _polyline2 = _interopRequireDefault(_polyline);

var _quickLru = require('quick-lru');

var _quickLru2 = _interopRequireDefault(_quickLru);

var _http = require('http');

var _config = require('../../config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
  if (!types[type]) throw new Error(`Invalid type: ${type}`);
  if (!start || !start.coordinates) throw new Error('Missing start coordinates');
  if (!end || !end.coordinates) throw new Error('Missing end coordinates');
  if (start.type !== 'Point') throw new Error('Invalid start type, expected Point');
  if (end.type !== 'Point') throw new Error('Invalid end type, expected Point');

  const path = {
    type: 'LineString',
    coordinates: [start, end]
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
    const { body } = await _superagent2.default.get(_config.pelias.hosts.route).set('apikey', _config.pelias.key).type('json').agent(agent).query(q);
    out = _polyline2.default.toGeoJSON(body.trip.legs[0].shape);
  } catch (err) {
    if (!optional) throw err;
  }
  if (!out && optional) out = path;

  // put it in cache for later
  lru.set(lruKey, out);
  return out;
};

module.exports = exports['default'];