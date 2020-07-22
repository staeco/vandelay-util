'use strict';

exports.__esModule = true;

var _pelias = require('../../lib/pelias');

var _pelias2 = _interopRequireDefault(_pelias);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const { pelias } = global.__vandelay_util_config;

exports.default = async ({ address, city, region, postalCode, country, sources, layers, filter, minConfidence }) => {
  if (!address) throw new Error('Missing address text (in geo.locate)');
  const query = {
    locality: city,
    postalcode: postalCode,
    region,
    country,
    address,
    layers: layers ? layers.join(',') : undefined,
    sources: sources ? sources.join(',') : undefined
  };
  return (0, _pelias2.default)({
    debugName: 'geo.locate',
    query,
    host: pelias.hosts.structured,
    filter,
    minConfidence
  });
};

module.exports = exports.default;