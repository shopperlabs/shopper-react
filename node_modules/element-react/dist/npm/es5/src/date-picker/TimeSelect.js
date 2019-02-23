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

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _libs = require('../../libs');

var _BasePicker2 = require('./BasePicker');

var _BasePicker3 = _interopRequireDefault(_BasePicker2);

var _TimeSelectPanel = require('./panel/TimeSelectPanel');

var _TimeSelectPanel2 = _interopRequireDefault(_TimeSelectPanel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TimeSelect = function (_BasePicker) {
  (0, _inherits3.default)(TimeSelect, _BasePicker);
  (0, _createClass3.default)(TimeSelect, null, [{
    key: 'propTypes',
    get: function get() {
      var result = Object.assign({}, {
        start: _libs.PropTypes.string,
        end: _libs.PropTypes.string,
        step: _libs.PropTypes.string,
        minTime: _libs.PropTypes.instanceOf(Date)
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

  function TimeSelect(props) {
    (0, _classCallCheck3.default)(this, TimeSelect);

    // props, type, state
    return (0, _possibleConstructorReturn3.default)(this, (TimeSelect.__proto__ || Object.getPrototypeOf(TimeSelect)).call(this, props, 'timeselect', {}));
  }

  (0, _createClass3.default)(TimeSelect, [{
    key: 'isDateValid',
    value: function isDateValid(value) {
      return (0, _get3.default)(TimeSelect.prototype.__proto__ || Object.getPrototypeOf(TimeSelect.prototype), 'isDateValid', this).call(this, value) && _TimeSelectPanel2.default.isValid(this.dateToStr(value), this.panelProps());
    }
  }, {
    key: 'panelProps',
    value: function panelProps(props) {
      var ps = props || this.props;
      var minTime = this.dateToStr(this.props.minTime);
      return (0, _extends3.default)({}, ps, { minTime: minTime });
    }
  }, {
    key: 'pickerPanel',
    value: function pickerPanel(state, props) {
      var _this2 = this;

      var value = this.dateToStr(state.value);
      return _react2.default.createElement(_TimeSelectPanel2.default, (0, _extends3.default)({}, this.panelProps(props), {
        value: value,
        onPicked: this.onPicked.bind(this),
        dateParser: function dateParser(str) {
          var r = _this2.parseDate(str);
          return r;
        }
      }));
    }
  }]);
  return TimeSelect;
}(_BasePicker3.default);

var _default = TimeSelect;
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(TimeSelect, 'TimeSelect', 'src/date-picker/TimeSelect.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/date-picker/TimeSelect.jsx');
}();

;