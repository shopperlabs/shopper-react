import * as React from 'react';


var _document = document;

var scrollBarWidth = void 0;

export function getScrollBarWidth() {
  if (scrollBarWidth !== undefined) return scrollBarWidth;
  var dom = _document.createElement('div');
  var body = _document.body || dom;

  dom.style.visibility = 'hidden';
  dom.style.width = '100px';
  dom.style.position = 'absolute';
  dom.style.top = '-9999px';
  dom.style.overflow = 'scroll';

  body.appendChild(dom);

  var totalWidth = dom.offsetWidth;
  var widthWithoutScroll = dom.clientWidth;

  body.removeChild(dom);

  return totalWidth - widthWithoutScroll;
}

export function getValueByPath(data, path) {
  if (typeof path !== 'string') return null;
  return path.split('.').reduce(function (pre, cur) {
    return (pre || {})[cur];
  }, data);
}

export function getRowIdentity(row, rowKey) {
  if (typeof rowKey === 'string') {
    return getValueByPath(row, rowKey);
  } else if (typeof rowKey === 'function') {
    return rowKey(row);
  }
}

export function getLeafColumns(columns) {
  var result = [];
  columns.forEach(function (column) {
    if (column.subColumns) {
      result.push.apply(result, getLeafColumns(column.subColumns));
    } else {
      result.push(column);
    }
  });
  return result;
}

function convertChildrenToColumns(children) {
  return React.Children.map(children, function (child) {
    if (child.type.typeName !== 'TableColumn') {
      console.warn('Table component\'s children must be TableColumn, but received ' + child.type);
      return {};
    }

    var column = Object.assign({}, child.props);
    if (column.children) {
      column.subColumns = convertChildrenToColumns(column.children);
      delete column.children;
    }
    return column;
  });
}

export function getColumns(props) {
  return props.children ? convertChildrenToColumns(props.children) : props.columns || [];
}

export function convertToRows(columns) {
  var maxLevel = 1;

  function traverse(column, parent) {
    if (parent) {
      column.level = parent.level + 1;
      if (maxLevel < column.level) {
        maxLevel = column.level;
      }
    } else {
      column.level = 1;
    }

    if (column.subColumns) {
      var colSpan = 0;
      column.subColumns.forEach(function (subColumn) {
        traverse(subColumn, column);
        colSpan += subColumn.colSpan;
      });
      column.colSpan = colSpan;
    } else {
      column.colSpan = 1;
    }
  }

  columns.forEach(function (column) {
    traverse(column);
  });

  var rows = [];
  for (var i = 0; i < maxLevel; i++) {
    rows.push([]);
  }

  var allColumns = [];
  var queue = columns.slice();
  for (var _i = 0; queue[_i]; _i++) {
    allColumns.push(queue[_i]);
    if (queue[_i].subColumns) queue.push.apply(queue, queue[_i].subColumns);
  }

  allColumns.forEach(function (column) {
    if (!column.subColumns) {
      column.rowSpan = maxLevel - column.level + 1;
    } else {
      column.rowSpan = 1;
    }
    rows[column.level - 1].push(column);
  });
  return rows;
}