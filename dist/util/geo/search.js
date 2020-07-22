'use strict';

exports.__esModule = true;

var _pelias = require('../../lib/pelias');

var _pelias2 = _interopRequireDefault(_pelias);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const { pelias } = global.__vandelay_util_config;

exports.default = async ({ text, sources, layers, filter, minConfidence }) => {
  if (!text) throw new Error('Missing address text (in geo.search)');
  const query = {
    text,
    layers: layers ? layers.join(',') : undefined,
    sources: sources ? sources.join(',') : undefined
  };

  return (0, _pelias2.default)({
    debugName: 'geo.search',
    query,
    filter,
    minConfidence,
    host: pelias.hosts.search
  });
};

module.exports = exports.default;