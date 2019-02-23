import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import * as React from 'react';
import { Component, PropTypes } from '../../libs';
import { getRowIdentity, getValueByPath } from "./utils";
// import {toDate} from "../date-picker/utils/index";

import Checkbox from '../checkbox';
import Tag from '../tag';

var TableBody = function (_Component) {
  _inherits(TableBody, _Component);

  function TableBody(props) {
    _classCallCheck(this, TableBody);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    ['handleMouseLeave'].forEach(function (fn) {
      _this[fn] = _this[fn].bind(_this);
    });
    return _this;
  }

  TableBody.prototype.handleMouseEnter = function handleMouseEnter(index) {
    this.context.store.setHoverRow(index);
  };

  TableBody.prototype.handleMouseLeave = function handleMouseLeave() {
    this.context.store.setHoverRow(null);
  };

  TableBody.prototype.handleCellMouseEnter = function handleCellMouseEnter(row, column, event) {
    this.dispatchEvent('onCellMouseEnter', row, column, event.currentTarget, event);
  };

  TableBody.prototype.handleCellMouseLeave = function handleCellMouseLeave(row, column, event) {
    this.dispatchEvent('onCellMouseLeave', row, column, event.currentTarget, event);
  };

  TableBody.prototype.handleCellClick = function handleCellClick(row, column, event) {
    this.dispatchEvent('onCellClick', row, column, event.currentTarget, event);
    this.dispatchEvent('onRowClick', row, event, column);
  };

  TableBody.prototype.handleCellDbClick = function handleCellDbClick(row, column, event) {
    this.dispatchEvent('onCellDbClick', row, column, event.currentTarget, event);
    this.dispatchEvent('onRowDbClick', row, column);
  };

  TableBody.prototype.handleRowContextMenu = function handleRowContextMenu(row, event) {
    this.dispatchEvent('onRowContextMenu', row, event);
  };

  TableBody.prototype.dispatchEvent = function dispatchEvent(name) {
    var fn = this.props[name];

    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    fn && fn.apply(undefined, args);
  };

  TableBody.prototype.isColumnHidden = function isColumnHidden(index) {
    var _props = this.props,
        store = _props.store,
        layout = _props.layout,
        props = _objectWithoutProperties(_props, ['store', 'layout']);

    if (props.fixed === true || props.fixed === 'left') {
      return index >= this.leftFixedCount;
    } else if (props.fixed === 'right') {
      return index < this.columnsCount - this.rightFixedCount;
    } else {
      return index < this.leftFixedCount || index >= this.columnsCount - this.rightFixedCount;
    }
  };

  TableBody.prototype.getRowStyle = function getRowStyle(row, index) {
    var rowStyle = this.props.rowStyle;

    if (typeof rowStyle === 'function') {
      return rowStyle.call(null, row, index);
    }

    return rowStyle;
  };

  TableBody.prototype.getKeyOfRow = function getKeyOfRow(row, index) {
    var rowKey = this.props.rowKey;

    if (rowKey) {
      return getRowIdentity(row, rowKey);
    }

    return index;
  };

  // getRowClass(row, index) {
  //   const { rowClassName, stripe } = this.props;
  //
  // }

  TableBody.prototype.handleExpandClick = function handleExpandClick(row, rowKey) {
    this.context.store.toggleRowExpanded(row, rowKey);
  };

  TableBody.prototype.handleClick = function handleClick(row) {
    this.context.store.setCurrentRow(row);
  };

  TableBody.prototype.renderCell = function renderCell(row, column, index, rowKey) {
    var _this2 = this;

    var type = column.type,
        selectable = column.selectable;

    if (type === 'expand') {
      return React.createElement(
        'div',
        {
          className: this.classNames('el-table__expand-icon ', {
            'el-table__expand-icon--expanded': this.context.store.isRowExpanding(row, rowKey)
          }),
          onClick: this.handleExpandClick.bind(this, row, rowKey)
        },
        React.createElement('i', { className: 'el-icon el-icon-arrow-right' })
      );
    }

    if (type === 'index') {
      return React.createElement(
        'div',
        null,
        index + 1
      );
    }

    if (type === 'selection') {
      var isSelected = this.context.store.isRowSelected(row, rowKey);
      return React.createElement(Checkbox, {
        checked: isSelected,
        disabled: selectable && !selectable(row, index),
        onChange: function onChange() {
          _this2.context.store.toggleRowSelection(row, !isSelected);
        }
      });
    }

    return column.render(row, column, index);
  };

  TableBody.prototype.render = function render() {
    var _this3 = this;

    var _props2 = this.props,
        store = _props2.store,
        layout = _props2.layout,
        props = _objectWithoutProperties(_props2, ['store', 'layout']);

    var columnsHidden = store.columns.map(function (column, index) {
      return _this3.isColumnHidden(index);
    });
    return React.createElement(
      'table',
      {
        className: 'el-table__body',
        cellPadding: 0,
        cellSpacing: 0,
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
        })
      ),
      React.createElement(
        'tbody',
        null,
        store.data.map(function (row, rowIndex) {
          var rowKey = _this3.getKeyOfRow(row, rowIndex);
          return [React.createElement(
            'tr',
            {
              key: rowKey,
              style: _this3.getRowStyle(row, rowIndex),
              className: _this3.className('el-table__row', {
                'el-table__row--striped': props.stripe && rowIndex % 2 === 1,
                'hover-row': store.hoverRow === rowIndex,
                'current-row': props.highlightCurrentRow && (props.currentRowKey === rowKey || store.currentRow === row)
              }, typeof props.rowClassName === 'string' ? props.rowClassName : typeof props.rowClassName === 'function' && props.rowClassName(row, rowIndex)),
              onMouseEnter: _this3.handleMouseEnter.bind(_this3, rowIndex),
              onMouseLeave: _this3.handleMouseLeave,
              onClick: _this3.handleClick.bind(_this3, row),
              onContextMenu: _this3.handleRowContextMenu.bind(_this3, row)
            },
            store.columns.map(function (column, cellIndex) {
              return React.createElement(
                'td',
                {
                  key: cellIndex,
                  className: _this3.classNames(column.className, column.align, column.columnKey, {
                    'is-hidden': columnsHidden[cellIndex]
                  }),
                  onMouseEnter: _this3.handleCellMouseEnter.bind(_this3, row, column),
                  onMouseLeave: _this3.handleCellMouseLeave.bind(_this3, row, column),
                  onClick: _this3.handleCellClick.bind(_this3, row, column),
                  onDoubleClick: _this3.handleCellDbClick.bind(_this3, row, column)
                },
                React.createElement(
                  'div',
                  { className: 'cell' },
                  _this3.renderCell(row, column, rowIndex, rowKey)
                )
              );
            }),
            !props.fixed && layout.scrollY && !!layout.gutterWidth && React.createElement('td', { className: 'gutter' })
          ), _this3.context.store.isRowExpanding(row, rowKey) && React.createElement(
            'tr',
            { key: rowKey + 'Expanded' },
            React.createElement(
              'td',
              {
                colSpan: store.columns.length,
                className: 'el-table__expanded-cell'
              },
              typeof props.renderExpanded === 'function' && props.renderExpanded(row, rowIndex)
            )
          )];
        })
      )
    );
  };

  _createClass(TableBody, [{
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

  return TableBody;
}(Component);

TableBody.contextTypes = {
  store: PropTypes.any,
  layout: PropTypes.any
};
export default TableBody;