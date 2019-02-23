import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';

import { PropTypes, Component } from '../../../libs';
import { hasClass, deconstructDate, SELECTION_MODES } from '../utils';
import Locale from '../../locale';

var MonthTable = function (_Component) {
  _inherits(MonthTable, _Component);

  function MonthTable(props) {
    _classCallCheck(this, MonthTable);

    return _possibleConstructorReturn(this, _Component.call(this, props));
  }

  MonthTable.prototype.getCellStyle = function getCellStyle(month) {
    var _props = this.props,
        date = _props.date,
        disabledDate = _props.disabledDate,
        value = _props.value;

    var style = {};
    var ndate = new Date(date);
    ndate.setMonth(month);
    // in the element repo, you could see the original code that only disable current month only when all days contains in this month are disabled
    // which i don't think is a good design, so i changed disabledDate callback with an additional type param to solve this kind issue.
    // so the caller can handle different picker views on each switch arm condition.
    style.disabled = typeof disabledDate === 'function' && disabledDate(ndate, SELECTION_MODES.MONTH);
    style.current = value && deconstructDate(value).month === month;
    return style;
  };

  MonthTable.prototype.handleMonthTableClick = function handleMonthTableClick(event) {
    var target = event.target;
    if (target.tagName !== 'A') return;
    if (hasClass(target.parentNode, 'disabled')) return;
    var column = target.parentNode.cellIndex;
    var row = target.parentNode.parentNode.rowIndex;
    var month = row * 4 + column;

    this.props.onPick(month);
  };

  MonthTable.prototype.render = function render() {
    var _this2 = this;

    var $t = Locale.t;
    var months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

    return React.createElement(
      'table',
      { onClick: this.handleMonthTableClick.bind(this), className: 'el-month-table' },
      React.createElement(
        'tbody',
        null,
        months.map(function (key, idx) {
          return React.createElement(
            'td',
            { className: _this2.classNames(_this2.getCellStyle(idx)), key: idx },
            React.createElement(
              'a',
              { className: 'cell' },
              $t('el.datepicker.months.' + key)
            )
          );
        }).reduce(function (col, item) {
          var tararr = void 0;
          if (!(Array.isArray(col[0]) && col[0].length !== 4)) {
            col.unshift([]);
          }
          tararr = col[0];
          tararr.push(item);
          return col;
        }, []).reverse().map(function (e, idx) {
          return React.createElement(
            'tr',
            { key: idx },
            e
          );
        })
      )
    );
  };

  return MonthTable;
}(Component);

export default MonthTable;


MonthTable.propTypes = {
  // current date, specific to view
  date: PropTypes.instanceOf(Date).isRequired,
  // user picked value, value: Date|null
  value: PropTypes.instanceOf(Date),
  onPick: PropTypes.func.isRequired,
  // (Date)=>boolean
  disabledDate: PropTypes.func
};