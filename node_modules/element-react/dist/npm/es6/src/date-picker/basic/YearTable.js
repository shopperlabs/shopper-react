import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';

import { PropTypes, Component } from '../../../libs';
import { hasClass, deconstructDate, SELECTION_MODES } from '../utils';

var YearTable = function (_Component) {
  _inherits(YearTable, _Component);

  function YearTable(props) {
    _classCallCheck(this, YearTable);

    return _possibleConstructorReturn(this, _Component.call(this, props));
  }

  YearTable.prototype.getCellStyle = function getCellStyle(year) {
    var _props = this.props,
        disabledDate = _props.disabledDate,
        value = _props.value,
        date = _props.date;

    var style = {};
    var ndate = new Date(date);

    ndate.setFullYear(year);
    style.disabled = typeof disabledDate === 'function' && disabledDate(ndate, SELECTION_MODES.YEAR);
    style.current = value && deconstructDate(value).year === year;

    return style;
  };

  YearTable.prototype.handleYearTableClick = function handleYearTableClick(event) {
    var target = event.target;
    if (target.tagName === 'A') {
      if (hasClass(target.parentNode, 'disabled')) return;
      var year = target.textContent || target.innerText;
      this.props.onPick(+year);
    }
  };

  YearTable.prototype.render = function render() {
    var date = this.props.date;

    var startYear = Math.floor(deconstructDate(date).year / 10) * 10;

    return React.createElement(
      'table',
      { onClick: this.handleYearTableClick.bind(this), className: 'el-year-table' },
      React.createElement(
        'tbody',
        null,
        React.createElement(
          'tr',
          null,
          React.createElement(
            'td',
            { className: this.classNames('available', this.getCellStyle(startYear + 0)) },
            React.createElement(
              'a',
              { className: 'cell' },
              startYear
            )
          ),
          React.createElement(
            'td',
            { className: this.classNames('available', this.getCellStyle(startYear + 1)) },
            React.createElement(
              'a',
              { className: 'cell' },
              startYear + 1
            )
          ),
          React.createElement(
            'td',
            { className: this.classNames('available', this.getCellStyle(startYear + 2)) },
            React.createElement(
              'a',
              { className: 'cell' },
              startYear + 2
            )
          ),
          React.createElement(
            'td',
            { className: this.classNames('available', this.getCellStyle(startYear + 3)) },
            React.createElement(
              'a',
              { className: 'cell' },
              startYear + 3
            )
          )
        ),
        React.createElement(
          'tr',
          null,
          React.createElement(
            'td',
            { className: this.classNames('available', this.getCellStyle(startYear + 4)) },
            React.createElement(
              'a',
              { className: 'cell' },
              startYear + 4
            )
          ),
          React.createElement(
            'td',
            { className: this.classNames('available', this.getCellStyle(startYear + 5)) },
            React.createElement(
              'a',
              { className: 'cell' },
              startYear + 5
            )
          ),
          React.createElement(
            'td',
            { className: this.classNames('available', this.getCellStyle(startYear + 6)) },
            React.createElement(
              'a',
              { className: 'cell' },
              startYear + 6
            )
          ),
          React.createElement(
            'td',
            { className: this.classNames('available', this.getCellStyle(startYear + 7)) },
            React.createElement(
              'a',
              { className: 'cell' },
              startYear + 7
            )
          )
        ),
        React.createElement(
          'tr',
          null,
          React.createElement(
            'td',
            { className: this.classNames('available', this.getCellStyle(startYear + 8)) },
            React.createElement(
              'a',
              { className: 'cell' },
              startYear + 8
            )
          ),
          React.createElement(
            'td',
            { className: this.classNames('available', this.getCellStyle(startYear + 9)) },
            React.createElement(
              'a',
              { className: 'cell' },
              startYear + 9
            )
          ),
          React.createElement('td', null),
          React.createElement('td', null)
        )
      )
    );
  };

  return YearTable;
}(Component);

export default YearTable;


YearTable.propTypes = {
  value: PropTypes.instanceOf(Date),
  date: PropTypes.instanceOf(Date).isRequired,
  // (year: number)=>
  onPick: PropTypes.func.isRequired,
  // (Date)=>boolean
  disabledDate: PropTypes.func
};