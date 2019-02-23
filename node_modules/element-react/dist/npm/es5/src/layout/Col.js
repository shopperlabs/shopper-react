'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

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

var Col = function (_Component) {
  (0, _inherits3.default)(Col, _Component);

  function Col() {
    (0, _classCallCheck3.default)(this, Col);
    return (0, _possibleConstructorReturn3.default)(this, (Col.__proto__ || Object.getPrototypeOf(Col)).apply(this, arguments));
  }

  (0, _createClass3.default)(Col, [{
    key: 'getStyle',
    value: function getStyle() {
      var style = {};

      if (this.context.gutter) {
        style.paddingLeft = this.context.gutter / 2 + 'px';
        style.paddingRight = style.paddingLeft;
      }

      return style;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var classList = [];

      ['span', 'offset', 'pull', 'push'].forEach(function (prop) {
        if (_this2.props[prop] >= 0) {
          classList.push(prop !== 'span' ? 'el-col-' + prop + '-' + _this2.props[prop] : 'el-col-' + _this2.props[prop]);
        }
      });

      ['xs', 'sm', 'md', 'lg'].forEach(function (size) {
        if ((0, _typeof3.default)(_this2.props[size]) === 'object') {
          var props = _this2.props[size];
          Object.keys(props).forEach(function (prop) {
            classList.push(prop !== 'span' ? 'el-col-' + size + '-' + prop + '-' + props[prop] : 'el-col-' + size + '-' + props[prop]);
          });
        } else if (_this2.props[size] >= 0) {
          classList.push('el-col-' + size + '-' + Number(_this2.props[size]));
        }
      });

      return _react2.default.createElement(this.props.tag, {
        className: this.className('el-col', classList),
        style: this.style(this.getStyle())
      }, this.props.children);
    }
  }]);
  return Col;
}(_libs.Component);

var _default = Col;
exports.default = _default;


Col.contextTypes = {
  gutter: _libs.PropTypes.oneOfType([_libs.PropTypes.number, _libs.PropTypes.string])
};

Col.propTypes = {
  span: _libs.PropTypes.oneOfType([_libs.PropTypes.number, _libs.PropTypes.string]),
  offset: _libs.PropTypes.oneOfType([_libs.PropTypes.number, _libs.PropTypes.string]),
  pull: _libs.PropTypes.oneOfType([_libs.PropTypes.number, _libs.PropTypes.string]),
  push: _libs.PropTypes.oneOfType([_libs.PropTypes.number, _libs.PropTypes.string]),
  xs: _libs.PropTypes.oneOfType([_libs.PropTypes.number, _libs.PropTypes.string, _libs.PropTypes.object]),
  sm: _libs.PropTypes.oneOfType([_libs.PropTypes.number, _libs.PropTypes.string, _libs.PropTypes.object]),
  md: _libs.PropTypes.oneOfType([_libs.PropTypes.number, _libs.PropTypes.string, _libs.PropTypes.object]),
  lg: _libs.PropTypes.oneOfType([_libs.PropTypes.number, _libs.PropTypes.string, _libs.PropTypes.object]),
  tag: _libs.PropTypes.string
};

Col.defaultProps = {
  span: 24,
  tag: 'div'
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Col, 'Col', 'src/layout/Col.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/layout/Col.jsx');
}();

;