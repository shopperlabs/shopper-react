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

var Menu = function (_Component) {
  (0, _inherits3.default)(Menu, _Component);

  function Menu(props) {
    (0, _classCallCheck3.default)(this, Menu);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Menu.__proto__ || Object.getPrototypeOf(Menu)).call(this, props));

    _this.instanceType = 'Menu';

    _this.state = {
      activeIndex: props.defaultActive,
      openedMenus: props.defaultOpeneds ? props.defaultOpeneds.slice(0) : [],
      menuItems: {},
      submenus: {}
    };
    return _this;
  }

  (0, _createClass3.default)(Menu, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        component: this
      };
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.openActiveItemMenus();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      if (props.defaultActive != this.props.defaultActive || props.defaultActive != this.state.activeIndex) {
        this.defaultActiveChanged(props.defaultActive);
      }

      if (props.defaultOpeneds != this.props.defaultOpeneds) {
        this.defaultOpenedsChanged(props.defaultOpeneds);
      }
    }
  }, {
    key: 'openMenu',
    value: function openMenu(index, indexPath) {
      var openedMenus = this.state.openedMenus;


      if (openedMenus.indexOf(index) !== -1) return;
      // 将不在该菜单路径下的其余菜单收起
      if (this.props.uniqueOpened) {
        openedMenus = openedMenus.filter(function (index) {
          return indexPath.indexOf(index) !== -1;
        });
      }

      openedMenus.push(index);

      this.setState({ openedMenus: openedMenus });
    }
  }, {
    key: 'closeMenu',
    value: function closeMenu(index) {
      var openedMenus = this.state.openedMenus;


      openedMenus.splice(openedMenus.indexOf(index), 1);

      this.setState({ openedMenus: openedMenus });
    }
  }, {
    key: 'handleSubmenuClick',
    value: function handleSubmenuClick(index, indexPath) {
      var isOpened = this.state.openedMenus.indexOf(index) !== -1;

      if (isOpened) {
        this.closeMenu(index);

        if (this.props.onClose) {
          this.props.onClose(index, indexPath);
        }
      } else {
        this.openMenu(index, indexPath);

        if (this.props.onOpen) {
          this.props.onOpen(index, indexPath);
        }
      }
    }
  }, {
    key: 'handleSelect',
    value: function handleSelect(index, indexPath, instance) {
      var _this2 = this;

      var _state = this.state,
          activeIndex = _state.activeIndex,
          openedMenus = _state.openedMenus,
          submenus = _state.submenus;


      activeIndex = index;

      if (this.props.onSelect) {
        this.props.onSelect(index, indexPath, instance);
      }

      if (this.props.mode === 'horizontal') {
        for (var key in submenus) {
          submenus[key].onItemSelect(index, indexPath);
        }

        openedMenus = [];
      }

      this.setState({ activeIndex: activeIndex, openedMenus: openedMenus }, function () {
        if (_this2.props.mode === 'vertical') {
          _this2.openActiveItemMenus();
        }
      });
    }
  }, {
    key: 'openActiveItemMenus',
    value: function openActiveItemMenus() {
      var _this3 = this;

      var _state2 = this.state,
          activeIndex = _state2.activeIndex,
          menuItems = _state2.menuItems,
          submenus = _state2.submenus;


      if (!menuItems[activeIndex]) return;
      if (activeIndex && this.props.mode === 'vertical') {
        var indexPath = menuItems[activeIndex].indexPath();
        // 展开该菜单项的路径上所有子菜单
        indexPath.forEach(function (index) {
          var submenu = submenus[index];

          submenu && _this3.openMenu(index, submenu.indexPath());
        });
      }
    }
  }, {
    key: 'defaultActiveChanged',
    value: function defaultActiveChanged(value) {
      var _this4 = this;

      var menuItems = this.state.menuItems;


      this.setState({ activeIndex: value }, function () {
        if (!menuItems[value]) return;

        var menuItem = menuItems[value];
        var indexPath = menuItem.indexPath();

        _this4.handleSelect(value, indexPath, menuItem);
      });
    }
  }, {
    key: 'defaultOpenedsChanged',
    value: function defaultOpenedsChanged(value) {
      this.setState({
        openedMenus: value
      });
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'ul',
        {
          style: this.style(),
          className: this.className("el-menu", {
            'el-menu--horizontal': this.props.mode === 'horizontal',
            'el-menu--dark': this.props.theme === 'dark'
          })
        },
        this.props.children
      );
    }
  }]);
  return Menu;
}(_libs.Component);

var _default = Menu;
exports.default = _default;


Menu.childContextTypes = {
  component: _libs.PropTypes.any
};

Menu.propTypes = {
  mode: _libs.PropTypes.string,
  defaultActive: _libs.PropTypes.string,
  defaultOpeneds: _libs.PropTypes.arrayOf(_libs.PropTypes.any),
  theme: _libs.PropTypes.string,
  uniqueOpened: _libs.PropTypes.bool,
  menuTrigger: _libs.PropTypes.string,
  onSelect: _libs.PropTypes.func,
  onOpen: _libs.PropTypes.func,
  onClose: _libs.PropTypes.func
};

Menu.defaultProps = {
  mode: 'vertical',
  theme: 'light',
  menuTrigger: 'hover'
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Menu, 'Menu', 'src/menu/Menu.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/menu/Menu.jsx');
}();

;