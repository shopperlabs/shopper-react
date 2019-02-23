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

var _debounce = require('throttle-debounce/debounce');

var _debounce2 = _interopRequireDefault(_debounce);

var _libs = require('../../libs');

var _BasePicker2 = require('./BasePicker');

var _BasePicker3 = _interopRequireDefault(_BasePicker2);

var _TimeRangePanel = require('./panel/TimeRangePanel');

var _TimeRangePanel2 = _interopRequireDefault(_TimeRangePanel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TimeRangePicker = function (_BasePicker) {
  (0, _inherits3.default)(TimeRangePicker, _BasePicker);
  (0, _createClass3.default)(TimeRangePicker, null, [{
    key: 'propTypes',
    get: function get() {
      var result = Object.assign({}, { rangeSeparator: _libs.PropTypes.string }, _BasePicker3.default.propTypes);
      return result;
    }
  }, {
    key: 'defaultProps',
    get: function get() {
      var result = Object.assign({}, _BasePicker3.default.defaultProps);
      return result;
    }
  }]);

  function TimeRangePicker(props) {
    (0, _classCallCheck3.default)(this, TimeRangePicker);

    var _this = (0, _possibleConstructorReturn3.default)(this, (TimeRangePicker.__proto__ || Object.getPrototypeOf(TimeRangePicker)).call(this, props, 'timerange', {}));

    _this._onSelectionChange = (0, _debounce2.default)(200, _this.onSelectionChange.bind(_this));
    return _this;
  }

  (0, _createClass3.default)(TimeRangePicker, [{
    key: 'onSelectionChange',
    value: function onSelectionChange(start, end) {
      this.refs.inputRoot.refs.input.setSelectionRange(start, end);
      this.refs.inputRoot.refs.input.focus();
    }
  }, {
    key: 'getFormatSeparator',
    value: function getFormatSeparator() {
      return this.props.rangeSeparator;
    }
  }, {
    key: 'pickerPanel',
    value: function pickerPanel(state, props) {
      var _this2 = this;

      return _react2.default.createElement(_TimeRangePanel2.default, (0, _extends3.default)({}, props, {
        currentDates: state.value,
        onCancel: function onCancel() {
          return _this2.setState({ pickerVisible: false });
        },
        onPicked: this.onPicked.bind(this),
        onSelectRangeChange: this._onSelectionChange
      }));
    }
  }]);
  return TimeRangePicker;
}(_BasePicker3.default);

var _default = TimeRangePicker;
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(TimeRangePicker, 'TimeRangePicker', 'src/date-picker/TimeRangePicker.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/date-picker/TimeRangePicker.jsx');
}();

;