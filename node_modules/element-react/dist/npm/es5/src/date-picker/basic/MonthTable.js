'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _libs = require('../../../libs');

var _utils = require('../utils');

var _locale = require('../../locale');

var _locale2 = _interopRequireDefault(_locale);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MonthTable = function (_Component) {
  (0, _inherits3.default)(MonthTable, _Component);

  function MonthTable(props) {
    (0, _classCallCheck3.default)(this, MonthTable);
    return (0, _possibleConstructorReturn3.default)(this, (MonthTable.__proto__ || Object.getPrototypeOf(MonthTable)).call(this, props));
  }

  (0, _createClass3.default)(MonthTable, [{
    key: 'getCellStyle',
    value: function getCellStyle(month) {
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
      style.disabled = typeof disabledDate === 'function' && disabledDate(ndate, _utils.SELECTION_MODES.MONTH);
      style.current = value && (0, _utils.deconstructDate)(value).month === month;
      return style;
    }
  }, {
    key: 'handleMonthTableClick',
    value: function handleMonthTableClick(event) {
      var target = event.target;
      if (target.tagName !== 'A') return;
      if ((0, _utils.hasClass)(target.parentNode, 'disabled')) return;
      var column = target.parentNode.cellIndex;
      var row = target.parentNode.parentNode.rowIndex;
      var month = row * 4 + column;

      this.props.onPick(month);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var $t = _locale2.default.t;
      var months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

      return _react2.default.createElement(
        'table',
        { onClick: this.handleMonthTableClick.bind(this), className: 'el-month-table' },
        _react2.default.createElement(
          'tbody',
          null,
          months.map(function (key, idx) {
            return _react2.default.createElement(
              'td',
              { className: _this2.classNames(_this2.getCellStyle(idx)), key: idx },
              _react2.default.createElement(
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
            return _react2.default.createElement(
              'tr',
              { key: idx },
              e
            );
          })
        )
      );
    }
  }]);
  return MonthTable;
}(_libs.Component);

var _default = MonthTable;
exports.default = _default;


MonthTable.propTypes = {
  // current date, specific to view
  date: _libs.PropTypes.instanceOf(Date).isRequired,
  // user picked value, value: Date|null
  value: _libs.PropTypes.instanceOf(Date),
  onPick: _libs.PropTypes.func.isRequired,
  // (Date)=>boolean
  disabledDate: _libs.PropTypes.func
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(MonthTable, 'MonthTable', 'src/date-picker/basic/MonthTable.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/date-picker/basic/MonthTable.jsx');
}();

;