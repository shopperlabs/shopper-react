'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('../../libs/utils');

var _libs = require('../../libs');

var _BasePicker2 = require('./BasePicker');

var _BasePicker3 = _interopRequireDefault(_BasePicker2);

var _DateRangePanel = require('./panel/DateRangePanel');

var _DateRangePanel2 = _interopRequireDefault(_DateRangePanel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DateRangePicker = function (_BasePicker) {
  (0, _inherits3.default)(DateRangePicker, _BasePicker);
  (0, _createClass3.default)(DateRangePicker, null, [{
    key: 'propTypes',
    get: function get() {
      return Object.assign({}, { rangeSeparator: _libs.PropTypes.string }, _BasePicker3.default.propTypes,
      // default value is been defined in ./constants file
      (0, _utils.pick)(_DateRangePanel2.default.propTypes, ['value', 'isShowTime', 'shortcuts', 'firstDayOfWeek']));
    }
  }, {
    key: 'defaultProps',
    get: function get() {
      var result = Object.assign({}, _BasePicker3.default.defaultProps);
      return result;
    }
  }]);

  function DateRangePicker(props) {
    (0, _classCallCheck3.default)(this, DateRangePicker);
    return (0, _possibleConstructorReturn3.default)(this, (DateRangePicker.__proto__ || Object.getPrototypeOf(DateRangePicker)).call(this, props, 'daterange', {}));
  }

  (0, _createClass3.default)(DateRangePicker, [{
    key: 'getFormatSeparator',
    value: function getFormatSeparator() {
      return this.props.rangeSeparator;
    }
  }, {
    key: 'pickerPanel',
    value: function pickerPanel(state, props) {
      var value = state.value;
      if (value instanceof Date) {
        value = [value, null];
      }
      return _react2.default.createElement(_DateRangePanel2.default, (0, _extends3.default)({}, props, {
        value: value,
        onPick: this.onPicked.bind(this)
      }));
    }
  }]);
  return DateRangePicker;
}(_BasePicker3.default);

var _default = DateRangePicker;
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(DateRangePicker, 'DateRangePicker', 'src/date-picker/DateRangePicker.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/date-picker/DateRangePicker.jsx');
}();

;