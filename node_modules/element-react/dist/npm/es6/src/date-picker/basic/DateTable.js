import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';

import { PropTypes, Component } from '../../../libs';
import { toDate, getFirstDayOfMonth, getDayCountOfMonth, getWeekNumber, getStartDateOfMonth, DAY_DURATION, SELECTION_MODES, deconstructDate, hasClass, getOffsetToWeekOrigin } from '../utils';
import Locale from '../../locale';

function isFunction(func) {
  return typeof func === 'function';
}

var clearHours = function clearHours(time) {
  var cloneDate = new Date(time);
  cloneDate.setHours(0, 0, 0, 0);
  return cloneDate.getTime();
};

var _WEEKS = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

var DateTable = function (_Component) {
  _inherits(DateTable, _Component);

  function DateTable(props) {
    _classCallCheck(this, DateTable);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.state = {
      tableRows: [[], [], [], [], [], []]
    };
    return _this;
  }

  DateTable.prototype.WEEKS = function WEEKS() {
    // 0-6
    var week = this.getOffsetWeek();
    return _WEEKS.slice(week).concat(_WEEKS.slice(0, week));
  };

  DateTable.prototype.getOffsetWeek = function getOffsetWeek() {
    return this.props.firstDayOfWeek % 7;
  };

  DateTable.prototype.getStartDate = function getStartDate() {
    var ds = deconstructDate(this.props.date);
    return getStartDateOfMonth(ds.year, ds.month, this.getOffsetWeek());
  };

  DateTable.prototype.getRows = function getRows() {
    var _props = this.props,
        date = _props.date,
        disabledDate = _props.disabledDate,
        showWeekNumber = _props.showWeekNumber,
        minDate = _props.minDate,
        maxDate = _props.maxDate,
        selectionMode = _props.selectionMode,
        firstDayOfWeek = _props.firstDayOfWeek;
    var tableRows = this.state.tableRows;


    var ndate = new Date(date.getTime());
    var day = getFirstDayOfMonth(ndate); // day of first day
    var dateCountOfMonth = getDayCountOfMonth(ndate.getFullYear(), ndate.getMonth());
    // dates count in december is always 31, so offset year is not neccessary
    var dateCountOfLastMonth = getDayCountOfMonth(ndate.getFullYear(), ndate.getMonth() === 0 ? 11 : ndate.getMonth() - 1);
    var offsetDaysToWeekOrigin = getOffsetToWeekOrigin(day, firstDayOfWeek);

    //tableRows: [ [], [], [], [], [], [] ]
    var rows = tableRows;
    var count = 1;
    var firstDayPosition = void 0;

    var startDate = this.getStartDate();
    var now = clearHours(new Date());

    for (var i = 0; i < 6; i++) {
      // rows
      var row = rows[i];
      /*
      cell: {
        type: string, one of 'week' | 'normal'
        text: String,
        row: number,  row index,
        column: number, column index;
        inRange: boolean,
        start: boolean,
        end: boolean,
        disabled: boolean
      }
      */
      if (showWeekNumber) {
        //prepend week info to the head of each row array
        if (!row[0]) {
          row[0] = { type: 'week', text: getWeekNumber(new Date(startDate.getTime() + DAY_DURATION * (i * 7 + 1))) };
        }
      }

      for (var j = 0; j < 7; j++) {
        // columns
        var cell = row[showWeekNumber ? j + 1 : j];
        if (!cell) {
          row[showWeekNumber ? j + 1 : j] = { row: i, column: j, type: 'normal', inRange: false, start: false, end: false };
          cell = row[showWeekNumber ? j + 1 : j];
        }

        cell.type = 'normal';

        var index = i * 7 + j; //current date offset
        var time = startDate.getTime() + DAY_DURATION * index;
        cell.inRange = time >= clearHours(minDate) && time <= clearHours(maxDate);
        cell.start = minDate && time === clearHours(minDate);
        cell.end = maxDate && time === clearHours(maxDate);
        var isToday = time === now;

        if (isToday) {
          cell.type = 'today';
        }

        if (i === 0) {
          //handle first row of date, this row only contains all or some pre-month dates
          if (j >= offsetDaysToWeekOrigin) {
            cell.text = count++;
            if (count === 2) {
              firstDayPosition = i * 7 + j;
            }
          } else {
            cell.text = dateCountOfLastMonth - offsetDaysToWeekOrigin + j + 1;
            cell.type = 'prev-month';
          }
        } else {
          if (count <= dateCountOfMonth) {
            //in current dates
            cell.text = count++;
            if (count === 2) {
              firstDayPosition = i * 7 + j;
            }
          } else {
            // next month
            cell.text = count++ - dateCountOfMonth;
            cell.type = 'next-month';
          }
        }

        cell.disabled = isFunction(disabledDate) && disabledDate(new Date(time), SELECTION_MODES.DAY);
      }

      if (selectionMode === SELECTION_MODES.WEEK) {
        var start = showWeekNumber ? 1 : 0;
        var end = showWeekNumber ? 7 : 6;
        var isWeekActive = this.isWeekActive(row[start + 1]);

        row[start].inRange = isWeekActive;
        row[start].start = isWeekActive;
        row[end].inRange = isWeekActive;
        row[end].end = isWeekActive;
        row.isWeekActive = isWeekActive;
      }
    }

    rows.firstDayPosition = firstDayPosition;

    return rows;
  };

  // calc classnames for cell


  DateTable.prototype.getCellClasses = function getCellClasses(cell) {
    var _props2 = this.props,
        selectionMode = _props2.selectionMode,
        date = _props2.date;


    var classes = [];
    if ((cell.type === 'normal' || cell.type === 'today') && !cell.disabled) {
      classes.push('available');
      if (cell.type === 'today') {
        classes.push('today');
      }
    } else {
      classes.push(cell.type);
    }

    if (selectionMode === 'day' && (cell.type === 'normal' || cell.type === 'today')
    // following code only highlight date that is the actuall value of the datepicker, but actually it should
    // be the temp that value use selected
    && date.getDate() === +cell.text) {
      // && value
      // && value.getFullYear() === date.getFullYear()
      // && value.getMonth() === date.getMonth()
      // && value.getDate() === Number(cell.text)) {
      classes.push('current');
    }

    if (cell.inRange && (cell.type === 'normal' || cell.type === 'today' || selectionMode === 'week')) {
      classes.push('in-range');

      if (cell.start) {
        classes.push('start-date');
      }

      if (cell.end) {
        classes.push('end-date');
      }
    }

    if (cell.disabled) {
      classes.push('disabled');
    }

    return classes.join(' ');
  };

  DateTable.prototype.getMarkedRangeRows = function getMarkedRangeRows() {
    var _props3 = this.props,
        showWeekNumber = _props3.showWeekNumber,
        minDate = _props3.minDate,
        selectionMode = _props3.selectionMode,
        rangeState = _props3.rangeState;

    var rows = this.getRows();
    if (!(selectionMode === SELECTION_MODES.RANGE && rangeState.selecting && rangeState.endDate instanceof Date)) return rows;

    var maxDate = rangeState.endDate;
    for (var i = 0, k = rows.length; i < k; i++) {
      var row = rows[i];
      for (var j = 0, l = row.length; j < l; j++) {
        if (showWeekNumber && j === 0) continue;

        var cell = row[j];
        var index = i * 7 + j + (showWeekNumber ? -1 : 0);
        var time = this.getStartDate().getTime() + DAY_DURATION * index;

        cell.inRange = minDate && time >= clearHours(minDate) && time <= clearHours(maxDate);
        cell.start = minDate && time === clearHours(minDate.getTime());
        cell.end = maxDate && time === clearHours(maxDate.getTime());
      }
    }

    return rows;
  };

  DateTable.prototype.isWeekActive = function isWeekActive(cell) {
    if (this.props.selectionMode !== SELECTION_MODES.WEEK) return false;
    if (!this.props.value) return false;

    var newDate = new Date(this.props.date.getTime()); // date view
    var year = newDate.getFullYear();
    var month = newDate.getMonth();

    if (cell.type === 'prev-month') {
      newDate.setMonth(month === 0 ? 11 : month - 1);
      newDate.setFullYear(month === 0 ? year - 1 : year);
    }

    if (cell.type === 'next-month') {
      newDate.setMonth(month === 11 ? 0 : month + 1);
      newDate.setFullYear(month === 11 ? year + 1 : year);
    }
    newDate.setDate(parseInt(cell.text, 10));

    return getWeekNumber(newDate) === deconstructDate(this.props.value).week; // current date value
  };

  DateTable.prototype.handleMouseMove = function handleMouseMove(event) {
    var _this2 = this;

    var _props4 = this.props,
        showWeekNumber = _props4.showWeekNumber,
        onChangeRange = _props4.onChangeRange,
        rangeState = _props4.rangeState,
        selectionMode = _props4.selectionMode;


    var getDateOfCell = function getDateOfCell(row, column, showWeekNumber) {
      var startDate = _this2.getStartDate();
      return new Date(startDate.getTime() + (row * 7 + (column - (showWeekNumber ? 1 : 0))) * DAY_DURATION);
    };

    if (!(selectionMode === SELECTION_MODES.RANGE && rangeState.selecting)) return;

    var target = event.target;
    if (target.tagName !== 'TD') return;

    var column = target.cellIndex;
    var row = target.parentNode.rowIndex - 1;

    rangeState.endDate = getDateOfCell(row, column, showWeekNumber);
    onChangeRange(rangeState);
  };

  DateTable.prototype.handleClick = function handleClick(event) {
    var target = event.target;

    if (target.tagName !== 'TD') return;
    if (hasClass(target, 'disabled') || hasClass(target, 'week')) return;

    var _props5 = this.props,
        selectionMode = _props5.selectionMode,
        date = _props5.date,
        onPick = _props5.onPick,
        minDate = _props5.minDate,
        maxDate = _props5.maxDate,
        rangeState = _props5.rangeState;

    var _deconstructDate = deconstructDate(date),
        year = _deconstructDate.year,
        month = _deconstructDate.month;

    if (selectionMode === 'week') {
      target = target.parentNode.cells[1];
    }

    var cellIndex = target.cellIndex;
    var rowIndex = target.parentNode.rowIndex - 1;

    var cell = this.getRows()[rowIndex][cellIndex];
    var text = cell.text;
    var className = target.className;

    var newDate = new Date(year, month, 1);

    if (className.indexOf('prev') !== -1) {
      if (month === 0) {
        newDate.setFullYear(year - 1);
        newDate.setMonth(11);
      } else {
        newDate.setMonth(month - 1);
      }
    } else if (className.indexOf('next') !== -1) {
      if (month === 11) {
        newDate.setFullYear(year + 1);
        newDate.setMonth(0);
      } else {
        newDate.setMonth(month + 1);
      }
    }

    newDate.setDate(parseInt(text, 10));
    if (selectionMode === SELECTION_MODES.RANGE) {
      if (rangeState.selecting) {
        if (newDate < minDate) {
          rangeState.selecting = true;
          onPick({ minDate: toDate(newDate), maxDate: null }, false);
        } else if (newDate >= minDate) {
          rangeState.selecting = false;
          onPick({ minDate: minDate, maxDate: toDate(newDate) }, true);
        }
      } else {
        if (minDate && maxDate || !minDate) {
          // be careful about the rangeState & onPick order
          // since rangeState is a object, mutate it will make child DateTable see the
          // changes, but wont trigger a DateTable re-render. but onPick would trigger it.
          // so a reversed order may cause a bug.
          rangeState.selecting = true;
          onPick({ minDate: toDate(newDate), maxDate: null }, false);
        }
      }
    } else if (selectionMode === SELECTION_MODES.DAY || selectionMode === SELECTION_MODES.WEEK) {
      onPick({ date: newDate });
    }
  };

  DateTable.prototype.render = function render() {
    var _this3 = this;

    var $t = Locale.t;
    var _props6 = this.props,
        selectionMode = _props6.selectionMode,
        showWeekNumber = _props6.showWeekNumber;


    return React.createElement(
      'table',
      {
        cellSpacing: '0',
        cellPadding: '0',
        onClick: this.handleClick.bind(this),
        onMouseMove: this.handleMouseMove.bind(this),
        className: this.classNames('el-date-table', { 'is-week-mode': selectionMode === 'week' }) },
      React.createElement(
        'tbody',
        null,
        React.createElement(
          'tr',
          null,
          showWeekNumber && React.createElement(
            'th',
            null,
            $t('el.datepicker.week')
          ),
          this.WEEKS().map(function (e, idx) {
            return React.createElement(
              'th',
              { key: idx },
              $t('el.datepicker.weeks.' + e)
            );
          })
        ),
        this.getMarkedRangeRows().map(function (row, idx) {
          return React.createElement(
            'tr',
            {
              key: idx,
              className: _this3.classNames('el-date-table__row', { 'current': row.isWeekActive }) },
            row.map(function (cell, idx) {
              return React.createElement(
                'td',
                { className: _this3.getCellClasses(cell), key: idx },
                cell.type === 'today' ? $t('el.datepicker.today') : cell.text
              );
            })
          );
        })
      )
    );
  };

  return DateTable;
}(Component);

export default DateTable;


DateTable.propTypes = {
  disabledDate: PropTypes.func,
  showWeekNumber: PropTypes.bool,
  //minDate, maxDate: only valid in range mode. control date's start, end info
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
  selectionMode: PropTypes.oneOf(Object.keys(SELECTION_MODES).map(function (e) {
    return SELECTION_MODES[e];
  })),
  // date view model, all visual view derive from this info
  date: PropTypes.instanceOf(Date).isRequired,
  // current date value, use picked.
  value: PropTypes.instanceOf(Date),
  /*
  (data, closePannel: boolean)=>()
     data:
      if selectionMode = range: // notify when ranges is change
        minDate: Date|null,
        maxDate: Date|null
       if selectionMode = date
        date: Date
       if selectionMode = week:
        year: number
        week: number,
        value: string,
        date: Date
  */
  onPick: PropTypes.func.isRequired,

  /*
  ({
    endDate: Date,
    selecting: boolean,
  })=>()
  */
  onChangeRange: PropTypes.func,
  rangeState: PropTypes.shape({
    endDate: PropTypes.date,
    selecting: PropTypes.bool
  }),
  firstDayOfWeek: PropTypes.range(0, 6)
};

DateTable.defaultProps = {
  selectionMode: 'day',
  firstDayOfWeek: 0
};