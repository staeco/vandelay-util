'use strict';

exports.__esModule = true;

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _polyline = require('polyline');

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
  bus: 'bus'
};

exports.default = async ({ type, path, optional }) => {
  if (!pelias) throw new Error('Missing pelias configuration option');
  if (!types[type]) throw new Error(`Invalid type: ${type}`);
  if (!path || !path.coordinates) throw new Error('Missing path');
  if (path.type !== 'LineString') throw new Error('Invalid path type, expected LineString');

  const q = {
    costing: types[type],
    encoded_polyline: _polyline2.default.fromGeoJSON(path)

    // check if cache has it first
  };const lruKey = JSON.stringify(q);
  if (lru.has(lruKey)) return lru.get(lruKey);

  // not in cache, fetch it
  let out;
  try {
    const { body } = await _superagent2.default.get(pelias.hosts.trace).type('json').set('apikey', pelias.key).agent(agent).send(q);
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