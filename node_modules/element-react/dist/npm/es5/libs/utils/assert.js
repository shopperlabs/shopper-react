'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

exports.require_condition = require_condition;

var _errors = require('./errors');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ErrorConditionFailed = function (_ExtendableError) {
  (0, _inherits3.default)(ErrorConditionFailed, _ExtendableError);

  function ErrorConditionFailed() {
    (0, _classCallCheck3.default)(this, ErrorConditionFailed);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return (0, _possibleConstructorReturn3.default)(this, (ErrorConditionFailed.__proto__ || Object.getPrototypeOf(ErrorConditionFailed)).call(this, args));
  }

  return ErrorConditionFailed;
}(_errors.ExtendableError);

function require_condition(condition) {
  var msg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'pre-condition failed';

  if (!condition) {
    throw new ErrorConditionFailed(msg);
  }
}
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(ErrorConditionFailed, 'ErrorConditionFailed', 'libs/utils/assert.js');

  __REACT_HOT_LOADER__.register(require_condition, 'require_condition', 'libs/utils/assert.js');
}();

;