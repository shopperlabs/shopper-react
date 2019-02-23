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

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _libs = require('../../../libs');

var _locale = require('../../locale');

var _locale2 = _interopRequireDefault(_locale);

var _input = require('../../input');

var _input2 = _interopRequireDefault(_input);

var _TimePanel = require('./TimePanel');

var _TimePanel2 = _interopRequireDefault(_TimePanel);

var _MountBody = require('../MountBody');

var _utils = require('../utils');

var _basic = require('../basic');

var _PopperBase2 = require('./PopperBase');

var _constants = require('../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _prevYear = function _prevYear(date) {
  var d = (0, _utils.toDate)(date);
  d.setFullYear(date.getFullYear() - 1);
  return d;
};

var _nextYear = function _nextYear(date) {
  var d = (0, _utils.toDate)(date);
  d.setFullYear(date.getFullYear() + 1);
  return d;
};

var mapPropsToState = function mapPropsToState(props) {
  var value = props.value;

  var state = {
    rangeState: {
      endDate: null,
      selecting: false
    }
  };
  if (!value) {
    state = (0, _extends3.default)({}, state, {
      minDate: null,
      maxDate: null,
      date: new Date()
    });
  } else {
    if (value[0] && value[1]) {
      state.minDate = (0, _utils.toDate)(value[0]);
      state.maxDate = (0, _utils.toDate)(value[1]);
    }
    if (value[0]) {
      state.date = (0, _utils.toDate)(value[0]);
    } else {
      state.date = new Date();
    }
  }

  return state;
};

var DateRangePanel = function (_PopperBase) {
  (0, _inherits3.default)(DateRangePanel, _PopperBase);
  (0, _createClass3.default)(DateRangePanel, null, [{
    key: 'propTypes',
    get: function get() {
      return Object.assign({
        // user picked date value
        /*
        value: null | [Date, null | false]
        */
        value: _libs.PropTypes.any,
        // ([value1, value2]|null, isKeepPanel)=>()
        onPick: _libs.PropTypes.func.isRequired,
        isShowTime: _libs.PropTypes.bool,
        // Array[{text: String, onClick: (picker)=>()}]
        shortcuts: _libs.PropTypes.arrayOf(_libs.PropTypes.shape({
          text: _libs.PropTypes.string.isRequired,
          // ()=>()
          onClick: _libs.PropTypes.func.isRequired
        })),
        // (Date)=>bool, if true, disabled
        disabledDate: _libs.PropTypes.func,
        firstDayOfWeek: _libs.PropTypes.range(0, 6),
        //()=>HtmlElement
        getPopperRefElement: _libs.PropTypes.func,
        popperMixinOption: _libs.PropTypes.object
      }, _PopperBase2.PopperBase.propTypes);
    }
  }]);

  function DateRangePanel(props) {
    (0, _classCallCheck3.default)(this, DateRangePanel);

    var _this = (0, _possibleConstructorReturn3.default)(this, (DateRangePanel.__proto__ || Object.getPrototypeOf(DateRangePanel)).call(this, props));

    _this.state = (0, _extends3.default)({
      minTimePickerVisible: false,
      maxTimePickerVisible: false,
      minPickerWidth: 0, // not used in code right now, due to some reason, for more details see comments in DatePannel that marked with todo.
      maxPickerWidth: 0
    }, mapPropsToState(props));
    return _this;
  }

  (0, _createClass3.default)(DateRangePanel, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this.setState(mapPropsToState(nextProps));
    }
  }, {
    key: 'handleRangePick',
    value: function handleRangePick(_ref, isClose) {
      var minDate = _ref.minDate,
          maxDate = _ref.maxDate;
      var _props = this.props,
          isShowTime = _props.isShowTime,
          onPick = _props.onPick;

      this.setState({ minDate: minDate, maxDate: maxDate });
      if (!isClose) return;
      if (!isShowTime) {
        onPick([minDate, maxDate], false);
      }
    }
  }, {
    key: 'prevYear',
    value: function prevYear() {
      var date = this.state.date;

      this.setState({
        date: _prevYear(date)
      });
    }
  }, {
    key: 'nextYear',
    value: function nextYear() {
      var date = this.state.date;

      this.setState({
        date: _nextYear(date)
      });
    }
  }, {
    key: 'prevMonth',
    value: function prevMonth() {
      this.setState({
        date: (0, _utils.prevMonth)(this.state.date)
      });
    }
  }, {
    key: 'nextMonth',
    value: function nextMonth() {
      this.setState({
        date: (0, _utils.nextMonth)(this.state.date)
      });
    }
  }, {
    key: 'handleChangeRange',


    //todo: wired way to do sth like this? try to come up with a better option
    value: function handleChangeRange(_ref2) {
      var endDate = _ref2.endDate;
      var _state = this.state,
          rangeState = _state.rangeState,
          minDate = _state.minDate;

      if (endDate <= minDate) endDate = null;

      rangeState.endDate = endDate;
      this.setState({
        maxDate: endDate
      });
    }
  }, {
    key: 'handleShortcutClick',
    value: function handleShortcutClick(shortcut) {
      shortcut.onClick();
    }
  }, {
    key: 'setTime',
    value: function setTime(date, value) {
      var oldDate = new Date(date.getTime());
      var hour = value.getHours();
      var minute = value.getMinutes();
      var second = value.getSeconds();
      oldDate.setHours(hour);
      oldDate.setMinutes(minute);
      oldDate.setSeconds(second);
      return new Date(oldDate.getTime());
    }
  }, {
    key: 'handleMinTimePick',
    value: function handleMinTimePick(pickedDate, isKeepPanel) {
      var minDate = this.state.minDate || new Date();
      if (pickedDate) {
        minDate = this.setTime(minDate, pickedDate);
      }
      this.setState({ minDate: minDate, minTimePickerVisible: isKeepPanel });
    }
  }, {
    key: 'handleMaxTimePick',
    value: function handleMaxTimePick(pickedDate, isKeepPanel) {
      var _state2 = this.state,
          minDate = _state2.minDate,
          maxDate = _state2.maxDate;

      if (!maxDate) {
        var now = new Date();
        if (now >= minDate) {
          maxDate = new Date();
        }
      }

      if (maxDate && pickedDate) {
        maxDate = this.setTime(maxDate, pickedDate);
      }
      this.setState({
        maxDate: maxDate,
        maxTimePickerVisible: isKeepPanel
      });
    }
  }, {
    key: 'handleDateChange',
    value: function handleDateChange(value, type) {
      var parsedValue = (0, _utils.parseDate)(value, 'yyyy-MM-dd');
      var _state3 = this.state,
          minDate = _state3.minDate,
          maxDate = _state3.maxDate;

      if (parsedValue) {
        var target = new Date(type === 'min' ? minDate : maxDate);
        if (target) {
          target.setFullYear(parsedValue.getFullYear());
          target.setMonth(parsedValue.getMonth(), parsedValue.getDate());
        }
        if (type === 'min') {
          if (target < maxDate) {
            this.setState({ minDate: new Date(target.getTime()) });
          }
        } else {
          if (target > minDate) {
            maxDate = new Date(target.getTime());
            if (minDate && minDate > maxDate) {
              minDate = null;
            }
            this.setState({ minDate: minDate, maxDate: maxDate });
          }
        }
      }
    }
  }, {
    key: 'handleTimeChange',
    value: function handleTimeChange(value, type) {
      var parsedValue = (0, _utils.parseDate)(value, 'HH:mm:ss');
      if (parsedValue) {
        var target = new Date(type === 'min' ? this.minDate : this.maxDate);
        if (target) {
          target.setHours(parsedValue.getHours());
          target.setMinutes(parsedValue.getMinutes());
          target.setSeconds(parsedValue.getSeconds());
        }
        var _state4 = this.state,
            minDate = _state4.minDate,
            maxDate = _state4.maxDate;

        if (type === 'min') {
          if (target < maxDate) {
            minDate = new Date(target.getTime());
          }
        } else {
          if (target > minDate) {
            maxDate = new Date(target.getTime());
          }
        }
        this.setState((0, _defineProperty3.default)({
          minDate: minDate,
          maxDate: maxDate
        }, type + 'TimpickerVisisble', false));
      }
    }
  }, {
    key: 'handleClear',
    value: function handleClear() {
      var onPick = this.props.onPick;

      var minDate = null,
          maxDate = null,
          date = new Date();

      this.setState({ minDate: minDate, maxDate: maxDate, date: date });
      onPick([], false);
    }
  }, {
    key: 'handleConfirm',
    value: function handleConfirm() {
      var _state5 = this.state,
          minDate = _state5.minDate,
          maxDate = _state5.maxDate;

      this.props.onPick([minDate, maxDate], false);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props2 = this.props,
          shortcuts = _props2.shortcuts,
          disabledDate = _props2.disabledDate,
          firstDayOfWeek = _props2.firstDayOfWeek,
          isShowTime = _props2.isShowTime;
      var _state6 = this.state,
          date = _state6.date,
          rangeState = _state6.rangeState,
          minDate = _state6.minDate,
          maxDate = _state6.maxDate,
          minTimePickerVisible = _state6.minTimePickerVisible,
          maxTimePickerVisible = _state6.maxTimePickerVisible,
          minPickerWidth = _state6.minPickerWidth,
          maxPickerWidth = _state6.maxPickerWidth;

      var rightDate = this.rightDate;

      var t = _locale2.default.t;
      var leftLabel = date.getFullYear() + ' ' + t('el.datepicker.year') + ' ' + t('el.datepicker.month' + (date.getMonth() + 1));
      var rightLabel = rightDate.getFullYear() + ' ' + t('el.datepicker.year') + ' ' + t('el.datepicker.month' + (rightDate.getMonth() + 1));

      return _react2.default.createElement(
        'div',
        {
          ref: 'root',
          className: this.classNames('el-picker-panel el-date-range-picker', {
            'has-sidebar': shortcuts,
            'has-time': isShowTime
          })
        },
        _react2.default.createElement(
          'div',
          { className: 'el-picker-panel__body-wrapper' },
          Array.isArray(shortcuts) && _react2.default.createElement(
            'div',
            { className: 'el-picker-panel__sidebar' },
            shortcuts.map(function (e, idx) {
              return _react2.default.createElement(
                'button',
                {
                  key: idx,
                  type: 'button',
                  className: 'el-picker-panel__shortcut',
                  onClick: function onClick() {
                    return _this2.handleShortcutClick(e);
                  } },
                e.text
              );
            })
          ),
          _react2.default.createElement(
            'div',
            { className: 'el-picker-panel__body' },
            isShowTime && _react2.default.createElement(
              'div',
              { className: 'el-date-range-picker__time-header' },
              _react2.default.createElement(
                'span',
                { className: 'el-date-range-picker__editors-wrap' },
                _react2.default.createElement(
                  'span',
                  { className: 'el-date-range-picker__time-picker-wrap' },
                  _react2.default.createElement(_input2.default, {
                    size: 'small',
                    ref: 'minInput',
                    placeholder: _locale2.default.t('el.datepicker.startDate'),
                    className: 'el-date-range-picker__editor',
                    value: this.minVisibleDate,
                    onChange: function onChange(value) {
                      return _this2.handleDateChange(value, 'min');
                    }

                  })
                ),
                _react2.default.createElement(
                  'span',
                  { className: 'el-date-range-picker__time-picker-wrap' },
                  _react2.default.createElement(_input2.default, {
                    size: 'small',
                    ref: 'timeIptStart',
                    placeholder: _locale2.default.t('el.datepicker.startTime'),
                    className: 'el-date-range-picker__editor',
                    value: this.minVisibleTime,
                    onFocus: function onFocus() {
                      _this2.setState({
                        minTimePickerVisible: !minTimePickerVisible
                      });
                    },
                    onChange: function onChange(value) {
                      return _this2.handleTimeChange(value, 'min');
                    }
                  }),
                  minTimePickerVisible && _react2.default.createElement(
                    _MountBody.MountBody,
                    null,
                    _react2.default.createElement(_TimePanel2.default, {
                      pickerWidth: minPickerWidth,
                      ref: 'minTimePicker',
                      currentDate: minDate,
                      onPicked: this.handleMinTimePick.bind(this),
                      getPopperRefElement: function getPopperRefElement() {
                        return _reactDom2.default.findDOMNode(_this2.refs.timeIptStart);
                      },
                      popperMixinOption: {
                        placement: _constants.PLACEMENT_MAP[this.props.align] || _constants.PLACEMENT_MAP.left
                      },
                      onCancel: function onCancel() {
                        return _this2.setState({ minTimePickerVisible: false });
                      }
                    })
                  )
                )
              ),
              _react2.default.createElement('span', { className: 'el-icon-arrow-right' }),
              _react2.default.createElement(
                'span',
                { className: 'el-date-range-picker__editors-wrap is-right' },
                _react2.default.createElement(
                  'span',
                  { className: 'el-date-range-picker__time-picker-wrap' },
                  _react2.default.createElement(_input2.default, {
                    size: 'small',
                    placeholder: _locale2.default.t('el.datepicker.endDate'),
                    className: 'el-date-range-picker__editor',
                    value: this.maxVisibleDate,
                    readOnly: !minDate,
                    onChange: function onChange(value) {
                      return _this2.handleDateInput(value, 'max');
                    }
                  })
                ),
                _react2.default.createElement(
                  'span',
                  { className: 'el-date-range-picker__time-picker-wrap' },
                  _react2.default.createElement(_input2.default, {
                    size: 'small',
                    ref: 'maxInput',
                    placeholder: _locale2.default.t('el.datepicker.endTime'),
                    className: 'el-date-range-picker__editor',
                    value: this.maxVisibleTime,
                    onFocus: function onFocus() {
                      if (minDate) {
                        _this2.setState({
                          maxTimePickerVisible: !maxTimePickerVisible
                        });
                      }
                    },
                    readOnly: !minDate,
                    onChange: function onChange(value) {
                      return _this2.handleTimeChange(value, 'max');
                    }
                  }),
                  maxTimePickerVisible && _react2.default.createElement(
                    _MountBody.MountBody,
                    null,
                    _react2.default.createElement(_TimePanel2.default, {
                      pickerWidth: maxPickerWidth,
                      ref: 'maxTimePicker',
                      currentDate: maxDate,
                      onPicked: this.handleMaxTimePick.bind(this),
                      getPopperRefElement: function getPopperRefElement() {
                        return _reactDom2.default.findDOMNode(_this2.refs.maxInput);
                      },
                      popperMixinOption: {
                        placement: _constants.PLACEMENT_MAP[this.props.align] || _constants.PLACEMENT_MAP.left
                      },
                      onCancel: function onCancel() {
                        return _this2.setState({ maxTimePickerVisible: false });
                      }
                    })
                  )
                )
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'el-picker-panel__content el-date-range-picker__content is-left' },
              _react2.default.createElement(
                'div',
                { className: 'el-date-range-picker__header' },
                _react2.default.createElement('button', {
                  type: 'button',
                  onClick: this.prevYear.bind(this),
                  className: 'el-picker-panel__icon-btn el-icon-d-arrow-left' }),
                _react2.default.createElement('button', {
                  type: 'button',
                  onClick: this.prevMonth.bind(this),
                  className: 'el-picker-panel__icon-btn el-icon-arrow-left' }),
                _react2.default.createElement(
                  'div',
                  null,
                  leftLabel
                )
              ),
              _react2.default.createElement(_basic.DateTable, {
                selectionMode: _utils.SELECTION_MODES.RANGE,
                date: date,
                value: minDate,
                minDate: minDate,
                maxDate: maxDate,
                rangeState: rangeState,
                disabledDate: disabledDate,
                onChangeRange: this.handleChangeRange.bind(this),
                onPick: this.handleRangePick.bind(this),
                firstDayOfWeek: firstDayOfWeek
              })
            ),
            _react2.default.createElement(
              'div',
              { className: 'el-picker-panel__content el-date-range-picker__content is-right' },
              _react2.default.createElement(
                'div',
                { className: 'el-date-range-picker__header' },
                _react2.default.createElement('button', {
                  type: 'button',
                  onClick: this.nextYear.bind(this),
                  className: 'el-picker-panel__icon-btn el-icon-d-arrow-right' }),
                _react2.default.createElement('button', {
                  type: 'button',
                  onClick: this.nextMonth.bind(this),
                  className: 'el-picker-panel__icon-btn el-icon-arrow-right' }),
                _react2.default.createElement(
                  'div',
                  null,
                  rightLabel
                )
              ),
              _react2.default.createElement(_basic.DateTable, {
                selectionMode: _utils.SELECTION_MODES.RANGE,
                date: rightDate,
                value: maxDate,
                minDate: minDate,
                maxDate: maxDate,
                rangeState: rangeState,
                disabledDate: disabledDate,
                onChangeRange: this.handleChangeRange.bind(this),
                onPick: this.handleRangePick.bind(this),
                firstDayOfWeek: firstDayOfWeek
              })
            )
          )
        ),
        isShowTime && _react2.default.createElement(
          'div',
          { className: 'el-picker-panel__footer' },
          _react2.default.createElement(
            'a',
            {
              className: 'el-picker-panel__link-btn',
              onClick: function onClick() {
                return _this2.handleClear();
              } },
            _locale2.default.t('el.datepicker.clear')
          ),
          _react2.default.createElement(
            'button',
            {
              type: 'button',
              className: 'el-picker-panel__btn',
              onClick: function onClick() {
                return _this2.handleConfirm();
              },
              disabled: this.btnDisabled },
            _locale2.default.t('el.datepicker.confirm')
          )
        )
      );
    }
  }, {
    key: 'rightDate',
    get: function get() {
      return (0, _utils.nextMonth)(this.state.date);
    }
  }, {
    key: 'minVisibleDate',
    get: function get() {
      var minDate = this.state.minDate;

      return minDate ? (0, _utils.formatDate)(minDate) : '';
    }
  }, {
    key: 'maxVisibleDate',
    get: function get() {
      var _state7 = this.state,
          maxDate = _state7.maxDate,
          minDate = _state7.minDate;

      var d = maxDate || minDate;
      return d ? (0, _utils.formatDate)(d) : '';
    }
  }, {
    key: 'minVisibleTime',
    get: function get() {
      var minDate = this.state.minDate;

      return minDate ? (0, _utils.formatDate)(minDate, 'HH:mm:ss') : '';
    }
  }, {
    key: 'maxVisibleTime',
    get: function get() {
      var _state8 = this.state,
          maxDate = _state8.maxDate,
          minDate = _state8.minDate;

      var d = maxDate || minDate;
      return d ? (0, _utils.formatDate)(d, 'HH:mm:ss') : '';
    }
  }, {
    key: 'btnDisabled',
    get: function get() {
      var _state9 = this.state,
          minDate = _state9.minDate,
          maxDate = _state9.maxDate,
          selecting = _state9.rangeState.selecting;

      return !(minDate && maxDate && !selecting);
    }
  }]);
  return DateRangePanel;
}(_PopperBase2.PopperBase);

var _default = DateRangePanel;
exports.default = _default;


DateRangePanel.defaultProps = {};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(_prevYear, 'prevYear', 'src/date-picker/panel/DateRangePanel.jsx');

  __REACT_HOT_LOADER__.register(_nextYear, 'nextYear', 'src/date-picker/panel/DateRangePanel.jsx');

  __REACT_HOT_LOADER__.register(mapPropsToState, 'mapPropsToState', 'src/date-picker/panel/DateRangePanel.jsx');

  __REACT_HOT_LOADER__.register(DateRangePanel, 'DateRangePanel', 'src/date-picker/panel/DateRangePanel.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/date-picker/panel/DateRangePanel.jsx');
}();

;