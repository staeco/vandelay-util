'use strict';

exports.__esModule = true;

var _turf = require('@turf/turf');

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

// 1 = 69 miles
// 0.001 = 1 city block
// 0.0001 = 10 meter
// 0.00001 = 1 meter
// 0.0000001 = actual practical limit of surveying, 11mm
exports.default = (geometry, { tolerance = 0.00001 } = {}) => {
  if (geometry == null) return;
  geometry = geometry.geometry || geometry;
  if (!geometry.type) throw new Error('type is required');
  if (!geometry.coordinates) throw new Error('coordinates is required');

  const isSingle = geometry.type.indexOf('Multi') !== 0;
  if (!isSingle) return geometry; // is a multi, return early
  const { type, coordinates } = geometry,
        rest = _objectWithoutProperties(geometry, ['type', 'coordinates']);
  const res = (0, _turf.simplify)(geometry, { tolerance });
  return Object.assign({
    type
  }, rest, {
    coordinates: res.coordinates
  });
};

module.exports = exports.default;