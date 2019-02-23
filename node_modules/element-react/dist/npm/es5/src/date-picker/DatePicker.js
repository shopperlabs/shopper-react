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

var _utils2 = require('./utils');

var _BasePicker2 = require('./BasePicker');

var _BasePicker3 = _interopRequireDefault(_BasePicker2);

var _DatePanel = require('./panel/DatePanel');

var _DatePanel2 = _interopRequireDefault(_DatePanel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DatePicker = function (_BasePicker) {
  (0, _inherits3.default)(DatePicker, _BasePicker);
  (0, _createClass3.default)(DatePicker, null, [{
    key: 'propTypes',
    get: function get() {
      return Object.assign({}, _BasePicker3.default.propTypes, (0, _utils.pick)(_DatePanel2.default.propTypes, ['value', 'shortcuts', 'selectionMode', 'disabledDate', 'showWeekNumber', 'firstDayOfWeek', 'isShowTime']));
    }
  }, {
    key: 'defaultProps',
    get: function get() {
      var result = Object.assign({}, _BasePicker3.default.defaultProps);
      return result;
    }
  }]);

  function DatePicker(props) {
    (0, _classCallCheck3.default)(this, DatePicker);

    var type = 'date';
    switch (props.selectionMode) {
      case _utils2.SELECTION_MODES.YEAR:
        type = 'year';break;
      case _utils2.SELECTION_MODES.MONTH:
        type = 'month';break;
      case _utils2.SELECTION_MODES.WEEK:
        type = 'week';break;
    }
    return (0, _possibleConstructorReturn3.default)(this, (DatePicker.__proto__ || Object.getPrototypeOf(DatePicker)).call(this, props, type, {}));
  }

  (0, _createClass3.default)(DatePicker, [{
    key: 'pickerPanel',
    value: function pickerPanel(state, props) {
      return _react2.default.createElement(_DatePanel2.default, (0, _extends3.default)({}, props, {
        value: state.value,
        onPick: this.onPicked.bind(this)
      }));
    }
  }]);
  return DatePicker;
}(_BasePicker3.default);

var _default = DatePicker;
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(DatePicker, 'DatePicker', 'src/date-picker/DatePicker.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/date-picker/DatePicker.jsx');
}();

;