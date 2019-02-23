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

var _react2 = _interopRequireDefault(_react);

var _libs = require('../../libs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BreadcrumbItem = function (_Component) {
  (0, _inherits3.default)(BreadcrumbItem, _Component);

  function BreadcrumbItem() {
    (0, _classCallCheck3.default)(this, BreadcrumbItem);
    return (0, _possibleConstructorReturn3.default)(this, (BreadcrumbItem.__proto__ || Object.getPrototypeOf(BreadcrumbItem)).apply(this, arguments));
  }

  (0, _createClass3.default)(BreadcrumbItem, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'span',
        { style: this.style(), className: this.className('el-breadcrumb__item') },
        _react2.default.createElement(
          'span',
          { className: 'el-breadcrumb__item__inner', ref: 'link' },
          this.props.children
        ),
        _react2.default.createElement(
          'span',
          { className: 'el-breadcrumb__separator' },
          this.context.separator
        )
      );
    }
  }]);
  return BreadcrumbItem;
}(_libs.Component);

var _default = BreadcrumbItem;
exports.default = _default;


BreadcrumbItem.contextTypes = {
  separator: _libs.PropTypes.string
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(BreadcrumbItem, 'BreadcrumbItem', 'src/breadcrumb/BreadcrumbItem.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/breadcrumb/BreadcrumbItem.jsx');
}();

;