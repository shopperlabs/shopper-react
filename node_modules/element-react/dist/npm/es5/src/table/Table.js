'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _TableHeader = require('./TableHeader');

var _TableHeader2 = _interopRequireDefault(_TableHeader);

var _TableBody = require('./TableBody');

var _TableBody2 = _interopRequireDefault(_TableBody);

var _TableFooter = require('./TableFooter');

var _TableFooter2 = _interopRequireDefault(_TableFooter);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// let tableIdSeed = 1;

var Table = function (_Component) {
  (0, _inherits3.default)(Table, _Component);

  function Table(props) {
    (0, _classCallCheck3.default)(this, Table);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Table.__proto__ || Object.getPrototypeOf(Table)).call(this, props));

    _this.state = {};

    // this.tableId = `el-table_${tableIdSeed++}_`;
    // this.tableId = tableIdSeed++;

    ['syncScroll'].forEach(function (fn) {
      _this[fn] = _this[fn].bind(_this);
    });
    return _this;
  }

  (0, _createClass3.default)(Table, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        table: this
      };
    }
  }, {
    key: 'syncScroll',
    value: function syncScroll() {
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
    }
  }, {
    key: 'bindRef',
    value: function bindRef(key) {
      var _this2 = this;

      return function (node) {
        _this2[key] = node;
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          store = _props.store,
          layout = _props.layout,
          props = (0, _objectWithoutProperties3.default)(_props, ['store', 'layout']);
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
          React.createElement(_TableHeader2.default, (0, _extends3.default)({}, this.props, {
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
          React.createElement(_TableBody2.default, (0, _extends3.default)({}, this.props, {
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
          React.createElement(_TableFooter2.default, (0, _extends3.default)({}, this.props, {
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
            React.createElement(_TableHeader2.default, (0, _extends3.default)({
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
            React.createElement(_TableBody2.default, (0, _extends3.default)({
              fixed: 'left'
            }, this.props, {
              style: { width: this.bodyWidth || '' }
            }))
          ),
          props.showSummary && React.createElement(
            'div',
            { className: 'el-table__fixed-footer-wrapper', ref: this.bindRef('fixedFooterWrapper') },
            React.createElement(_TableFooter2.default, (0, _extends3.default)({
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
            React.createElement(_TableHeader2.default, (0, _extends3.default)({
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
            React.createElement(_TableBody2.default, (0, _extends3.default)({
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
            React.createElement(_TableFooter2.default, (0, _extends3.default)({
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
    }
  }, {
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
          props = (0, _objectWithoutProperties3.default)(_props3, ['layout']);

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
}(_libs.Component);

Table.contextTypes = {
  store: _libs.PropTypes.any,
  layout: _libs.PropTypes.any
};
Table.childContextTypes = {
  table: _libs.PropTypes.any
};
var _default = Table;
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Table, 'Table', 'src/table/Table.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/table/Table.jsx');
}();

;