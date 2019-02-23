'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var mapPropsToState = function mapPropsToState(props) {
  var state = {
    format: props.format || 'HH:mm:ss',
    currentDate: props.currentDate || new Date()
  };
  state.isShowSeconds = (state.format || '').indexOf('ss') !== -1;
  return state;
};

var TimePanel = function (_PopperBase) {
  (0, _inherits3.default)(TimePanel, _PopperBase);
  (0, _createClass3.default)(TimePanel, null, [{
    key: 'propTypes',
    get: function get() {
      return Object.assign({}, {
        selectableRange: _TimeSpinner2.default.propTypes.selectableRange,
        onSelectRangeChange: _TimeSpinner2.default.propTypes.onSelectRangeChange
      }, {
        pickerWidth: _libs.PropTypes.number,
        currentDate: _libs.PropTypes.instanceOf(Date),
        /*
        onPicked: (value, isKeepPannelOpen)=>()
         @param value: Date|null
        @param isKeepPannelOpen:boolean, should parent close the pannel
        */
        onPicked: _libs.PropTypes.func.isRequired,
        // cancel btn is clicked
        //()=>()
        onCancel: _libs.PropTypes.func.isRequired
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

  function TimePanel(props) {
    (0, _classCallCheck3.default)(this, TimePanel);

    var _this = (0, _possibleConstructorReturn3.default)(this, (TimePanel.__proto__ || Object.getPrototypeOf(TimePanel)).call(this, props));

    _this.state = mapPropsToState(props);
    return _this;
  }

  (0, _createClass3.default)(TimePanel, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.setState(mapPropsToState(nextProps));
    }

    // type: string,  one of [hours, minutes, seconds]
    // date: {type: number}

  }, {
    key: 'handleChange',
    value: function handleChange(date) {
      var currentDate = this.state.currentDate;


      if (date.hours !== undefined) {
        currentDate.setHours(date.hours);
      }

      if (date.minutes !== undefined) {
        currentDate.setMinutes(date.minutes);
      }

      if (date.seconds !== undefined) {
        currentDate.setSeconds(date.seconds);
      }
      this.setState({});
      this.handleConfirm(true);
    }
  }, {
    key: 'handleConfirm',
    value: function handleConfirm() {
      var isKeepPannelOpen = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var currentDate = this.state.currentDate;
      var _props = this.props,
          onPicked = _props.onPicked,
          selectableRange = _props.selectableRange;


      var date = new Date((0, _utils.limitRange)(currentDate, selectableRange, 'HH:mm:ss'));
      onPicked(date, isKeepPannelOpen);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _state = this.state,
          isShowSeconds = _state.isShowSeconds,
          currentDate = _state.currentDate;
      var _props2 = this.props,
          onSelectRangeChange = _props2.onSelectRangeChange,
          selectableRange = _props2.selectableRange;


      var hours = currentDate.getHours();
      var minutes = currentDate.getMinutes();
      var seconds = currentDate.getSeconds();

      var $t = _locale2.default.t;

      return _react2.default.createElement(
        'div',
        {
          ref: 'root',
          className: 'el-time-panel' },
        _react2.default.createElement(
          'div',
          { className: this.classNames('el-time-panel__content', { 'has-seconds': isShowSeconds }) },
          _react2.default.createElement(_TimeSpinner2.default, {
            ref: 'spinner',
            onChange: this.handleChange.bind(this),
            isShowSeconds: isShowSeconds,
            hours: hours,
            minutes: minutes,
            seconds: seconds,
            selectableRange: selectableRange,
            onSelectRangeChange: onSelectRangeChange
          })
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
              } },
            $t('el.datepicker.cancel')
          ),
          _react2.default.createElement(
            'button',
            {
              type: 'button',
              className: 'el-time-panel__btn confirm',
              onClick: function onClick() {
                return _this2.handleConfirm();
              } },
            $t('el.datepicker.confirm')
          )
        )
      );
    }
  }]);
  return TimePanel;
}(_PopperBase2.PopperBase);

var _default = TimePanel;
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(mapPropsToState, 'mapPropsToState', 'src/date-picker/panel/TimePanel.jsx');

  __REACT_HOT_LOADER__.register(TimePanel, 'TimePanel', 'src/date-picker/panel/TimePanel.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/date-picker/panel/TimePanel.jsx');
}();

;