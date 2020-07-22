'use strict';

exports.__esModule = true;

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _capitalize = require('../capitalize');

var _capitalize2 = _interopRequireDefault(_capitalize);

var _pelias = require('../../lib/pelias');

var _pelias2 = _interopRequireDefault(_pelias);

var _turf = require('@turf/turf');

var turf = _interopRequireWildcard(_turf);

var _http = require('http');

var _lodash = require('lodash');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const { pelias } = global.__vandelay_util_config;
const agent = new _http.Agent({ keepAlive: true });

const locateCity = async ({ city, region, country, sources, minConfidence }) => {
  const query = {
    text: `${city}, ${region} ${country}`,
    size: 1,
    sources: sources ? sources.join(',') : undefined
  };
  const opts = {
    query,
    host: pelias.hosts.search,
    minConfidence
  };
  return (0, _pelias2.default)(opts);
};

const runOverpassQuery = async query => {
  const qs = `[out:json];
    ${query}
  out body;`;
  const { body } = await _superagent2.default.post('http://overpass-api.de/api/interpreter').send(qs).retry(10).agent(agent);
  return body;
};

const locateWay = async ({ street, bbox }) => {
  const query = `way
      ["name"~"${_capitalize2.default.words(street)}"]
      (${bbox[1]}, ${bbox[0]}, ${bbox[3]}, ${bbox[2]});`;
  return runOverpassQuery(query);
};

const lookupNodeId = async nodeId => {
  const { elements } = await runOverpassQuery(`node(${nodeId});`);
  return elements[0];
};

const intersectionSplitExp = /[/,]/;

exports.default = async ({ intersection, city, region, country }) => {
  if (!pelias) throw new Error('Missing pelias configuration option (in geo.locate)');
  const { bbox } = await locateCity({ city, region, country }); //get city's bounding box

  // use bounding box in searches
  const streets = intersection.split(intersectionSplitExp).map(_lodash.trim); // split street intersections on forward slash and comma
  const waysData = await Promise.all(streets.map(async street => {
    const way = await locateWay({ street, bbox });
    return (0, _lodash.uniq)((0, _lodash.flatten)(way.elements.map(e => e.nodes)));
  }));
  const intersectionNodeId = (0, _lodash.intersection)(waysData[0], waysData[1]);
  const node = await lookupNodeId(intersectionNodeId);
  return turf.point([node.lon, node.lat]).geometry;
};

module.exports = exports.default;