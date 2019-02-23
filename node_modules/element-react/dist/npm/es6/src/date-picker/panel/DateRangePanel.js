import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _createClass from 'babel-runtime/helpers/createClass';
import _inherits from 'babel-runtime/helpers/inherits';
import _extends from 'babel-runtime/helpers/extends';
import React from 'react';
import ReactDOM from 'react-dom';

import { PropTypes } from '../../../libs';
import Locale from '../../locale';
import Input from '../../input';
import TimePanel from './TimePanel';
import { MountBody } from '../MountBody';

import { SELECTION_MODES, toDate, prevMonth as _prevMonth, nextMonth as _nextMonth, formatDate, parseDate } from '../utils';
import { DateTable } from '../basic';
import { PopperBase } from './PopperBase';
import { PLACEMENT_MAP } from '../constants';

var _prevYear = function _prevYear(date) {
  var d = toDate(date);
  d.setFullYear(date.getFullYear() - 1);
  return d;
};

var _nextYear = function _nextYear(date) {
  var d = toDate(date);
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
    state = _extends({}, state, {
      minDate: null,
      maxDate: null,
      date: new Date()
    });
  } else {
    if (value[0] && value[1]) {
      state.minDate = toDate(value[0]);
      state.maxDate = toDate(value[1]);
    }
    if (value[0]) {
      state.date = toDate(value[0]);
    } else {
      state.date = new Date();
    }
  }

  return state;
};

var DateRangePanel = function (_PopperBase) {
  _inherits(DateRangePanel, _PopperBase);

  _createClass(DateRangePanel, null, [{
    key: 'propTypes',
    get: function get() {
      return Object.assign({
        // user picked date value
        /*
        value: null | [Date, null | false]
        */
        value: PropTypes.any,
        // ([value1, value2]|null, isKeepPanel)=>()
        onPick: PropTypes.func.isRequired,
        isShowTime: PropTypes.bool,
        // Array[{text: String, onClick: (picker)=>()}]
        shortcuts: PropTypes.arrayOf(PropTypes.shape({
          text: PropTypes.string.isRequired,
          // ()=>()
          onClick: PropTypes.func.isRequired
        })),
        // (Date)=>bool, if true, disabled
        disabledDate: PropTypes.func,
        firstDayOfWeek: PropTypes.range(0, 6),
        //()=>HtmlElement
        getPopperRefElement: PropTypes.func,
        popperMixinOption: PropTypes.object
      }, PopperBase.propTypes);
    }
  }]);

  function DateRangePanel(props) {
    _classCallCheck(this, DateRangePanel);

    var _this = _possibleConstructorReturn(this, _PopperBase.call(this, props));

    _this.state = _extends({
      minTimePickerVisible: false,
      maxTimePickerVisible: false,
      minPickerWidth: 0, // not used in code right now, due to some reason, for more details see comments in DatePannel that marked with todo.
      maxPickerWidth: 0
    }, mapPropsToState(props));
    return _this;
  }

  DateRangePanel.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    this.setState(mapPropsToState(nextProps));
  };

  DateRangePanel.prototype.handleRangePick = function handleRangePick(_ref, isClose) {
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
  };

  DateRangePanel.prototype.prevYear = function prevYear() {
    var date = this.state.date;

    this.setState({
      date: _prevYear(date)
    });
  };

  DateRangePanel.prototype.nextYear = function nextYear() {
    var date = this.state.date;

    this.setState({
      date: _nextYear(date)
    });
  };

  DateRangePanel.prototype.prevMonth = function prevMonth() {
    this.setState({
      date: _prevMonth(this.state.date)
    });
  };

  DateRangePanel.prototype.nextMonth = function nextMonth() {
    this.setState({
      date: _nextMonth(this.state.date)
    });
  };

  //todo: wired way to do sth like this? try to come up with a better option
  DateRangePanel.prototype.handleChangeRange = function handleChangeRange(_ref2) {
    var endDate = _ref2.endDate;
    var _state = this.state,
        rangeState = _state.rangeState,
        minDate = _state.minDate;

    if (endDate <= minDate) endDate = null;

    rangeState.endDate = endDate;
    this.setState({
      maxDate: endDate
    });
  };

  DateRangePanel.prototype.handleShortcutClick = function handleShortcutClick(shortcut) {
    shortcut.onClick();
  };

  DateRangePanel.prototype.setTime = function setTime(date, value) {
    var oldDate = new Date(date.getTime());
    var hour = value.getHours();
    var minute = value.getMinutes();
    var second = value.getSeconds();
    oldDate.setHours(hour);
    oldDate.setMinutes(minute);
    oldDate.setSeconds(second);
    return new Date(oldDate.getTime());
  };

  DateRangePanel.prototype.handleMinTimePick = function handleMinTimePick(pickedDate, isKeepPanel) {
    var minDate = this.state.minDate || new Date();
    if (pickedDate) {
      minDate = this.setTime(minDate, pickedDate);
    }
    this.setState({ minDate: minDate, minTimePickerVisible: isKeepPanel });
  };

  DateRangePanel.prototype.handleMaxTimePick = function handleMaxTimePick(pickedDate, isKeepPanel) {
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
  };

  DateRangePanel.prototype.handleDateChange = function handleDateChange(value, type) {
    var parsedValue = parseDate(value, 'yyyy-MM-dd');
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
  };

  DateRangePanel.prototype.handleTimeChange = function handleTimeChange(value, type) {
    var parsedValue = parseDate(value, 'HH:mm:ss');
    if (parsedValue) {
      var _setState;

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
      this.setState((_setState = {
        minDate: minDate,
        maxDate: maxDate
      }, _setState[type + 'TimpickerVisisble'] = false, _setState));
    }
  };

  DateRangePanel.prototype.handleClear = function handleClear() {
    var onPick = this.props.onPick;

    var minDate = null,
        maxDate = null,
        date = new Date();

    this.setState({ minDate: minDate, maxDate: maxDate, date: date });
    onPick([], false);
  };

  DateRangePanel.prototype.handleConfirm = function handleConfirm() {
    var _state5 = this.state,
        minDate = _state5.minDate,
        maxDate = _state5.maxDate;

    this.props.onPick([minDate, maxDate], false);
  };

  DateRangePanel.prototype.render = function render() {
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

    var t = Locale.t;
    var leftLabel = date.getFullYear() + ' ' + t('el.datepicker.year') + ' ' + t('el.datepicker.month' + (date.getMonth() + 1));
    var rightLabel = rightDate.getFullYear() + ' ' + t('el.datepicker.year') + ' ' + t('el.datepicker.month' + (rightDate.getMonth() + 1));

    return React.createElement(
      'div',
      {
        ref: 'root',
        className: this.classNames('el-picker-panel el-date-range-picker', {
          'has-sidebar': shortcuts,
          'has-time': isShowTime
        })
      },
      React.createElement(
        'div',
        { className: 'el-picker-panel__body-wrapper' },
        Array.isArray(shortcuts) && React.createElement(
          'div',
          { className: 'el-picker-panel__sidebar' },
          shortcuts.map(function (e, idx) {
            return React.createElement(
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
        React.createElement(
          'div',
          { className: 'el-picker-panel__body' },
          isShowTime && React.createElement(
            'div',
            { className: 'el-date-range-picker__time-header' },
            React.createElement(
              'span',
              { className: 'el-date-range-picker__editors-wrap' },
              React.createElement(
                'span',
                { className: 'el-date-range-picker__time-picker-wrap' },
                React.createElement(Input, {
                  size: 'small',
                  ref: 'minInput',
                  placeholder: Locale.t('el.datepicker.startDate'),
                  className: 'el-date-range-picker__editor',
                  value: this.minVisibleDate,
                  onChange: function onChange(value) {
                    return _this2.handleDateChange(value, 'min');
                  }

                })
              ),
              React.createElement(
                'span',
                { className: 'el-date-range-picker__time-picker-wrap' },
                React.createElement(Input, {
                  size: 'small',
                  ref: 'timeIptStart',
                  placeholder: Locale.t('el.datepicker.startTime'),
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
                minTimePickerVisible && React.createElement(
                  MountBody,
                  null,
                  React.createElement(TimePanel, {
                    pickerWidth: minPickerWidth,
                    ref: 'minTimePicker',
                    currentDate: minDate,
                    onPicked: this.handleMinTimePick.bind(this),
                    getPopperRefElement: function getPopperRefElement() {
                      return ReactDOM.findDOMNode(_this2.refs.timeIptStart);
                    },
                    popperMixinOption: {
                      placement: PLACEMENT_MAP[this.props.align] || PLACEMENT_MAP.left
                    },
                    onCancel: function onCancel() {
                      return _this2.setState({ minTimePickerVisible: false });
                    }
                  })
                )
              )
            ),
            React.createElement('span', { className: 'el-icon-arrow-right' }),
            React.createElement(
              'span',
              { className: 'el-date-range-picker__editors-wrap is-right' },
              React.createElement(
                'span',
                { className: 'el-date-range-picker__time-picker-wrap' },
                React.createElement(Input, {
                  size: 'small',
                  placeholder: Locale.t('el.datepicker.endDate'),
                  className: 'el-date-range-picker__editor',
                  value: this.maxVisibleDate,
                  readOnly: !minDate,
                  onChange: function onChange(value) {
                    return _this2.handleDateInput(value, 'max');
                  }
                })
              ),
              React.createElement(
                'span',
                { className: 'el-date-range-picker__time-picker-wrap' },
                React.createElement(Input, {
                  size: 'small',
                  ref: 'maxInput',
                  placeholder: Locale.t('el.datepicker.endTime'),
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
                maxTimePickerVisible && React.createElement(
                  MountBody,
                  null,
                  React.createElement(TimePanel, {
                    pickerWidth: maxPickerWidth,
                    ref: 'maxTimePicker',
                    currentDate: maxDate,
                    onPicked: this.handleMaxTimePick.bind(this),
                    getPopperRefElement: function getPopperRefElement() {
                      return ReactDOM.findDOMNode(_this2.refs.maxInput);
                    },
                    popperMixinOption: {
                      placement: PLACEMENT_MAP[this.props.align] || PLACEMENT_MAP.left
                    },
                    onCancel: function onCancel() {
                      return _this2.setState({ maxTimePickerVisible: false });
                    }
                  })
                )
              )
            )
          ),
          React.createElement(
            'div',
            { className: 'el-picker-panel__content el-date-range-picker__content is-left' },
            React.createElement(
              'div',
              { className: 'el-date-range-picker__header' },
              React.createElement('button', {
                type: 'button',
                onClick: this.prevYear.bind(this),
                className: 'el-picker-panel__icon-btn el-icon-d-arrow-left' }),
              React.createElement('button', {
                type: 'button',
                onClick: this.prevMonth.bind(this),
                className: 'el-picker-panel__icon-btn el-icon-arrow-left' }),
              React.createElement(
                'div',
                null,
                leftLabel
              )
            ),
            React.createElement(DateTable, {
              selectionMode: SELECTION_MODES.RANGE,
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
          React.createElement(
            'div',
            { className: 'el-picker-panel__content el-date-range-picker__content is-right' },
            React.createElement(
              'div',
              { className: 'el-date-range-picker__header' },
              React.createElement('button', {
                type: 'button',
                onClick: this.nextYear.bind(this),
                className: 'el-picker-panel__icon-btn el-icon-d-arrow-right' }),
              React.createElement('button', {
                type: 'button',
                onClick: this.nextMonth.bind(this),
                className: 'el-picker-panel__icon-btn el-icon-arrow-right' }),
              React.createElement(
                'div',
                null,
                rightLabel
              )
            ),
            React.createElement(DateTable, {
              selectionMode: SELECTION_MODES.RANGE,
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
      isShowTime && React.createElement(
        'div',
        { className: 'el-picker-panel__footer' },
        React.createElement(
          'a',
          {
            className: 'el-picker-panel__link-btn',
            onClick: function onClick() {
              return _this2.handleClear();
            } },
          Locale.t('el.datepicker.clear')
        ),
        React.createElement(
          'button',
          {
            type: 'button',
            className: 'el-picker-panel__btn',
            onClick: function onClick() {
              return _this2.handleConfirm();
            },
            disabled: this.btnDisabled },
          Locale.t('el.datepicker.confirm')
        )
      )
    );
  };

  _createClass(DateRangePanel, [{
    key: 'rightDate',
    get: function get() {
      return _nextMonth(this.state.date);
    }
  }, {
    key: 'minVisibleDate',
    get: function get() {
      var minDate = this.state.minDate;

      return minDate ? formatDate(minDate) : '';
    }
  }, {
    key: 'maxVisibleDate',
    get: function get() {
      var _state7 = this.state,
          maxDate = _state7.maxDate,
          minDate = _state7.minDate;

      var d = maxDate || minDate;
      return d ? formatDate(d) : '';
    }
  }, {
    key: 'minVisibleTime',
    get: function get() {
      var minDate = this.state.minDate;

      return minDate ? formatDate(minDate, 'HH:mm:ss') : '';
    }
  }, {
    key: 'maxVisibleTime',
    get: function get() {
      var _state8 = this.state,
          maxDate = _state8.maxDate,
          minDate = _state8.minDate;

      var d = maxDate || minDate;
      return d ? formatDate(d, 'HH:mm:ss') : '';
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
}(PopperBase);

export default DateRangePanel;


DateRangePanel.defaultProps = {};