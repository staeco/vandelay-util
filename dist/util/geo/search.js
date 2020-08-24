"use strict";

exports.__esModule = true;
exports.default = void 0;

var _pelias = _interopRequireDefault(require("../../lib/pelias"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  pelias
} = global.__vandelay_util_config;

var _default = async ({
  text,
  sources,
  layers,
  filter,
  minConfidence
}) => {
  if (!text) throw new Error('Missing address text (in geo.search)');
  const query = {
    text,
    layers: layers ? layers.join(',') : undefined,
    sources: sources ? sources.join(',') : undefined
  };
  return (0, _pelias.default)({
    debugName: 'geo.search',
    query,
    filter,
    minConfidence,
    host: pelias.hosts.search
  });
};

exports.default = _default;
module.exports = exports.default;