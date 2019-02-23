'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _libs = require('../../libs');

var _locale = require('../locale');

var _locale2 = _interopRequireDefault(_locale);

var _TableLayout = require('./TableLayout');

var _TableLayout2 = _interopRequireDefault(_TableLayout);

var _normalizeColumns = require('./normalizeColumns');

var _normalizeColumns2 = _interopRequireDefault(_normalizeColumns);

var _utils = require('./utils');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tableIDSeed = 1;

function filterData(data, columns) {
  return columns.reduce(function (preData, column) {
    var filterable = column.filterable,
        filterMultiple = column.filterMultiple,
        filteredValue = column.filteredValue,
        filterMethod = column.filterMethod;

    if (filterable) {
      if (filterMultiple && Array.isArray(filteredValue) && filteredValue.length) {
        return preData.filter(function (_data) {
          return filteredValue.some(function (value) {
            return filterMethod(value, _data);
          });
        });
      } else if (filteredValue) {
        return preData.filter(function (_data) {
          return filterMethod(filteredValue, _data);
        });
      }
    }
    return preData;
  }, data);
}

var TableStore = function (_Component) {
  (0, _inherits3.default)(TableStore, _Component);
  (0, _createClass3.default)(TableStore, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        store: this
      };
    }
  }]);

  function TableStore(props) {
    (0, _classCallCheck3.default)(this, TableStore);

    var _this = (0, _possibleConstructorReturn3.default)(this, (TableStore.__proto__ || Object.getPrototypeOf(TableStore)).call(this, props));

    _this.state = {
      fixedColumns: null, // left fixed columns in _columns
      rightFixedColumns: null, // right fixed columns in _columns
      columnRows: null, // columns to render header
      columns: null, // contain only leaf column
      isComplex: null, // whether some column is fixed
      expandingRows: [],
      hoverRow: null,
      currentRow: null,
      selectable: null,
      selectedRows: null,
      sortOrder: null,
      sortColumn: null
    };

    ['toggleRowSelection', 'toggleAllSelection', 'clearSelection', 'setCurrentRow'].forEach(function (fn) {
      _this[fn] = _this[fn].bind(_this);
    });

    _this._isMounted = false;
    return _this;
  }

  (0, _createClass3.default)(TableStore, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.updateColumns((0, _utils.getColumns)(this.props));
      this.updateData(this.props);
      this._isMounted = true;
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      // const { data } = this.props;
      var nextColumns = (0, _utils.getColumns)(nextProps);

      if ((0, _utils.getColumns)(this.props) !== nextColumns) {
        this.updateColumns(nextColumns);
      }

      this.updateData(nextProps);
      // if (data !== nextProps.data) {
      //   this.updateData(nextProps);
      // }
    }
  }, {
    key: 'updateColumns',


    // shouldComponentUpdate(nextProps) {
    //   const propsKeys = Object.keys(this.props);
    //   const nextPropsKeys = Object.keys(nextProps);
    //
    //   if (propsKeys.length !== nextPropsKeys.length) {
    //     return true;
    //   }
    //   for (const key of propsKeys) {
    //     if (this.props[key] !== nextProps[key]) {
    //       return true;
    //     }
    //   }
    //   return false;
    // }

    value: function updateColumns(columns) {
      var _columns = (0, _normalizeColumns2.default)(columns, tableIDSeed++);

      var fixedColumns = _columns.filter(function (column) {
        return column.fixed === true || column.fixed === 'left';
      });
      var rightFixedColumns = _columns.filter(function (column) {
        return column.fixed === 'right';
      });

      var selectable = void 0;
      if (_columns[0] && _columns[0].type === 'selection') {
        selectable = _columns[0].selectable;
        if (fixedColumns.length && !_columns[0].fixed) {
          _columns[0].fixed = true;
          fixedColumns.unshift(_columns[0]);
        }
      }

      _columns = [].concat(fixedColumns, _columns.filter(function (column) {
        return !column.fixed;
      }), rightFixedColumns);

      this.setState(Object.assign(this.state || {}, {
        fixedColumns: fixedColumns,
        rightFixedColumns: rightFixedColumns,
        columnRows: (0, _utils.convertToRows)(_columns),
        columns: (0, _utils.getLeafColumns)(_columns),
        isComplex: fixedColumns.length > 0 || rightFixedColumns.length > 0,
        selectable: selectable
      }));
    }
  }, {
    key: 'updateData',
    value: function updateData(props) {
      var _props$data = props.data,
          data = _props$data === undefined ? [] : _props$data,
          defaultExpandAll = props.defaultExpandAll,
          defaultSort = props.defaultSort;
      var columns = this.state.columns;

      var filteredData = filterData(data.slice(), columns);

      var _state = this.state,
          hoverRow = _state.hoverRow,
          currentRow = _state.currentRow,
          selectedRows = _state.selectedRows,
          expandingRows = _state.expandingRows;

      hoverRow = hoverRow && data.includes(hoverRow) ? hoverRow : null;
      currentRow = currentRow && data.includes(currentRow) ? currentRow : null;

      if (this._isMounted && data !== this.props.data && !columns[0].reserveSelection) {
        selectedRows = [];
      } else {
        selectedRows = selectedRows && selectedRows.filter(function (row) {
          return data.includes(row);
        }) || [];
      }

      if (!this._isMounted) {
        expandingRows = defaultExpandAll ? data.slice() : [];
      } else {
        expandingRows = expandingRows.filter(function (row) {
          return data.includes(row);
        });
      }

      this.setState(Object.assign(this.state, {
        data: filteredData,
        filteredData: filteredData,
        hoverRow: hoverRow,
        currentRow: currentRow,
        expandingRows: expandingRows,
        selectedRows: selectedRows
      }));

      if ((!this._isMounted || data !== this.props.data) && defaultSort) {
        var prop = defaultSort.prop,
            _defaultSort$order = defaultSort.order,
            order = _defaultSort$order === undefined ? 'ascending' : _defaultSort$order;

        var sortColumn = columns.find(function (column) {
          return column.property === prop;
        });
        this.changeSortCondition(sortColumn, order, false);
      } else {
        this.changeSortCondition(null, null, false);
      }
    }
  }, {
    key: 'setHoverRow',
    value: function setHoverRow(index) {
      if (!this.state.isComplex) return;
      this.setState({
        hoverRow: index
      });
    }
  }, {
    key: 'toggleRowExpanded',
    value: function toggleRowExpanded(row, rowKey) {
      var _this2 = this;

      var expandRowKeys = this.props.expandRowKeys;
      var expandingRows = this.state.expandingRows;

      if (expandRowKeys) {
        var isRowExpanding = expandRowKeys.includes(rowKey);
        this.dispatchEvent('onExpand', row, !isRowExpanding);
        return;
      }

      expandingRows = expandingRows.slice();
      var rowIndex = expandingRows.indexOf(row);
      if (rowIndex > -1) {
        expandingRows.splice(rowIndex, 1);
      } else {
        expandingRows.push(row);
      }

      this.setState({
        expandingRows: expandingRows
      }, function () {
        _this2.dispatchEvent('onExpand', row, rowIndex === -1);
      });
    }
  }, {
    key: 'isRowExpanding',
    value: function isRowExpanding(row, rowKey) {
      var expandRowKeys = this.props.expandRowKeys;
      var expandingRows = this.state.expandingRows;


      if (expandRowKeys) {
        return expandRowKeys.includes(rowKey);
      }
      return expandingRows.includes(row);
    }
  }, {
    key: 'setCurrentRow',
    value: function setCurrentRow(row) {
      var _this3 = this;

      var _props = this.props,
          currentRowKey = _props.currentRowKey,
          rowKey = _props.rowKey;

      if (currentRowKey && !Array.isArray(currentRowKey)) {
        this.dispatchEvent('onCurrentChange', (0, _utils.getRowIdentity)(row, rowKey), currentRowKey);
        return;
      }

      var oldRow = this.state.currentRow;

      this.setState({
        currentRow: row
      }, function () {
        _this3.dispatchEvent('onCurrentChange', row, oldRow);
      });
    }
  }, {
    key: 'toggleRowSelection',
    value: function toggleRowSelection(row, isSelected) {
      var _this4 = this;

      var _props2 = this.props,
          currentRowKey = _props2.currentRowKey,
          rowKey = _props2.rowKey;


      if (Array.isArray(currentRowKey)) {
        var toggledRowKey = (0, _utils.getRowIdentity)(row, rowKey);
        var _rowIndex = currentRowKey.indexOf(toggledRowKey);
        var newCurrentRowKey = currentRowKey.slice();

        if (isSelected !== undefined) {
          if (isSelected && _rowIndex === -1) {
            newCurrentRowKey.push(toggledRowKey);
          } else if (!isSelected && _rowIndex !== -1) {
            newCurrentRowKey.splice(_rowIndex, 1);
          }
        } else {
          _rowIndex === -1 ? newCurrentRowKey.push(toggledRowKey) : newCurrentRowKey.splice(_rowIndex, 1);
        }

        this.dispatchEvent('onSelect', newCurrentRowKey, row);
        this.dispatchEvent('onSelectChange', newCurrentRowKey);
        return;
      }

      var selectedRows = this.state.selectedRows.slice();
      var rowIndex = selectedRows.indexOf(row);

      if (isSelected !== undefined) {
        if (isSelected) {
          rowIndex === -1 && selectedRows.push(row);
        } else {
          rowIndex !== -1 && selectedRows.splice(rowIndex, 1);
        }
      } else {
        rowIndex === -1 ? selectedRows.push(row) : selectedRows.splice(rowIndex, 1);
      }

      this.setState({
        selectedRows: selectedRows
      }, function () {
        _this4.dispatchEvent('onSelect', selectedRows, row);
        _this4.dispatchEvent('onSelectChange', selectedRows);
      });
    }
  }, {
    key: 'toggleAllSelection',
    value: function toggleAllSelection() {
      var _this5 = this;

      var _props3 = this.props,
          currentRowKey = _props3.currentRowKey,
          rowKey = _props3.rowKey;
      var _state2 = this.state,
          data = _state2.data,
          selectedRows = _state2.selectedRows,
          selectable = _state2.selectable;


      var allSelectableRows = selectable ? data.filter(function (data, index) {
        return selectable(data, index);
      }) : data.slice();

      if (Array.isArray(currentRowKey)) {
        var newCurrentRowKey = this.isAllSelected ? [] : allSelectableRows.map(function (row) {
          return (0, _utils.getRowIdentity)(row, rowKey);
        });
        this.dispatchEvent('onSelectAll', newCurrentRowKey);
        this.dispatchEvent('onSelectChange', newCurrentRowKey);
        return;
      }

      if (this.isAllSelected) {
        selectedRows = [];
      } else {
        selectedRows = allSelectableRows;
      }

      this.setState({
        selectedRows: selectedRows
      }, function () {
        _this5.dispatchEvent('onSelectAll', selectedRows);
        _this5.dispatchEvent('onSelectChange', selectedRows);
      });
    }
  }, {
    key: 'clearSelection',
    value: function clearSelection() {
      var currentRowKey = this.props.currentRowKey;

      if (Array.isArray(currentRowKey)) return;

      this.setState({
        selectedRows: []
      });
    }
  }, {
    key: 'isRowSelected',
    value: function isRowSelected(row, rowKey) {
      var currentRowKey = this.props.currentRowKey;
      var selectedRows = this.state.selectedRows;


      if (Array.isArray(currentRowKey)) {
        return currentRowKey.includes(rowKey);
      }

      return selectedRows.includes(row);
    }
  }, {
    key: 'changeSortCondition',
    value: function changeSortCondition(column, order) {
      var _this6 = this;

      var shouldDispatchEvent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

      if (!column) {
        ;

        var _state3 = this.state;
        column = _state3.sortColumn;
        order = _state3.sortOrder;
      }var data = this.state.filteredData.slice();

      if (!column) {
        this.setState({
          data: data
        });
        return;
      }

      var _column = column,
          sortMethod = _column.sortMethod,
          property = _column.property;

      var sortedData = void 0;
      if (!order) {
        sortedData = data;
      } else {
        var flag = order === 'ascending' ? 1 : -1;
        if (sortMethod) {
          sortedData = data.sort(function (a, b) {
            return sortMethod(a, b) ? flag : -flag;
          });
        } else {
          sortedData = data.sort(function (a, b) {
            var aVal = (0, _utils.getValueByPath)(a, property);
            var bVal = (0, _utils.getValueByPath)(b, property);
            return aVal === bVal ? 0 : aVal > bVal ? flag : -flag;
          });
        }
      }

      this.setState({
        sortColumn: column,
        sortOrder: order,
        data: sortedData
      }, function () {
        shouldDispatchEvent && _this6.dispatchEvent('onSortChange', column && order ? { column: column, prop: column.property, order: order } : { column: null, prop: null, order: null });
      });
    }
  }, {
    key: 'toggleFilterOpened',
    value: function toggleFilterOpened(column) {
      column.filterOpened = !column.filterOpened;
      this.forceUpdate();
    }
  }, {
    key: 'changeFilteredValue',
    value: function changeFilteredValue(column, value) {
      var _this7 = this;

      column.filteredValue = value;
      var filteredData = filterData(this.props.data.slice(), this.state.columns);
      this.setState(Object.assign(this.state, {
        filteredData: filteredData
      }), function () {
        _this7.dispatchEvent('onFilterChange', (0, _defineProperty3.default)({}, column.columnKey, value));
      });
      this.changeSortCondition(null, null, false);
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
    key: 'render',
    value: function render() {
      var renderExpanded = (this.state.columns.find(function (column) {
        return column.type === 'expand';
      }) || {}).expandPannel;
      return React.createElement(_TableLayout2.default, (0, _extends3.default)({}, this.props, {
        renderExpanded: renderExpanded,
        store: this.state
      }));
    }
  }, {
    key: 'isAllSelected',
    get: function get() {
      var _props4 = this.props,
          currentRowKey = _props4.currentRowKey,
          rowKey = _props4.rowKey;
      var _state4 = this.state,
          selectedRows = _state4.selectedRows,
          data = _state4.data,
          selectable = _state4.selectable;

      var selectableData = selectable ? data.filter(function (row, index) {
        return selectable(row, index);
      }) : data;

      if (!selectableData.length) {
        return false;
      }

      if (Array.isArray(currentRowKey)) {
        return selectableData.every(function (data) {
          return currentRowKey.includes((0, _utils.getRowIdentity)(data, rowKey));
        });
      }

      return selectedRows && selectedRows.length === selectableData.length;
    }
  }]);
  return TableStore;
}(_libs.Component);

TableStore.propTypes = {
  style: _libs.PropTypes.object,
  columns: _libs.PropTypes.arrayOf(_libs.PropTypes.object),
  data: _libs.PropTypes.arrayOf(_libs.PropTypes.object),
  height: _libs.PropTypes.oneOfType([_libs.PropTypes.string, _libs.PropTypes.number]),
  maxHeight: _libs.PropTypes.oneOfType([_libs.PropTypes.string, _libs.PropTypes.number]),
  stripe: _libs.PropTypes.bool,
  border: _libs.PropTypes.bool,
  fit: _libs.PropTypes.bool,
  showHeader: _libs.PropTypes.bool,
  highlightCurrentRow: _libs.PropTypes.bool,
  currentRowKey: _libs.PropTypes.oneOfType([_libs.PropTypes.string, _libs.PropTypes.number]),
  rowClassName: _libs.PropTypes.func,
  rowStyle: _libs.PropTypes.func,
  rowKey: _libs.PropTypes.func,
  emptyText: _libs.PropTypes.string,
  defaultExpandAll: _libs.PropTypes.bool,
  expandRowKeys: _libs.PropTypes.arrayOf(_libs.PropTypes.oneOfType([_libs.PropTypes.string, _libs.PropTypes.number])),
  defaultSort: _libs.PropTypes.shape({ prop: _libs.PropTypes.string, order: _libs.PropTypes.oneOf(['ascending', 'descending']) }),
  tooltipEffect: _libs.PropTypes.oneOf(['dark', 'light']),
  showSummary: _libs.PropTypes.bool,
  sumText: _libs.PropTypes.string,
  summaryMethod: _libs.PropTypes.func,
  onSelect: _libs.PropTypes.func,
  onSelectAll: _libs.PropTypes.func,
  onSelectChange: _libs.PropTypes.func
};
TableStore.defaultProps = {
  data: [],
  showHeader: true,
  stripe: false,
  fit: true,
  emptyText: _locale2.default.t('el.table.emptyText'),
  defaultExpandAll: false,
  highlightCurrentRow: false,
  showSummary: false,
  sumText: _locale2.default.t('el.table.sumText')
};
TableStore.childContextTypes = {
  store: _libs.PropTypes.any
};
var _default = TableStore;
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(tableIDSeed, 'tableIDSeed', 'src/table/TableStore.jsx');

  __REACT_HOT_LOADER__.register(filterData, 'filterData', 'src/table/TableStore.jsx');

  __REACT_HOT_LOADER__.register(TableStore, 'TableStore', 'src/table/TableStore.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/table/TableStore.jsx');
}();

;