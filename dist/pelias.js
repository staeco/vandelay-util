'use strict';

exports.__esModule = true;

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _http = require('http');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const { pelias } = global.__vandelay_util_config;
const agent = new _http.Agent({ keepAlive: true });

const makeRequest = async opts => _superagent2.default.get(opts.host).retry(10).type('json').agent(agent).set('apikey', pelias.key).query(opts.query);

const parseResponse = body => {
  const res = body.features[0];
  return {
    type: res.geometry.type,
    coordinates: res.geometry.coordinates,
    bbox: res.bbox,
    properties: {
      short: res.properties.name,
      full: res.properties.label,
      city: res.properties.locality,
      county: res.properties.county,
      region: res.properties.region,
      country: res.properties.country
    }
  };
};

const handleQuery = async opts => {
  if (!pelias) throw new Error('Missing pelias configuration option (in geo.locate)');
  try {
    const { body } = await makeRequest(opts);
    if (!body || !body.features || !body.features[0]) return;
    return parseResponse(body);
  } catch (err) {
    throw new Error(`${err.message || err} (in geo.locate)`);
  }
};

exports.default = handleQuery;
module.exports = exports.default;