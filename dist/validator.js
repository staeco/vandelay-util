'use strict';

exports.__esModule = true;

var _validator = require('validator');

var validator = _interopRequireWildcard(_validator);

var _isPhone = require('is-phone');

var _isPhone2 = _interopRequireDefault(_isPhone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.default = Object.assign({}, validator, {
  isPhone: _isPhone2.default
});
module.exports = exports['default'];