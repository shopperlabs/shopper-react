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

var React = _interopRequireWildcard(_react);

var _libs = require('../../libs');

var _utils = require('./utils');

var _checkbox = require('../checkbox');

var _checkbox2 = _interopRequireDefault(_checkbox);

var _tag = require('../tag');

var _tag2 = _interopRequireDefault(_tag);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import {toDate} from "../date-picker/utils/index";

var TableFooter = function (_Component) {
  (0, _inherits3.default)(TableFooter, _Component);

  function TableFooter() {
    (0, _classCallCheck3.default)(this, TableFooter);
    return (0, _possibleConstructorReturn3.default)(this, (TableFooter.__proto__ || Object.getPrototypeOf(TableFooter)).apply(this, arguments));
  }

  (0, _createClass3.default)(TableFooter, [{
    key: 'isCellHidden',
    value: function isCellHidden(index, columns) {
      var fixed = this.props.fixed;

      if (fixed === true || fixed === 'left') {
        return index >= this.leftFixedCount;
      } else if (fixed === 'right') {
        var before = 0;
        for (var i = 0; i < index; i++) {
          before += columns[i].colSpan;
        }
        return before < this.columnsCount - this.rightFixedCount;
      } else {
        return index < this.leftFixedCount || index >= this.columnsCount - this.rightFixedCount;
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          store = _props.store,
          layout = _props.layout,
          fixed = _props.fixed,
          summaryMethod = _props.summaryMethod,
          sumText = _props.sumText;

      var sums = summaryMethod ? summaryMethod(store.columns, store.data) : store.columns.map(function (column, index) {
        if (index === 0) {
          return sumText;
        }
        var result = store.data.reduce(function (pre, data) {
          return pre + parseFloat((0, _utils.getValueByPath)(data, column.property));
        }, 0);
        return isNaN(result) ? '' : result;
      });

      return React.createElement(
        'table',
        {
          className: 'el-table__footer',
          cellSpacing: '0',
          cellPadding: '0',
          style: this.style({
            borderSpacing: 0,
            border: 0
          })
        },
        React.createElement(
          'colgroup',
          null,
          store.columns.map(function (column, index) {
            return React.createElement('col', { width: column.realWidth, style: { width: column.realWidth }, key: index });
          }),
          !fixed && React.createElement('col', { width: layout.scrollY ? layout.gutterWidth : 0, style: { width: layout.scrollY ? layout.gutterWidth : 0 } })
        ),
        React.createElement(
          'tbody',
          null,
          React.createElement(
            'tr',
            null,
            store.columns.map(function (column, index) {
              return React.createElement(
                'td',
                {
                  key: index,
                  colSpan: column.colSpan,
                  rowSpan: column.rowSpan,
                  className: _this2.className(column.headerAlign, column.className, column.labelClassName, column.columnKey, {
                    'is-hidden': _this2.isCellHidden(index, store.columns),
                    'is-leaf': !column.subColumns
                  })
                },
                React.createElement(
                  'div',
                  { className: 'cell' },
                  sums[index]
                )
              );
            }),
            !fixed && React.createElement('td', {
              className: 'gutter',
              style: { width: layout.scrollY ? layout.gutterWidth : 0 }
            })
          )
        )
      );
    }
  }, {
    key: 'columnsCount',
    get: function get() {
      return this.props.store.columns.length;
    }
  }, {
    key: 'leftFixedCount',
    get: function get() {
      return this.props.store.fixedColumns.length;
    }
  }, {
    key: 'rightFixedCount',
    get: function get() {
      return this.props.store.rightFixedColumns.length;
    }
  }]);
  return TableFooter;
}(_libs.Component);

var _default = TableFooter;
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(TableFooter, 'TableFooter', 'src/table/TableFooter.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/table/TableFooter.jsx');
}();

;