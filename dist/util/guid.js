"use strict";

exports.__esModule = true;
exports.default = void 0;

var _aguid = _interopRequireDefault(require("aguid"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _ref(i) {
  return i != null;
}

var _default = (...v) => {
  const args = v.filter(_ref);
  if (args.length === 0) return;
  return (0, _aguid.default)(args.join('-'));
};

exports.default = _default;
module.exports = exports.default;