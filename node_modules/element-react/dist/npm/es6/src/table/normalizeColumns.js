import * as React from 'react';
import { getValueByPath } from "./utils";

function defaultRender(row, column) {
  return getValueByPath(row, column.property);
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

export default function normalizeColumns(columns, tableIDSeed) {
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