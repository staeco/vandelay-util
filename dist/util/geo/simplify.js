"use strict";

exports.__esModule = true;
exports.default = void 0;

var _turf = require("@turf/turf");

var _lodash = require("lodash");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

// 1 = 69 miles
// 0.001 = 1 city block
// 0.0001 = 10 meter
// 0.00001 = 1 meter
// 0.0000001 = actual practical limit of surveying, 11mm
var _default = (geometry, {
  tolerance = 0.00001
} = {}) => {
  if (geometry == null) return;
  geometry = geometry.geometry || geometry;
  if (geometry == null) return;

  const {
    type,
    coordinates
  } = geometry,
        rest = _objectWithoutProperties(geometry, ["type", "coordinates"]);

  if (!type) throw new Error('type is required');
  if (!coordinates) throw new Error('coordinates is required');

  if (type === 'LineString' && coordinates.length === 2 && (0, _lodash.isEqual)(coordinates[0], coordinates[1])) {
    throw new Error('Invalid LineString! Only two coordinates that are identical.');
  }

  const res = (0, _turf.simplify)((0, _turf.truncate)(geometry, {
    precision: 6,
    coordinates: 3
  }), {
    tolerance
  });
  return _objectSpread(_objectSpread({
    type
  }, rest), {}, {
    coordinates: res.coordinates
  });
};

exports.default = _default;
module.exports = exports.default;