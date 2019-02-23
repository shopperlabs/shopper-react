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

var Badge = function (_Component) {
  (0, _inherits3.default)(Badge, _Component);

  function Badge() {
    (0, _classCallCheck3.default)(this, Badge);
    return (0, _possibleConstructorReturn3.default)(this, (Badge.__proto__ || Object.getPrototypeOf(Badge)).apply(this, arguments));
  }

  (0, _createClass3.default)(Badge, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          value = _props.value,
          max = _props.max,
          isDot = _props.isDot;

      var className = this.classNames({
        'el-badge__content': true,
        'is-fixed': !!children,
        'is-dot': !!isDot
      });
      var content = void 0;

      if (isDot) {
        content = null;
      } else {
        if (typeof value === 'number' && typeof max === 'number') {
          content = max < value ? max + '+' : value;
        } else {
          content = value;
        }
      }

      return _react2.default.createElement(
        'div',
        { style: this.style(), className: this.className('el-badge') },
        children,
        _react2.default.createElement(
          'sup',
          { className: className },
          content
        )
      );
    }
  }]);
  return Badge;
}(_libs.Component);

var _default = Badge;
exports.default = _default;


Badge.propTypes = {
  value: _libs.PropTypes.oneOfType([_libs.PropTypes.number, _libs.PropTypes.string]),
  max: _libs.PropTypes.number,
  isDot: _libs.PropTypes.bool
};

Badge.defaultProps = {
  isDot: false
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Badge, 'Badge', 'src/badge/Badge.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/badge/Badge.jsx');
}();

;