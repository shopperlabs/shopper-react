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

var ButtonGroup = function (_Component) {
  (0, _inherits3.default)(ButtonGroup, _Component);

  function ButtonGroup() {
    (0, _classCallCheck3.default)(this, ButtonGroup);
    return (0, _possibleConstructorReturn3.default)(this, (ButtonGroup.__proto__ || Object.getPrototypeOf(ButtonGroup)).apply(this, arguments));
  }

  (0, _createClass3.default)(ButtonGroup, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { style: this.style(), className: this.className('el-button-group') },
        this.props.children
      );
    }
  }]);
  return ButtonGroup;
}(_libs.Component);

var _default = ButtonGroup;
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(ButtonGroup, 'ButtonGroup', 'src/button/ButtonGroup.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/button/ButtonGroup.jsx');
}();

;