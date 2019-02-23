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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var YearTable = function (_Component) {
  (0, _inherits3.default)(YearTable, _Component);

  function YearTable(props) {
    (0, _classCallCheck3.default)(this, YearTable);
    return (0, _possibleConstructorReturn3.default)(this, (YearTable.__proto__ || Object.getPrototypeOf(YearTable)).call(this, props));
  }

  (0, _createClass3.default)(YearTable, [{
    key: 'getCellStyle',
    value: function getCellStyle(year) {
      var _props = this.props,
          disabledDate = _props.disabledDate,
          value = _props.value,
          date = _props.date;

      var style = {};
      var ndate = new Date(date);

      ndate.setFullYear(year);
      style.disabled = typeof disabledDate === 'function' && disabledDate(ndate, _utils.SELECTION_MODES.YEAR);
      style.current = value && (0, _utils.deconstructDate)(value).year === year;

      return style;
    }
  }, {
    key: 'handleYearTableClick',
    value: function handleYearTableClick(event) {
      var target = event.target;
      if (target.tagName === 'A') {
        if ((0, _utils.hasClass)(target.parentNode, 'disabled')) return;
        var year = target.textContent || target.innerText;
        this.props.onPick(+year);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var date = this.props.date;

      var startYear = Math.floor((0, _utils.deconstructDate)(date).year / 10) * 10;

      return _react2.default.createElement(
        'table',
        { onClick: this.handleYearTableClick.bind(this), className: 'el-year-table' },
        _react2.default.createElement(
          'tbody',
          null,
          _react2.default.createElement(
            'tr',
            null,
            _react2.default.createElement(
              'td',
              { className: this.classNames('available', this.getCellStyle(startYear + 0)) },
              _react2.default.createElement(
                'a',
                { className: 'cell' },
                startYear
              )
            ),
            _react2.default.createElement(
              'td',
              { className: this.classNames('available', this.getCellStyle(startYear + 1)) },
              _react2.default.createElement(
                'a',
                { className: 'cell' },
                startYear + 1
              )
            ),
            _react2.default.createElement(
              'td',
              { className: this.classNames('available', this.getCellStyle(startYear + 2)) },
              _react2.default.createElement(
                'a',
                { className: 'cell' },
                startYear + 2
              )
            ),
            _react2.default.createElement(
              'td',
              { className: this.classNames('available', this.getCellStyle(startYear + 3)) },
              _react2.default.createElement(
                'a',
                { className: 'cell' },
                startYear + 3
              )
            )
          ),
          _react2.default.createElement(
            'tr',
            null,
            _react2.default.createElement(
              'td',
              { className: this.classNames('available', this.getCellStyle(startYear + 4)) },
              _react2.default.createElement(
                'a',
                { className: 'cell' },
                startYear + 4
              )
            ),
            _react2.default.createElement(
              'td',
              { className: this.classNames('available', this.getCellStyle(startYear + 5)) },
              _react2.default.createElement(
                'a',
                { className: 'cell' },
                startYear + 5
              )
            ),
            _react2.default.createElement(
              'td',
              { className: this.classNames('available', this.getCellStyle(startYear + 6)) },
              _react2.default.createElement(
                'a',
                { className: 'cell' },
                startYear + 6
              )
            ),
            _react2.default.createElement(
              'td',
              { className: this.classNames('available', this.getCellStyle(startYear + 7)) },
              _react2.default.createElement(
                'a',
                { className: 'cell' },
                startYear + 7
              )
            )
          ),
          _react2.default.createElement(
            'tr',
            null,
            _react2.default.createElement(
              'td',
              { className: this.classNames('available', this.getCellStyle(startYear + 8)) },
              _react2.default.createElement(
                'a',
                { className: 'cell' },
                startYear + 8
              )
            ),
            _react2.default.createElement(
              'td',
              { className: this.classNames('available', this.getCellStyle(startYear + 9)) },
              _react2.default.createElement(
                'a',
                { className: 'cell' },
                startYear + 9
              )
            ),
            _react2.default.createElement('td', null),
            _react2.default.createElement('td', null)
          )
        )
      );
    }
  }]);
  return YearTable;
}(_libs.Component);

var _default = YearTable;
exports.default = _default;


YearTable.propTypes = {
  value: _libs.PropTypes.instanceOf(Date),
  date: _libs.PropTypes.instanceOf(Date).isRequired,
  // (year: number)=>
  onPick: _libs.PropTypes.func.isRequired,
  // (Date)=>boolean
  disabledDate: _libs.PropTypes.func
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(YearTable, 'YearTable', 'src/date-picker/basic/YearTable.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/date-picker/basic/YearTable.jsx');
}();

;