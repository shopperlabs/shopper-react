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

var _TimePanel = require('./panel/TimePanel');

var _TimePanel2 = _interopRequireDefault(_TimePanel);

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function converSelectRange(props) {
  var selectableRange = [];
  if (props.selectableRange) {
    var ranges = props.selectableRange;
    var parser = _constants.TYPE_VALUE_RESOLVER_MAP.datetimerange.parser;
    var format = _constants.DEFAULT_FORMATS.timerange;

    ranges = Array.isArray(ranges) ? ranges : [ranges];
    selectableRange = ranges.map(function (range) {
      return parser(range, format);
    });
  }
  return selectableRange;
}

var TimePicker = function (_BasePicker) {
  (0, _inherits3.default)(TimePicker, _BasePicker);
  (0, _createClass3.default)(TimePicker, null, [{
    key: 'propTypes',

    // why this is used, goto: http://exploringjs.com/es6/ch_classes.html
    get: function get() {
      var result = Object.assign({}, {
        // '18:30:00 - 20:30:00'
        // or ['09:30:00 - 12:00:00', '14:30:00 - 18:30:00']
        selectableRange: _libs.PropTypes.oneOfType([_libs.PropTypes.string, _libs.PropTypes.arrayOf(_libs.PropTypes.string)])
      }, _BasePicker3.default.propTypes);

      return result;
    }
  }, {
    key: 'defaultProps',
    get: function get() {
      var result = Object.assign({}, _BasePicker3.default.defaultProps);
      return result;
    }
  }]);

  function TimePicker(props) {
    (0, _classCallCheck3.default)(this, TimePicker);

    var _this = (0, _possibleConstructorReturn3.default)(this, (TimePicker.__proto__ || Object.getPrototypeOf(TimePicker)).call(this, props, 'time', {}));

    _this._onSelectionChange = (0, _debounce2.default)(200, _this.onSelectionChange.bind(_this));
    return _this;
  }

  (0, _createClass3.default)(TimePicker, [{
    key: 'onSelectionChange',
    value: function onSelectionChange(start, end) {
      this.refs.inputRoot.refs.input.setSelectionRange(start, end);
      this.refs.inputRoot.refs.input.focus();
    }
  }, {
    key: 'pickerPanel',
    value: function pickerPanel(state, props) {
      var _this2 = this;

      return _react2.default.createElement(_TimePanel2.default, (0, _extends3.default)({}, props, {
        currentDate: state.value,
        onCancel: function onCancel() {
          return _this2.setState({ pickerVisible: false });
        },
        onPicked: this.onPicked.bind(this),
        onSelectRangeChange: this._onSelectionChange,
        selectableRange: converSelectRange(props)
      }));
    }
  }]);
  return TimePicker;
}(_BasePicker3.default);

var _default = TimePicker;
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(converSelectRange, 'converSelectRange', 'src/date-picker/TimePicker.jsx');

  __REACT_HOT_LOADER__.register(TimePicker, 'TimePicker', 'src/date-picker/TimePicker.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/date-picker/TimePicker.jsx');
}();

;