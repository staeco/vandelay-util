"use strict";

exports.__esModule = true;
exports.default = void 0;

var _gdalNext = require("gdal-next");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const wgs84 = _gdalNext.SpatialReference.fromProj4('+init=epsg:4326');

var _default = (geojson, crs) => {
  const toParse = crs ? _objectSpread({
    crs: {
      type: 'name',
      properties: {
        name: crs
      }
    }
  }, geojson) : geojson;
  if (!toParse.crs) throw new Error('Missing CRS! Must be defined in either the input object or provided as an argument.');

  const geom = _gdalNext.Geometry.fromGeoJson(toParse);

  if (!geom) throw new Error('Invalid geometry in reproject!');
  geom.transformTo(wgs84);
  const obj = geom.toObject();
  if (!geojson.properties) return obj;
  return _objectSpread(_objectSpread({}, obj), {}, {
    properties: geojson.properties
  });
};

exports.default = _default;
module.exports = exports.default;