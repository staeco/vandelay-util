'use strict';

exports.__esModule = true;

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _http = require('http');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const { pelias } = global.__vandelay_util_config;
const agent = new _http.Agent({ keepAlive: true });

const makeRequest = async opts => _superagent2.default.get(opts.host).retry(10).type('json').agent(agent).set('apikey', pelias.key).query(opts.query);

const parseResponse = ([res]) => ({
  type: res.geometry.type,
  coordinates: res.geometry.coordinates,
  bbox: res.bbox,
  properties: {
    short: res.properties.name,
    full: res.properties.label,
    city: res.properties.locality,
    county: res.properties.county,
    region: res.properties.region,
    postalCode: res.properties.postalcode,
    country: res.properties.country
  }
});

const handleQuery = async ({ host, query, minConfidence = 0.9 }) => {
  const { pelias } = global.__vandelay_util_config;
  if (!pelias) throw new Error('Missing pelias configuration option (in geo.locate)');
  try {
    const { body } = await makeRequest({ host, query });
    if (!body || !body.features || !body.features[0]) return;
    const features = body.features.filter(f => f.properties.confidence >= minConfidence); // filter by confidence
    if (!features[0]) return; // if there are no features, confidence was too low
    return parseResponse(features);
  } catch (err) {
    throw new Error(`${err.message || err} (in geo.locate)`);
  }
};

exports.default = handleQuery;
module.exports = exports.default;