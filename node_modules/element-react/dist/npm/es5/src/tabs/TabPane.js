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

var TabPane = function (_Component) {
  (0, _inherits3.default)(TabPane, _Component);

  function TabPane() {
    (0, _classCallCheck3.default)(this, TabPane);
    return (0, _possibleConstructorReturn3.default)(this, (TabPane.__proto__ || Object.getPrototypeOf(TabPane)).apply(this, arguments));
  }

  (0, _createClass3.default)(TabPane, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { style: this.style(), className: this.className('el-tab-pane') },
        this.props.children
      );
    }
  }]);
  return TabPane;
}(_libs.Component);

var _default = TabPane;
exports.default = _default;


TabPane.propTypes = {
  label: _libs.PropTypes.oneOfType([_libs.PropTypes.string, _libs.PropTypes.node]),
  name: _libs.PropTypes.string,
  disabled: _libs.PropTypes.bool,
  closable: _libs.PropTypes.bool
};

TabPane.defaultProps = {
  disabled: false,
  closable: false
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(TabPane, 'TabPane', 'src/tabs/TabPane.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/tabs/TabPane.jsx');
}();

;