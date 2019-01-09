'use strict';

exports.__esModule = true;

var _quickLru = require('quick-lru');

var _quickLru2 = _interopRequireDefault(_quickLru);

var _pelias = require('../../lib/pelias');

var _pelias2 = _interopRequireDefault(_pelias);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const { pelias } = global.__vandelay_util_config;
const lru = new _quickLru2.default({ maxSize: 10000 });

exports.default = async ({ address, city, region, country }) => {
  if (!address) throw new Error('Missing address text (in geo.locate)');
  const query = {
    locality: city,
    region,
    country,
    address

    // check if cache has it first
  };const lruKey = JSON.stringify(query);
  if (lru.has(lruKey)) return lru.get(lruKey);

  const opts = {
    query,
    host: pelias.hosts.structured

    // not in cache, fetch it
  };const out = await (0, _pelias2.default)(opts);
  if (!out) return;
  lru.set(lruKey, out);
  return out;
};

module.exports = exports.default;