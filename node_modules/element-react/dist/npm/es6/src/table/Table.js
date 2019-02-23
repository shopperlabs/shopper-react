import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import * as React from 'react';
import { Component, PropTypes } from '../../libs';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import TableFooter from './TableFooter';

// let tableIdSeed = 1;

var Table = function (_Component) {
  _inherits(Table, _Component);

  function Table(props) {
    _classCallCheck(this, Table);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.state = {};

    // this.tableId = `el-table_${tableIdSeed++}_`;
    // this.tableId = tableIdSeed++;

    ['syncScroll'].forEach(function (fn) {
      _this[fn] = _this[fn].bind(_this);
    });
    return _this;
  }

  Table.prototype.getChildContext = function getChildContext() {
    return {
      table: this
    };
  };

  Table.prototype.syncScroll = function syncScroll() {
    var headerWrapper = this.headerWrapper,
        footerWrapper = this.footerWrapper,
        bodyWrapper = this.bodyWrapper,
        fixedBodyWrapper = this.fixedBodyWrapper,
        rightFixedBodyWrapper = this.rightFixedBodyWrapper;

    if (headerWrapper) {
      headerWrapper.scrollLeft = bodyWrapper.scrollLeft;
    }
    if (footerWrapper) {
      footerWrapper.scrollLeft = bodyWrapper.scrollLeft;
    }

    if (fixedBodyWrapper) {
      fixedBodyWrapper.scrollTop = bodyWrapper.scrollTop;
    }
    if (rightFixedBodyWrapper) {
      rightFixedBodyWrapper.scrollTop = bodyWrapper.scrollTop;
    }
  };

  Table.prototype.bindRef = function bindRef(key) {
    var _this2 = this;

    return function (node) {
      _this2[key] = node;
    };
  };

  Table.prototype.render = function render() {
    var _props = this.props,
        store = _props.store,
        layout = _props.layout,
        props = _objectWithoutProperties(_props, ['store', 'layout']);

    var isHidden = this.state.isHidden;


    return React.createElement(
      'div',
      {
        style: this.style({
          height: props.height,
          maxHeight: props.maxHeight
        }),
        className: this.className('el-table', {
          'el-table--fit': props.fit,
          'el-table--striped': props.stripe,
          'el-table--border': props.border,
          'el-table--hidden': isHidden,
          'el-table--fluid-height': props.maxHeight,
          'el-table--enable-row-hover': !store.isComplex,
          'el-table--enable-row-transition': (store.data || []).length && (store.data || []).length < 100
        }),
        ref: this.bindRef('el')
      },
      props.showHeader && React.createElement(
        'div',
        { className: 'el-table__header-wrapper', ref: this.bindRef('headerWrapper') },
        React.createElement(TableHeader, _extends({}, this.props, {
          style: { width: this.bodyWidth || '' }
        }))
      ),
      React.createElement(
        'div',
        {
          style: this.bodyWrapperHeight,
          className: 'el-table__body-wrapper',
          ref: this.bindRef('bodyWrapper'),
          onScroll: this.syncScroll
        },
        React.createElement(TableBody, _extends({}, this.props, {
          style: { width: this.bodyWidth }
        })),
        (!props.data || !props.data.length) && React.createElement(
          'div',
          {
            style: { width: this.bodyWidth },
            className: 'el-table__empty-block'
          },
          React.createElement(
            'span',
            { className: 'el-table__empty-text' },
            props.emptyText
          )
        )
      ),
      props.showSummary && React.createElement(
        'div',
        {
          style: { visibility: props.data && props.data.length ? 'visible' : 'hidden' },
          className: 'el-table__footer-wrapper',
          ref: this.bindRef('footerWrapper')
        },
        React.createElement(TableFooter, _extends({}, this.props, {
          style: { width: this.bodyWidth || '' }
        }))
      ),
      !!store.fixedColumns.length && React.createElement(
        'div',
        {
          style: Object.assign({}, this.fixedHeight, {
            width: layout.fixedWidth || ''
          }),
          className: 'el-table__fixed',
          ref: this.bindRef('fixedWrapper')
        },
        props.showHeader && React.createElement(
          'div',
          { className: 'el-table__fixed-header-wrapper', ref: this.bindRef('fixedHeaderWrapper') },
          React.createElement(TableHeader, _extends({
            fixed: 'left'
          }, this.props, {
            style: { width: this.bodyWidth || '' }
          }))
        ),
        React.createElement(
          'div',
          {
            style: Object.assign({}, this.fixedBodyHeight, {
              top: layout.headerHeight || 0
            }),
            className: 'el-table__fixed-body-wrapper',
            ref: this.bindRef('fixedBodyWrapper')
          },
          React.createElement(TableBody, _extends({
            fixed: 'left'
          }, this.props, {
            style: { width: this.bodyWidth || '' }
          }))
        ),
        props.showSummary && React.createElement(
          'div',
          { className: 'el-table__fixed-footer-wrapper', ref: this.bindRef('fixedFooterWrapper') },
          React.createElement(TableFooter, _extends({
            fixed: 'left'
          }, this.props, {
            style: { width: this.bodyWidth || '' }
          }))
        )
      ),
      !!store.rightFixedColumns.length && React.createElement(
        'div',
        {
          className: 'el-table__fixed-right',
          ref: this.bindRef('rightFixedWrapper'),
          style: Object.assign({}, {
            width: layout.rightFixedWidth || '',
            right: layout.scrollY ? props.border ? layout.gutterWidth : layout.gutterWidth || 1 : ''
          }, this.fixedHeight)
        },
        props.showHeader && React.createElement(
          'div',
          { className: 'el-table__fixed-header-wrapper', ref: this.bindRef('rightFixedHeaderWrapper') },
          React.createElement(TableHeader, _extends({
            fixed: 'right'
          }, this.props, {
            style: { width: this.bodyWidth || '' }
          }))
        ),
        React.createElement(
          'div',
          {
            className: 'el-table__fixed-body-wrapper',
            ref: this.bindRef('rightFixedBodyWrapper'),
            style: Object.assign({}, {
              top: layout.headerHeight
            }, this.fixedBodyHeight)
          },
          React.createElement(TableBody, _extends({
            fixed: 'right'
          }, this.props, {
            style: { width: this.bodyWidth || '' }
          }))
        ),
        props.showSummary && React.createElement(
          'div',
          {
            className: 'el-table__fixed-footer-wrapper',
            ref: this.bindRef('rightFixedFooterWrapper'),
            style: { visibility: props.data && props.data.length ? 'visible' : 'hidden' }
          },
          React.createElement(TableFooter, _extends({
            fixed: 'right'
          }, this.props, {
            style: { width: this.bodyWidth || '' }
          }))
        )
      ),
      !!store.rightFixedColumns.length && React.createElement('div', {
        className: 'el-table__fixed-right-patch',
        style: { width: layout.scrollY ? layout.gutterWidth : '0', height: layout.headerHeight }
      }),
      React.createElement('div', { className: 'el-table__column-resize-proxy', ref: this.bindRef('resizeProxy'), style: { visibility: 'hidden' } })
    );
  };

  _createClass(Table, [{
    key: 'bodyWrapperHeight',
    get: function get() {
      var _props2 = this.props,
          layout = _props2.layout,
          height = _props2.height,
          maxHeight = _props2.maxHeight;

      var style = {};

      if (height) {
        style.height = layout.bodyHeight || '';
      } else if (maxHeight) {
        if (layout.headerHeight !== null) {
          // 非首次渲染
          style.maxHeight = maxHeight - layout.headerHeight - layout.footerHeight;
        }
      }

      return style;
    }
  }, {
    key: 'bodyWidth',
    get: function get() {
      var layout = this.props.layout;
      var bodyWidth = layout.bodyWidth,
          scrollY = layout.scrollY,
          gutterWidth = layout.gutterWidth;

      return bodyWidth ? bodyWidth - (scrollY ? gutterWidth : 0) : '';
    }
  }, {
    key: 'fixedHeight',
    get: function get() {
      var layout = this.props.layout;

      return {
        bottom: layout.scrollX ? layout.gutterWidth - 1 : 0
      };
    }
  }, {
    key: 'fixedBodyHeight',
    get: function get() {
      var _props3 = this.props,
          layout = _props3.layout,
          props = _objectWithoutProperties(_props3, ['layout']);

      var style = {};

      if (props.height) {
        style.height = layout.fixedBodyHeight || '';
      } else if (props.maxHeight) {
        if (layout.headerHeight !== null) {
          style.maxHeight = props.maxHeight - layout.headerHeight - layout.footerHeight - (layout.scrollX ? layout.gutterWidth : 0);
        }
      }

      return style;
    }
  }]);

  return Table;
}(Component);

Table.contextTypes = {
  store: PropTypes.any,
  layout: PropTypes.any
};
Table.childContextTypes = {
  table: PropTypes.any
};
export default Table;