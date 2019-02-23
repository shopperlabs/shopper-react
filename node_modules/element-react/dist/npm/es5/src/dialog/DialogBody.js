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

var DialogBody = function (_Component) {
  (0, _inherits3.default)(DialogBody, _Component);

  function DialogBody() {
    (0, _classCallCheck3.default)(this, DialogBody);
    return (0, _possibleConstructorReturn3.default)(this, (DialogBody.__proto__ || Object.getPrototypeOf(DialogBody)).apply(this, arguments));
  }

  (0, _createClass3.default)(DialogBody, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { style: this.style(), className: this.className('el-dialog__body') },
        this.props.children
      );
    }
  }]);
  return DialogBody;
}(_libs.Component);

var _default = DialogBody;
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(DialogBody, 'DialogBody', 'src/dialog/DialogBody.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/dialog/DialogBody.jsx');
}();

;