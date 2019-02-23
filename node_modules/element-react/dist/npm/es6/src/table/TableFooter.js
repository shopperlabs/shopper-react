import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import * as React from 'react';
import { Component, PropTypes } from '../../libs';
import { getValueByPath } from "./utils";
import Checkbox from '../checkbox';
import Tag from '../tag';

// import {toDate} from "../date-picker/utils/index";

var TableFooter = function (_Component) {
  _inherits(TableFooter, _Component);

  function TableFooter() {
    _classCallCheck(this, TableFooter);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  TableFooter.prototype.isCellHidden = function isCellHidden(index, columns) {
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
  };

  TableFooter.prototype.render = function render() {
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
        return pre + parseFloat(getValueByPath(data, column.property));
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
  };

  _createClass(TableFooter, [{
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
}(Component);

export default TableFooter;