'use strict';

exports.__esModule = true;

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

exports.default = geometry => {
  if (geometry == null) return;
  geometry = geometry.geometry || geometry;
  if (!geometry.type) throw new Error('type is required');
  if (!geometry.coordinates) throw new Error('coordinates is required');
  const isSingle = geometry.type.indexOf('Multi') !== 0;
  if (!isSingle) return geometry; // is a multi, return early
  const { type, coordinates } = geometry,
        rest = _objectWithoutProperties(geometry, ['type', 'coordinates']);
  return Object.assign({
    type: `Multi${type}`
  }, rest, {
    coordinates: [coordinates]
  });
};

module.exports = exports.default;