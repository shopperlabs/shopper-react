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

var DropdownItem = function (_Component) {
  (0, _inherits3.default)(DropdownItem, _Component);

  function DropdownItem() {
    (0, _classCallCheck3.default)(this, DropdownItem);
    return (0, _possibleConstructorReturn3.default)(this, (DropdownItem.__proto__ || Object.getPrototypeOf(DropdownItem)).apply(this, arguments));
  }

  (0, _createClass3.default)(DropdownItem, [{
    key: 'handleClick',
    value: function handleClick() {
      this.context.component.handleMenuItemClick(this.props.command, this);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          disabled = _props.disabled,
          divided = _props.divided;


      return _react2.default.createElement(
        'li',
        {
          style: this.style(),
          className: this.className('el-dropdown-menu__item', {
            'is-disabled': disabled,
            'el-dropdown-menu__item--divided': divided
          }), onClick: this.handleClick.bind(this)
        },
        this.props.children
      );
    }
  }]);
  return DropdownItem;
}(_libs.Component);

var _default = DropdownItem;
exports.default = _default;


DropdownItem.contextTypes = {
  component: _libs.PropTypes.any
};

DropdownItem.propTypes = {
  command: _libs.PropTypes.string,
  disabled: _libs.PropTypes.bool,
  divided: _libs.PropTypes.bool
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(DropdownItem, 'DropdownItem', 'src/dropdown/DropdownItem.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/dropdown/DropdownItem.jsx');
}();

;