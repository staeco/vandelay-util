"use strict";

exports.__esModule = true;
exports.default = void 0;

var _pelias = _interopRequireDefault(require("../../lib/pelias"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  pelias
} = global.__vandelay_util_config;

var _default = async ({
  address,
  city,
  region,
  postalCode,
  country,
  sources,
  layers,
  filter,
  minConfidence
}) => {
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
  return (0, _pelias.default)({
    debugName: 'geo.locate',
    query,
    host: pelias.hosts.structured,
    filter,
    minConfidence
  });
};

exports.default = _default;
module.exports = exports.default;