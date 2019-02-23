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

var _MixinComponent2 = require('./MixinComponent');

var _MixinComponent3 = _interopRequireDefault(_MixinComponent2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MenuItem = function (_MixinComponent) {
  (0, _inherits3.default)(MenuItem, _MixinComponent);

  function MenuItem(props) {
    (0, _classCallCheck3.default)(this, MenuItem);

    var _this = (0, _possibleConstructorReturn3.default)(this, (MenuItem.__proto__ || Object.getPrototypeOf(MenuItem)).call(this, props));

    _this.instanceType = 'MenuItem';
    return _this;
  }

  (0, _createClass3.default)(MenuItem, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.rootMenu().state.menuItems[this.props.index] = this;
    }
  }, {
    key: 'handleClick',
    value: function handleClick() {
      this.rootMenu().handleSelect(this.props.index, this.indexPath(), this);
    }
  }, {
    key: 'active',
    value: function active() {
      return this.props.index === this.rootMenu().state.activeIndex;
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'li',
        {
          style: this.style(),
          className: this.className("el-menu-item", {
            'is-active': this.active(),
            'is-disabled': this.props.disabled
          }),
          onClick: this.handleClick.bind(this)
        },
        this.props.children
      );
    }
  }]);
  return MenuItem;
}(_MixinComponent3.default);

var _default = MenuItem;
exports.default = _default;


MenuItem.propTypes = {
  index: _libs.PropTypes.string.isRequired,
  disabled: _libs.PropTypes.bool
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(MenuItem, 'MenuItem', 'src/menu/MenuItem.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/menu/MenuItem.jsx');
}();

;