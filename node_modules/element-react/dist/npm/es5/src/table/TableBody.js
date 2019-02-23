'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

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

var TableBody = function (_Component) {
  (0, _inherits3.default)(TableBody, _Component);

  function TableBody(props) {
    (0, _classCallCheck3.default)(this, TableBody);

    var _this = (0, _possibleConstructorReturn3.default)(this, (TableBody.__proto__ || Object.getPrototypeOf(TableBody)).call(this, props));

    ['handleMouseLeave'].forEach(function (fn) {
      _this[fn] = _this[fn].bind(_this);
    });
    return _this;
  }

  (0, _createClass3.default)(TableBody, [{
    key: 'handleMouseEnter',
    value: function handleMouseEnter(index) {
      this.context.store.setHoverRow(index);
    }
  }, {
    key: 'handleMouseLeave',
    value: function handleMouseLeave() {
      this.context.store.setHoverRow(null);
    }
  }, {
    key: 'handleCellMouseEnter',
    value: function handleCellMouseEnter(row, column, event) {
      this.dispatchEvent('onCellMouseEnter', row, column, event.currentTarget, event);
    }
  }, {
    key: 'handleCellMouseLeave',
    value: function handleCellMouseLeave(row, column, event) {
      this.dispatchEvent('onCellMouseLeave', row, column, event.currentTarget, event);
    }
  }, {
    key: 'handleCellClick',
    value: function handleCellClick(row, column, event) {
      this.dispatchEvent('onCellClick', row, column, event.currentTarget, event);
      this.dispatchEvent('onRowClick', row, event, column);
    }
  }, {
    key: 'handleCellDbClick',
    value: function handleCellDbClick(row, column, event) {
      this.dispatchEvent('onCellDbClick', row, column, event.currentTarget, event);
      this.dispatchEvent('onRowDbClick', row, column);
    }
  }, {
    key: 'handleRowContextMenu',
    value: function handleRowContextMenu(row, event) {
      this.dispatchEvent('onRowContextMenu', row, event);
    }
  }, {
    key: 'dispatchEvent',
    value: function dispatchEvent(name) {
      var fn = this.props[name];

      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      fn && fn.apply(undefined, args);
    }
  }, {
    key: 'isColumnHidden',
    value: function isColumnHidden(index) {
      var _props = this.props,
          store = _props.store,
          layout = _props.layout,
          props = (0, _objectWithoutProperties3.default)(_props, ['store', 'layout']);

      if (props.fixed === true || props.fixed === 'left') {
        return index >= this.leftFixedCount;
      } else if (props.fixed === 'right') {
        return index < this.columnsCount - this.rightFixedCount;
      } else {
        return index < this.leftFixedCount || index >= this.columnsCount - this.rightFixedCount;
      }
    }
  }, {
    key: 'getRowStyle',
    value: function getRowStyle(row, index) {
      var rowStyle = this.props.rowStyle;

      if (typeof rowStyle === 'function') {
        return rowStyle.call(null, row, index);
      }

      return rowStyle;
    }
  }, {
    key: 'getKeyOfRow',
    value: function getKeyOfRow(row, index) {
      var rowKey = this.props.rowKey;

      if (rowKey) {
        return (0, _utils.getRowIdentity)(row, rowKey);
      }

      return index;
    }

    // getRowClass(row, index) {
    //   const { rowClassName, stripe } = this.props;
    //
    // }

  }, {
    key: 'handleExpandClick',
    value: function handleExpandClick(row, rowKey) {
      this.context.store.toggleRowExpanded(row, rowKey);
    }
  }, {
    key: 'handleClick',
    value: function handleClick(row) {
      this.context.store.setCurrentRow(row);
    }
  }, {
    key: 'renderCell',
    value: function renderCell(row, column, index, rowKey) {
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
        return React.createElement(_checkbox2.default, {
          checked: isSelected,
          disabled: selectable && !selectable(row, index),
          onChange: function onChange() {
            _this2.context.store.toggleRowSelection(row, !isSelected);
          }
        });
      }

      return column.render(row, column, index);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props2 = this.props,
          store = _props2.store,
          layout = _props2.layout,
          props = (0, _objectWithoutProperties3.default)(_props2, ['store', 'layout']);

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
  return TableBody;
}(_libs.Component);

TableBody.contextTypes = {
  store: _libs.PropTypes.any,
  layout: _libs.PropTypes.any
};
var _default = TableBody;
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(TableBody, 'TableBody', 'src/table/TableBody.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/table/TableBody.jsx');
}();

;