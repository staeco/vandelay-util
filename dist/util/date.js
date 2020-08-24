"use strict";

exports.__esModule = true;
exports.default = void 0;

var _momentTimezone = _interopRequireDefault(require("moment-timezone"));

var _numeral = _interopRequireDefault(require("numeral"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const parseNum = v => String(v).match(/^[-+]?\d*$/) ? (0, _numeral.default)(v).value() : null;

const pad = num => String(num).padStart(2, 0);

const produceDateFormat = timestamp => {
  if (!timestamp.isValid()) return;
  return timestamp.toISOString();
};

var _default = (v, tz) => {
  if (!tz) throw new Error('Missing timezone (in util.date)');
  if (v == null) return;
  const dv = new Date(v); // js Date does a good job of parsing/coercing weird strings to a date, do this now and hang onto it for later

  if (isNaN(dv)) return;
  const epoch = parseNum(v); // try to parse the input number or string to a number which will be interpreted as epoch time

  if (epoch) {
    // if it's epoch time, we can use unix in moment
    return produceDateFormat(_momentTimezone.default.unix(epoch / 1000).utc());
  }

  if (/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(\.\d+)?(([+-]\d\d:\d\d)|Z)?$/i.test(v)) {
    //check if it matches ISO 8601 with a regex; necessary because moment will sometimes parse things that aren't true ISO 8601 even when set to strict
    const mt = (0, _momentTimezone.default)(v, _momentTimezone.default.ISO_8601, true); //true to use strict parsing in moment

    if (mt.isValid()) return produceDateFormat(mt);
  } // if we've gotten this far, assume that js Date got the time wrong due to timezone issues and yank the local values out so we can build a string for moment to parse, eliminating the need to correct for weird timezone stuff


  const dateString = `${dv.getFullYear()}-${pad(dv.getMonth() + 1)}-${pad(dv.getDate())} ${pad(dv.getHours())}:${pad(dv.getMinutes())}:${pad(dv.getSeconds())}`;
  return produceDateFormat(_momentTimezone.default.tz(dateString, 'YYYY-MM-DD HH:mm:ss', tz).utc());
};

exports.default = _default;
module.exports = exports.default;