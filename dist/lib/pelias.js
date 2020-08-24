"use strict";

exports.__esModule = true;
exports.default = void 0;

var _superagent = _interopRequireDefault(require("superagent"));

var _http = require("http");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  pelias
} = global.__vandelay_util_config;
const agent = new _http.Agent({
  keepAlive: true
});

const makeRequest = async opts => _superagent.default.get(opts.host).retry(10).type('json').agent(agent).set('apikey', pelias.key).query(opts.query);

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

const handleQuery = async ({
  debugName,
  host,
  query,
  filter,
  minConfidence = 0.9
}) => {
  const {
    pelias
  } = global.__vandelay_util_config;
  if (!pelias) throw new Error(`Missing pelias configuration option (in ${debugName})`);

  try {
    const {
      body
    } = await makeRequest({
      host,
      query
    });
    if (!body || !body.features || body.features.length === 0) return;
    let features = body.features.filter(f => f.properties.confidence >= minConfidence); // filter by confidence

    if (filter) features = features.filter(filter);
    if (features.length === 0) return; // nothing passed the filters!

    return parseResponse(features);
  } catch (err) {
    throw new Error(`${err.message || err} (in ${debugName})`);
  }
};

var _default = handleQuery;
exports.default = _default;
module.exports = exports.default;