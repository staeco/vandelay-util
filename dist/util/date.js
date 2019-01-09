'use strict';

exports.__esModule = true;

var _momentTimezone = require('moment-timezone');

var _momentTimezone2 = _interopRequireDefault(_momentTimezone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (v, tz) => {
  if (!tz) throw new Error('Missing timezone (in util.date)');
  if (v == null) return;
  const dv = new Date(v);
  if (isNaN(dv)) return;
  const d = _momentTimezone2.default.tz(dv, tz);
  if (!d.isValid()) return;
  return d.toISOString();
};

module.exports = exports.default;