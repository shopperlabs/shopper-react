import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _createClass from 'babel-runtime/helpers/createClass';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import ReactDOM from 'react-dom';

import { PropTypes } from '../../../libs';
import Locale from '../../locale';
import Input from '../../input';
import TimePanel from './TimePanel';
import { MountBody } from '../MountBody';

import { SELECTION_MODES, deconstructDate, formatDate, parseDate, toDate } from '../utils';
import { DateTable, MonthTable, YearTable } from '../basic';
import { PopperBase } from './PopperBase';
import { PLACEMENT_MAP } from '../constants';

var PICKER_VIEWS = {
  YEAR: 'year',
  MONTH: 'month',
  DATE: 'date'
};

var DatePanel = function (_PopperBase) {
  _inherits(DatePanel, _PopperBase);

  _createClass(DatePanel, null, [{
    key: 'propTypes',
    get: function get() {

      return Object.assign({
        // user picked date value
        // value: Date | null
        value: PropTypes.instanceOf(Date),
        // (Date)=>void
        onPick: PropTypes.func.isRequired,
        isShowTime: PropTypes.bool,
        showWeekNumber: PropTypes.bool,
        format: PropTypes.string,
        // Array[{text: String, onClick: (picker)=>()}]
        shortcuts: PropTypes.arrayOf(PropTypes.shape({
          text: PropTypes.string.isRequired,
          // ()=>()
          onClick: PropTypes.func.isRequired
        })),
        selectionMode: PropTypes.oneOf(Object.keys(SELECTION_MODES).map(function (e) {
          return SELECTION_MODES[e];
        })),
        // (Date)=>bool, if true, disabled
        disabledDate: PropTypes.func,
        firstDayOfWeek: PropTypes.range(0, 6)

      }, PopperBase.propTypes);
    }
  }]);

  function DatePanel(props) {
    _classCallCheck(this, DatePanel);

    var _this = _possibleConstructorReturn(this, _PopperBase.call(this, props));

    var currentView = PICKER_VIEWS.DATE;
    switch (props.selectionMode) {
      case SELECTION_MODES.MONTH:
        currentView = PICKER_VIEWS.MONTH;break;
      case SELECTION_MODES.YEAR:
        currentView = PICKER_VIEWS.YEAR;break;
    }

    _this.state = {
      currentView: currentView,
      timePickerVisible: false,
      pickerWidth: 0,
      date: new Date() // current view's date
    };

    if (props.value) {
      _this.state.date = new Date(props.value);
    }
    return _this;
  }

  DatePanel.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var date = new Date();
    if (nextProps.value) {
      date = toDate(nextProps.value);
    }

    this.setState({ date: date });
  };

  DatePanel.prototype.resetDate = function resetDate() {
    this.date = new Date(this.date);
  };

  DatePanel.prototype.showMonthPicker = function showMonthPicker() {
    this.setState({ currentView: PICKER_VIEWS.MONTH });
  };

  DatePanel.prototype.showYearPicker = function showYearPicker() {
    this.setState({ currentView: PICKER_VIEWS.YEAR });
  };

  DatePanel.prototype.prevMonth = function prevMonth() {
    var _this2 = this;

    this.updateState(function () {
      var date = _this2.state.date;

      var _deconstructDate = deconstructDate(date),
          month = _deconstructDate.month,
          year = _deconstructDate.year;

      date.setMonth(month, 1);

      if (month == 0) {
        date.setFullYear(year - 1);
        date.setMonth(11);
      } else {
        date.setMonth(month - 1);
      }
    });
  };

  DatePanel.prototype.nextMonth = function nextMonth() {
    var _this3 = this;

    this.updateState(function () {
      var date = _this3.state.date;

      var _deconstructDate2 = deconstructDate(date),
          month = _deconstructDate2.month,
          year = _deconstructDate2.year;

      date.setMonth(month, 1);

      if (month == 11) {
        date.setFullYear(year + 1);
        date.setMonth(0);
      } else {
        date.setMonth(month + 1);
      }
    });
  };

  DatePanel.prototype.nextYear = function nextYear() {
    var _this4 = this;

    this.updateState(function () {
      var _state = _this4.state,
          date = _state.date,
          currentView = _state.currentView;

      var _deconstructDate3 = deconstructDate(date),
          year = _deconstructDate3.year;

      if (currentView === 'year') {
        date.setFullYear(year + 10);
      } else {
        date.setFullYear(year + 1);
      }
    });
  };

  DatePanel.prototype.updateState = function updateState(cb) {
    cb(this.state);
    this.setState({});
  };

  DatePanel.prototype.prevYear = function prevYear() {
    var _this5 = this;

    this.updateState(function () {
      var _state2 = _this5.state,
          date = _state2.date,
          currentView = _state2.currentView;

      var _deconstructDate4 = deconstructDate(date),
          year = _deconstructDate4.year;

      if (currentView === 'year') {
        date.setFullYear(year - 10);
      } else {
        date.setFullYear(year - 1);
      }
    });
  };

  DatePanel.prototype.handleShortcutClick = function handleShortcutClick(shortcut) {
    shortcut.onClick();
  };

  DatePanel.prototype.handleTimePick = function handleTimePick(pickedDate, isKeepPanel) {
    this.updateState(function (state) {
      if (pickedDate) {
        var oldDate = state.date;
        oldDate.setHours(pickedDate.getHours());
        oldDate.setMinutes(pickedDate.getMinutes());
        oldDate.setSeconds(pickedDate.getSeconds());
      }
      state.timePickerVisible = isKeepPanel;
    });
  };

  DatePanel.prototype.handleMonthPick = function handleMonthPick(month) {
    var _this6 = this;

    this.updateState(function (state) {
      var date = state.date;
      var selectionMode = _this6.props.selectionMode;

      var _deconstructDate5 = deconstructDate(date),
          year = _deconstructDate5.year;

      if (selectionMode !== SELECTION_MODES.MONTH) {
        date.setMonth(month);
        state.currentView = PICKER_VIEWS.DATE;
      } else {
        date.setMonth(month);
        date.setFullYear(year);
        _this6.props.onPick(new Date(year, month, 1));
      }
    });
  };

  DatePanel.prototype.handleDatePick = function handleDatePick(value) {
    var _this7 = this;

    this.updateState(function (state) {
      var date = state.date;
      var _props = _this7.props,
          selectionMode = _props.selectionMode,
          isShowTime = _props.isShowTime,
          onPick = _props.onPick;

      var pdate = value.date;
      if (selectionMode === SELECTION_MODES.DAY) {
        if (!isShowTime) {
          onPick(new Date(pdate.getTime()));
        }
        date.setTime(pdate.getTime());
      } else if (selectionMode === SELECTION_MODES.WEEK) {
        onPick(pdate);
      }
    });
  };

  DatePanel.prototype.handleYearPick = function handleYearPick(year) {
    var _this8 = this;

    this.updateState(function (state) {
      var _props2 = _this8.props,
          onPick = _props2.onPick,
          selectionMode = _props2.selectionMode;
      var date = state.date;

      date.setFullYear(year);
      if (selectionMode === SELECTION_MODES.YEAR) {
        onPick(new Date(year, 0));
      } else {
        state.currentView = PICKER_VIEWS.MONTH;
      }
    });
  };

  DatePanel.prototype.changeToNow = function changeToNow() {
    var now = new Date();
    this.props.onPick(now);
    this.setState({ date: now });
  };

  DatePanel.prototype.confirm = function confirm() {
    this.props.onPick(new Date(this.state.date.getTime()));
  };

  DatePanel.prototype.resetView = function resetView() {
    var selectionMode = this.props.selectionMode;


    this.updateState(function (state) {
      if (selectionMode === SELECTION_MODES.MONTH) {
        state.currentView = PICKER_VIEWS.MONTH;
      } else if (selectionMode === SELECTION_MODES.YEAR) {
        state.currentView = PICKER_VIEWS.YEAR;
      } else {
        state.currentView = PICKER_VIEWS.DATE;
      }
    });
  };

  DatePanel.prototype.yearLabel = function yearLabel() {
    var _state3 = this.state,
        currentView = _state3.currentView,
        date = _state3.date;

    var _deconstructDate6 = deconstructDate(date),
        year = _deconstructDate6.year;

    var yearTranslation = Locale.t('el.datepicker.year');
    if (currentView === 'year') {
      var startYear = Math.floor(year / 10) * 10;
      if (yearTranslation) {
        return startYear + ' ' + yearTranslation + '-' + (startYear + 9) + ' ' + yearTranslation;
      }
      return startYear + ' - ' + (startYear + 9);
    }
    return year + ' ' + yearTranslation;
  };

  // end: ------ public methods
  DatePanel.prototype._pickerContent = function _pickerContent() {
    var _props3 = this.props,
        value = _props3.value,
        selectionMode = _props3.selectionMode,
        disabledDate = _props3.disabledDate,
        showWeekNumber = _props3.showWeekNumber,
        firstDayOfWeek = _props3.firstDayOfWeek;
    var date = this.state.date;
    var currentView = this.state.currentView;

    var result = null;

    switch (currentView) {
      case PICKER_VIEWS.DATE:
        result = React.createElement(DateTable, {
          onPick: this.handleDatePick.bind(this),
          date: date,
          value: value,
          selectionMode: selectionMode,
          disabledDate: disabledDate,
          showWeekNumber: showWeekNumber,
          firstDayOfWeek: firstDayOfWeek
        });

        break;
      case PICKER_VIEWS.YEAR:
        result = React.createElement(YearTable, {
          ref: 'yearTable',
          value: value,
          date: date,
          onPick: this.handleYearPick.bind(this),
          disabledDate: disabledDate
        });
        break;
      case PICKER_VIEWS.MONTH:
        result = React.createElement(MonthTable, {
          value: value,
          date: date,
          onPick: this.handleMonthPick.bind(this),
          disabledDate: disabledDate
        });
        break;
      default:
        throw new Error('invalid currentView value');
    }

    return result;
  };

  DatePanel.prototype.render = function render() {
    var _this9 = this;

    var _props4 = this.props,
        isShowTime = _props4.isShowTime,
        shortcuts = _props4.shortcuts;
    var _state4 = this.state,
        currentView = _state4.currentView,
        date = _state4.date,
        pickerWidth = _state4.pickerWidth,
        timePickerVisible = _state4.timePickerVisible;

    var _deconstructDate7 = deconstructDate(date),
        month = _deconstructDate7.month;

    var t = Locale.t;

    return React.createElement(
      'div',
      {
        ref: 'root',
        className: this.classNames('el-picker-panel el-date-picker', {
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
                  return _this9.handleShortcutClick(e);
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
            { className: 'el-date-picker__time-header' },
            React.createElement(
              'span',
              { className: 'el-date-picker__editor-wrap' },
              React.createElement(Input, {
                placeholder: t('el.datepicker.selectDate'),
                value: this.visibleDate,
                size: 'small',
                onChange: function onChange(date) {
                  return _this9.visibleDate = date;
                }
              })
            ),
            React.createElement(
              'span',
              { className: 'el-date-picker__editor-wrap' },
              React.createElement(Input, {
                ref: 'input',
                onFocus: function onFocus() {
                  return _this9.setState({ timePickerVisible: !_this9.state.timePickerVisible });
                },
                placeholder: t('el.datepicker.selectTime'),
                value: this.visibleTime,
                size: 'small',
                onChange: function onChange(date) {
                  return _this9.visibleDate = date;
                }
              }),
              timePickerVisible && React.createElement(
                MountBody,
                null,
                React.createElement(TimePanel, {
                  ref: 'timepicker',
                  currentDate: new Date(date.getTime()) /* should i dont mutate date directly here ? */,
                  pickerWidth: pickerWidth
                  /*
                  todo: pickerWidth? in original elmenent repo, this width is set by getting input with using getClientRect() method
                  but it seems work even though I purposely leave this logic unimplemented. To be honest it would require some hack to get
                  this actually done, since I can't do any setState method on componentDidUpdate method.
                  DateRangePicker has same issue
                  */
                  ,
                  onPicked: this.handleTimePick.bind(this),
                  format: this.timeFormat,
                  getPopperRefElement: function getPopperRefElement() {
                    return ReactDOM.findDOMNode(_this9.refs.input);
                  },
                  popperMixinOption: {
                    placement: PLACEMENT_MAP[this.props.align] || PLACEMENT_MAP.left
                  },
                  onCancel: function onCancel() {
                    return _this9.setState({ timePickerVisible: false });
                  }
                })
              )
            )
          ),
          currentView !== 'time' && React.createElement(
            'div',
            { className: 'el-date-picker__header' },
            React.createElement('button', {
              type: 'button',
              onClick: this.prevYear.bind(this),
              className: 'el-picker-panel__icon-btn el-date-picker__prev-btn el-icon-d-arrow-left' }),
            currentView === PICKER_VIEWS.DATE && React.createElement('button', {
              type: 'button',
              onClick: this.prevMonth.bind(this),
              className: 'el-picker-panel__icon-btn el-date-picker__prev-btn el-icon-arrow-left' }),
            React.createElement(
              'span',
              {
                onClick: this.showYearPicker.bind(this),
                className: 'el-date-picker__header-label' },
              this.yearLabel()
            ),
            currentView === PICKER_VIEWS.DATE && React.createElement(
              'span',
              {
                onClick: this.showMonthPicker.bind(this),
                className: this.classNames('el-date-picker__header-label', {
                  active: currentView === 'month'
                })
              },
              t('el.datepicker.month' + (month + 1))
            ),
            React.createElement('button', {
              type: 'button',
              onClick: this.nextYear.bind(this),
              className: 'el-picker-panel__icon-btn el-date-picker__next-btn el-icon-d-arrow-right' }),
            currentView === PICKER_VIEWS.DATE && React.createElement('button', {
              type: 'button',
              onClick: this.nextMonth.bind(this),
              className: 'el-picker-panel__icon-btn el-date-picker__next-btn el-icon-arrow-right' })
          ),
          React.createElement(
            'div',
            { className: 'el-picker-panel__content' },
            this._pickerContent()
          )
        )
      ),
      isShowTime && currentView === PICKER_VIEWS.DATE && React.createElement(
        'div',
        {
          className: 'el-picker-panel__footer' },
        React.createElement(
          'a',
          {
            href: 'JavaScript:',
            className: 'el-picker-panel__link-btn',
            onClick: this.changeToNow.bind(this) },
          t('el.datepicker.now')
        ),
        React.createElement(
          'button',
          {
            type: 'button',
            className: 'el-picker-panel__btn',
            onClick: function onClick() {
              return _this9.confirm();
            } },
          t('el.datepicker.confirm')
        )
      )
    );
  };

  _createClass(DatePanel, [{
    key: 'visibleTime',
    get: function get() {
      return formatDate(this.state.date, this.timeFormat);
    },
    set: function set(val) {
      if (val) {
        var ndate = parseDate(val, this.timeFormat);
        var date = this.state.date;

        if (ndate) {
          ndate.setFullYear(date.getFullYear());
          ndate.setMonth(date.getMonth());
          ndate.setDate(date.getDate());
          this.setState({ date: ndate, timePickerVisible: false });
        }
      }
    }
  }, {
    key: 'visibleDate',
    get: function get() {
      return formatDate(this.state.date, this.dateFormat);
    },
    set: function set(val) {
      var ndate = parseDate(val, this.dateFormat);
      if (!ndate) {
        return;
      }
      var disabledDate = this.props.disabledDate;
      var date = this.state.date;

      if (typeof disabledDate === 'function' && disabledDate(ndate)) {
        return;
      }
      ndate.setHours(date.getHours());
      ndate.setMinutes(date.getMinutes());
      ndate.setSeconds(date.getSeconds());
      this.setState({ date: ndate });
      this.resetView();
    }
  }, {
    key: 'timeFormat',
    get: function get() {
      var format = this.props.format;

      if (format && format.indexOf('ss') === -1) {
        return 'HH:mm';
      } else {
        return 'HH:mm:ss';
      }
    }
  }, {
    key: 'dateFormat',
    get: function get() {
      if (this.props.format) return this.props.format.replace('HH:mm', '').replace(':ss', '').trim();else return 'yyyy-MM-dd';
    }
  }]);

  return DatePanel;
}(PopperBase);

export default DatePanel;


DatePanel.defaultProps = {
  isShowTime: false,
  selectionMode: SELECTION_MODES.DAY
};