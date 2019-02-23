"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = normalizeColumns;

var _react = require("react");

var React = _interopRequireWildcard(_react);

var _utils = require("./utils");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function defaultRender(row, column) {
  return (0, _utils.getValueByPath)(row, column.property);
}

var defaults = {
  default: {
    order: ''
  },
  selection: {
    width: 48,
    minWidth: 48,
    realWidth: 48,
    className: 'el-table-column--selection'
  },
  expand: {
    width: 48,
    minWidth: 48,
    realWidth: 48
  },
  index: {
    width: 48,
    minWidth: 48,
    realWidth: 48
  }
};

var forced = {
  expand: {
    sortable: false,
    resizable: false,
    className: 'el-table__expand-column'
  },
  index: {
    sortable: false
  },
  selection: {
    sortable: false,
    resizable: false
  }
};

var columnIDSeed = 1;

function normalizeColumns(columns, tableIDSeed) {
  return columns.map(function (column) {
    var _column = void 0;
    if (column.subColumns) {
      // renderHeader
      _column = Object.assign({}, column);
      _column.subColumns = normalizeColumns(column.subColumns, tableIDSeed);
    } else {
      var width = column.width,
          minWidth = column.minWidth;


      if (width !== undefined) {
        width = parseInt(width, 10);
        if (isNaN(width)) {
          width = null;
        }
      }

      if (minWidth !== undefined) {
        minWidth = parseInt(minWidth, 10);
        if (isNaN(minWidth)) {
          minWidth = 80;
        }
      } else {
        minWidth = 80;
      }

      var id = "el-table_" + tableIDSeed + "_column_" + columnIDSeed++;

      _column = Object.assign({
        id: id,
        sortable: false,
        resizable: true,
        showOverflowTooltip: false,
        align: 'left',
        filterMultiple: true
      }, column, {
        columnKey: column.columnKey || id,
        width: width,
        minWidth: minWidth,
        realWidth: width || minWidth,
        property: column.prop || column.property,
        render: column.render || defaultRender,
        align: column.align ? 'is-' + column.align : null,
        headerAlign: column.headerAlign ? 'is-' + column.headerAlign : column.align ? 'is-' + column.align : null,
        filterable: column.filters && column.filterMethod,
        filterOpened: false,
        filteredValue: column.filteredValue || null,
        filterPlacement: column.filterPlacement || 'bottom'
      }, defaults[column.type || 'default'], forced[column.type]);
    }

    return _column;
  });
}
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(defaultRender, "defaultRender", "src/table/normalizeColumns.jsx");

  __REACT_HOT_LOADER__.register(defaults, "defaults", "src/table/normalizeColumns.jsx");

  __REACT_HOT_LOADER__.register(forced, "forced", "src/table/normalizeColumns.jsx");

  __REACT_HOT_LOADER__.register(columnIDSeed, "columnIDSeed", "src/table/normalizeColumns.jsx");

  __REACT_HOT_LOADER__.register(normalizeColumns, "normalizeColumns", "src/table/normalizeColumns.jsx");
}();

;