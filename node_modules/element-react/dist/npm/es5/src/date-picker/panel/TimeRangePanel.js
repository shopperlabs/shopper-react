'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

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

var _libs = require('../../../libs');

var _utils = require('../utils');

var _TimeSpinner = require('../basic/TimeSpinner');

var _TimeSpinner2 = _interopRequireDefault(_TimeSpinner);

var _locale = require('../../locale');

var _locale2 = _interopRequireDefault(_locale);

var _PopperBase2 = require('./PopperBase');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MIN_TIME = (0, _utils.parseDate)('00:00:00', 'HH:mm:ss');
var MAX_TIME = (0, _utils.parseDate)('23:59:59', 'HH:mm:ss');

var isDisabled = function isDisabled(minTime, maxTime) {
  var minValue = minTime.getHours() * 3600 + minTime.getMinutes() * 60 + minTime.getSeconds();
  var maxValue = maxTime.getHours() * 3600 + maxTime.getMinutes() * 60 + maxTime.getSeconds();

  return minValue > maxValue;
};

var calcTime = function calcTime(time) {
  time = Array.isArray(time) ? time : [time];
  var minTime = time[0] || new Date();
  var date = new Date();
  date.setHours(date.getHours() + 1);
  var maxTime = time[1] || date;

  if (minTime > maxTime) return calcTime();
  return { minTime: minTime, maxTime: maxTime };
};

var mapPropsToState = function mapPropsToState(props) {
  var currentDates = props.currentDates,
      format = props.format;

  var _calcTime = calcTime(currentDates),
      minTime = _calcTime.minTime,
      maxTime = _calcTime.maxTime;

  var state = {
    format: format || 'HH:mm:ss',
    minTime: minTime,
    maxTime: maxTime,
    minSelectableRange: [[MIN_TIME, maxTime]],
    maxSelectableRange: [[minTime, MAX_TIME]],
    btnDisabled: isDisabled(minTime, maxTime)
  };
  state.isShowSeconds = (state.format || '').indexOf('ss') !== -1;

  return state;
};

var TimeRangePanel = function (_PopperBase) {
  (0, _inherits3.default)(TimeRangePanel, _PopperBase);
  (0, _createClass3.default)(TimeRangePanel, null, [{
    key: 'propTypes',
    get: function get() {
      return Object.assign({
        pickerWidth: _libs.PropTypes.number,
        currentDates: _libs.PropTypes.arrayOf(_libs.PropTypes.instanceOf(Date)),
        /*
        onPicked: (value, isKeepPannelOpen)=>()
         @param value: Date| Date[] |null
        @param isKeepPannelOpen:boolean, should parent close the pannel
        */
        onPicked: _libs.PropTypes.func.isRequired,
        // cancel btn is clicked
        //()=>()
        onCancel: _libs.PropTypes.func.isRequired,
        // (start, end)=>(), index range indicate which field [hours, minutes, seconds] changes
        onSelectRangeChange: _TimeSpinner2.default.propTypes.onSelectRangeChange
      }, _PopperBase2.PopperBase.propTypes);
    }
  }, {
    key: 'defaultProps',
    get: function get() {
      return {
        popperMixinOption: {}
      };
    }
  }]);

  function TimeRangePanel(props) {
    (0, _classCallCheck3.default)(this, TimeRangePanel);

    var _this = (0, _possibleConstructorReturn3.default)(this, (TimeRangePanel.__proto__ || Object.getPrototypeOf(TimeRangePanel)).call(this, props));

    _this.state = Object.assign({
      visible: false,
      width: 0
    }, mapPropsToState(props));
    return _this;
  }

  (0, _createClass3.default)(TimeRangePanel, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.setState(mapPropsToState(nextProps));
    }

    // type = hours | minutes | seconds
    // date: {type: number}

  }, {
    key: 'handleChange',
    value: function handleChange(date, field) {
      var ndate = this.state[field];

      if (date.hours !== undefined) {
        ndate.setHours(date.hours);
      }

      if (date.minutes !== undefined) {
        ndate.setMinutes(date.minutes);
      }

      if (date.seconds !== undefined) {
        ndate.setSeconds(date.seconds);
      }

      var state = (0, _defineProperty3.default)({}, field, ndate);

      var _state2 = this.state,
          minTime = _state2.minTime,
          maxTime = _state2.maxTime;

      state.minSelectableRange = [[MIN_TIME, maxTime]];
      state.maxSelectableRange = [[minTime, MAX_TIME]];

      state.minTime = (0, _utils.limitRange)(minTime, state.minSelectableRange);
      state.maxTime = (0, _utils.limitRange)(maxTime, state.maxSelectableRange);

      this.setState(state);
      this.handleConfirm(true);
    }
  }, {
    key: 'handleConfirm',
    value: function handleConfirm() {
      var isKeepPannelOpen = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var _state3 = this.state,
          minTime = _state3.minTime,
          maxTime = _state3.maxTime;
      var onPicked = this.props.onPicked;


      onPicked([minTime, maxTime], isKeepPannelOpen);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _state4 = this.state,
          isShowSeconds = _state4.isShowSeconds,
          minTime = _state4.minTime,
          maxTime = _state4.maxTime,
          btnDisabled = _state4.btnDisabled,
          minSelectableRange = _state4.minSelectableRange,
          maxSelectableRange = _state4.maxSelectableRange;
      var _onSelectRangeChange = this.props.onSelectRangeChange;

      var $t = _locale2.default.t;

      var maxHours = maxTime.getHours();
      var maxMinutes = maxTime.getMinutes();
      var maxSeconds = maxTime.getSeconds();
      var minHours = minTime.getHours();
      var minMinutes = minTime.getMinutes();
      var minSeconds = minTime.getSeconds();
      return _react2.default.createElement(
        'div',
        {
          ref: 'root',
          className: 'el-time-range-picker el-picker-panel',
          style: { minWidth: '330px' }
        },
        _react2.default.createElement(
          'div',
          { className: 'el-time-range-picker__content' },
          _react2.default.createElement(
            'div',
            { className: 'el-time-range-picker__cell' },
            _react2.default.createElement(
              'div',
              { className: 'el-time-range-picker__header' },
              $t('el.datepicker.startTime')
            ),
            _react2.default.createElement(
              'div',
              {
                className: this.classNames('el-time-range-picker__body el-time-panel__content', { 'has-seconds': isShowSeconds })
              },
              _react2.default.createElement(_TimeSpinner2.default, {
                ref: 'minSpinner',
                onChange: function onChange(date) {
                  return _this2.handleChange(date, 'minTime');
                },
                isShowSeconds: isShowSeconds,
                hours: minHours,
                minutes: minMinutes,
                seconds: minSeconds,
                selectableRange: minSelectableRange,
                onSelectRangeChange: _onSelectRangeChange
              })
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'el-time-range-picker__cell' },
            _react2.default.createElement(
              'div',
              { className: 'el-time-range-picker__header' },
              $t('el.datepicker.endTime')
            ),
            _react2.default.createElement(
              'div',
              {
                className: this.classNames('el-time-range-picker__body el-time-panel__content', { 'has-seconds': isShowSeconds })
              },
              _react2.default.createElement(_TimeSpinner2.default, {
                ref: 'maxSpinner',
                onChange: function onChange(date) {
                  return _this2.handleChange(date, 'maxTime');
                },
                isShowSeconds: isShowSeconds,
                hours: maxHours,
                minutes: maxMinutes,
                seconds: maxSeconds,
                selectableRange: maxSelectableRange,
                onSelectRangeChange: function onSelectRangeChange(start, end) {
                  return _onSelectRangeChange(start + 11, end + 11);
                }
              })
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'el-time-panel__footer' },
          _react2.default.createElement(
            'button',
            {
              type: 'button',
              className: 'el-time-panel__btn cancel',
              onClick: function onClick() {
                return _this2.props.onCancel();
              }
            },
            $t('el.datepicker.cancel')
          ),
          _react2.default.createElement(
            'button',
            {
              type: 'button',
              className: 'el-time-panel__btn confirm',
              onClick: function onClick() {
                return _this2.handleConfirm();
              },
              disabled: btnDisabled
            },
            $t('el.datepicker.confirm')
          )
        )
      );
    }
  }]);
  return TimeRangePanel;
}(_PopperBase2.PopperBase);

var _default = TimeRangePanel;
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(MIN_TIME, 'MIN_TIME', 'src/date-picker/panel/TimeRangePanel.jsx');

  __REACT_HOT_LOADER__.register(MAX_TIME, 'MAX_TIME', 'src/date-picker/panel/TimeRangePanel.jsx');

  __REACT_HOT_LOADER__.register(isDisabled, 'isDisabled', 'src/date-picker/panel/TimeRangePanel.jsx');

  __REACT_HOT_LOADER__.register(calcTime, 'calcTime', 'src/date-picker/panel/TimeRangePanel.jsx');

  __REACT_HOT_LOADER__.register(mapPropsToState, 'mapPropsToState', 'src/date-picker/panel/TimeRangePanel.jsx');

  __REACT_HOT_LOADER__.register(TimeRangePanel, 'TimeRangePanel', 'src/date-picker/panel/TimeRangePanel.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/date-picker/panel/TimeRangePanel.jsx');
}();

;