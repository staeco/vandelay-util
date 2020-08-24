"use strict";

exports.__esModule = true;
exports.default = void 0;

var _superagent = _interopRequireDefault(require("superagent"));

var _capitalize = _interopRequireDefault(require("../capitalize"));

var _pelias = _interopRequireDefault(require("../../lib/pelias"));

var turf = _interopRequireWildcard(require("@turf/turf"));

var _http = require("http");

var _lodash = require("lodash");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  pelias
} = global.__vandelay_util_config;
const agent = new _http.Agent({
  keepAlive: true
});

const locateCity = async ({
  city,
  region,
  country,
  sources
}) => {
  const query = {
    text: `${city}, ${region} ${country}`,
    size: 1,
    layers: 'coarse',
    // anything but address and vanue
    sources: sources ? sources.join(',') : undefined
  };
  const opts = {
    query,
    host: pelias.hosts.search
  };
  return (0, _pelias.default)(opts);
};

const runOverpassQuery = async query => {
  const qs = `[out:json];
    ${query}
  out body;`;
  const {
    body
  } = await _superagent.default.post('http://overpass-api.de/api/interpreter').send(qs).retry(10).agent(agent);
  return body;
};

const locateWay = async ({
  street,
  bbox
}) => {
  const query = `way
      ["name"~"${_capitalize.default.words(street)}"]
      (${bbox[1]}, ${bbox[0]}, ${bbox[3]}, ${bbox[2]});`;
  return runOverpassQuery(query);
};

const lookupNodeId = async nodeId => {
  const {
    elements
  } = await runOverpassQuery(`node(${nodeId});`);
  return elements[0];
};

const intersectionSplitExp = /[/,]/;

var _default = async ({
  intersection,
  city,
  region,
  country,
  sources
}) => {
  if (!pelias) throw new Error('Missing pelias configuration option (in geo.locate)');
  const {
    bbox
  } = await locateCity({
    city,
    region,
    country,
    sources
  }); // get city's bounding box
  // use bounding box in searches

  const streets = intersection.split(intersectionSplitExp).map(_lodash.trim); // split street intersections on forward slash and comma

  const waysData = await Promise.all(streets.map(async street => {
    const way = await locateWay({
      street,
      bbox
    });
    return (0, _lodash.uniq)((0, _lodash.flatten)(way.elements.map(e => e.nodes)));
  }));
  const intersectionNodeId = (0, _lodash.intersection)(waysData[0], waysData[1]);
  const node = await lookupNodeId(intersectionNodeId);
  return turf.point([node.lon, node.lat]).geometry;
};

exports.default = _default;
module.exports = exports.default;