'use strict';

exports.__esModule = true;

var _validator = require('validator');

var _validator2 = _interopRequireDefault(_validator);

var _isPhone = require('is-phone');

var _isPhone2 = _interopRequireDefault(_isPhone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = Object.assign({}, _validator2.default, {
  isPhone: _isPhone2.default
});
module.exports = exports.default;