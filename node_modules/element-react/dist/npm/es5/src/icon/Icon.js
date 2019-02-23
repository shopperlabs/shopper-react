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

var Icon = function (_Component) {
  (0, _inherits3.default)(Icon, _Component);

  function Icon() {
    (0, _classCallCheck3.default)(this, Icon);
    return (0, _possibleConstructorReturn3.default)(this, (Icon.__proto__ || Object.getPrototypeOf(Icon)).apply(this, arguments));
  }

  (0, _createClass3.default)(Icon, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement('i', { style: this.style(), className: this.className('el-icon-' + this.props.name) });
    }
  }]);
  return Icon;
}(_libs.Component);

var _default = Icon;
exports.default = _default;


Icon.propTypes = {
  name: _libs.PropTypes.string
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Icon, 'Icon', 'src/icon/Icon.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/icon/Icon.jsx');
}();

;