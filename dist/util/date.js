'use strict';

exports.__esModule = true;

var _momentTimezone = require('moment-timezone');

var _momentTimezone2 = _interopRequireDefault(_momentTimezone);

var _numeral = require('numeral');

var _numeral2 = _interopRequireDefault(_numeral);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const parseNum = v => String(v).match(/^[-+]?\d*$/) ? (0, _numeral2.default)(v).value() : null;
const pad = num => String(num).padStart(2, 0);

const produceDateFormat = timestamp => {
  if (!timestamp.isValid()) return;
  return timestamp.toISOString();
};

exports.default = (v, tz) => {
  if (!tz) throw new Error('Missing timezone (in util.date)');
  if (v == null) return;
  const dv = new Date(v);
  if (isNaN(dv)) return;
  const epoch = parseNum(v);
  if (epoch) {
    return produceDateFormat(_momentTimezone2.default.unix(epoch / 1000).utc());
  }
  const dateString = `${dv.getFullYear()}-${pad(dv.getMonth() + 1)}-${pad(dv.getDate())} ${pad(dv.getHours())}:${pad(dv.getMinutes())}:${pad(dv.getSeconds())}`;
  return produceDateFormat(_momentTimezone2.default.tz(dateString, 'YYYY-MM-DD HH:mm:ss', tz).utc());
};

module.exports = exports.default;