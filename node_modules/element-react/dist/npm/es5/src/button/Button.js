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

var Button = function (_Component) {
  (0, _inherits3.default)(Button, _Component);

  function Button() {
    (0, _classCallCheck3.default)(this, Button);
    return (0, _possibleConstructorReturn3.default)(this, (Button.__proto__ || Object.getPrototypeOf(Button)).apply(this, arguments));
  }

  (0, _createClass3.default)(Button, [{
    key: 'onClick',
    value: function onClick(e) {
      if (!this.props.loading) {
        this.props.onClick && this.props.onClick(e);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'button',
        { style: this.style(), className: this.className('el-button', this.props.type && 'el-button--' + this.props.type, this.props.size && 'el-button--' + this.props.size, {
            'is-disabled': this.props.disabled,
            'is-loading': this.props.loading,
            'is-plain': this.props.plain
          }), disabled: this.props.disabled, type: this.props.nativeType, onClick: this.onClick.bind(this) },
        this.props.loading && _react2.default.createElement('i', { className: 'el-icon-loading' }),
        this.props.icon && !this.props.loading && _react2.default.createElement('i', { className: 'el-icon-' + this.props.icon }),
        _react2.default.createElement(
          'span',
          null,
          this.props.children
        )
      );
    }
  }]);
  return Button;
}(_libs.Component);

var _default = Button;
exports.default = _default;


Button.propTypes = {
  onClick: _libs.PropTypes.func,
  type: _libs.PropTypes.string,
  size: _libs.PropTypes.string,
  icon: _libs.PropTypes.string,
  nativeType: _libs.PropTypes.string,
  loading: _libs.PropTypes.bool,
  disabled: _libs.PropTypes.bool,
  plain: _libs.PropTypes.bool
};

Button.defaultProps = {
  type: 'default',
  nativeType: 'button',
  loading: false,
  disabled: false,
  plain: false
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Button, 'Button', 'src/button/Button.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/button/Button.jsx');
}();

;