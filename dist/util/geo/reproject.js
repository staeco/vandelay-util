"use strict";

exports.__esModule = true;
exports.default = void 0;

var _gdalNext = require("gdal-next");

const wgs84 = _gdalNext.SpatialReference.fromProj4('+init=epsg:4326');

var _default = (geojson, crs) => {
  const toParse = crs ? {
    crs: {
      type: 'name',
      properties: {
        name: crs
      }
    },
    ...geojson
  } : geojson;
  if (!toParse.crs) throw new Error('Missing CRS! Must be defined in either the input object or provided as an argument.');

  const geom = _gdalNext.Geometry.fromGeoJson(toParse);

  if (!geom) throw new Error('Invalid geometry in reproject!');
  geom.transformTo(wgs84);
  const obj = geom.toObject();
  if (!geojson.properties) return obj;
  return { ...obj,
    properties: geojson.properties
  };
};

exports.default = _default;
module.exports = exports.default;