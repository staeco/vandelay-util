'use strict';

exports.__esModule = true;
const parsePolygon = feature => {
  if (!feature.coordinates) throw new Error('feature.coordinates is required');
  const isPolygon = feature.type === 'Polygon';
  const coordinates = isPolygon ? [feature.coordinates] : feature.coordinates;
  return {
    coordinates,
    type: 'MultiPolygon'
  };
};

exports.default = feature => parsePolygon(feature.geometry || feature);

module.exports = exports['default'];