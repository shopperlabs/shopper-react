import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import { Component, PropTypes } from '../../libs';

var Menu = function (_Component) {
  _inherits(Menu, _Component);

  function Menu(props) {
    _classCallCheck(this, Menu);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.instanceType = 'Menu';

    _this.state = {
      activeIndex: props.defaultActive,
      openedMenus: props.defaultOpeneds ? props.defaultOpeneds.slice(0) : [],
      menuItems: {},
      submenus: {}
    };
    return _this;
  }

  Menu.prototype.getChildContext = function getChildContext() {
    return {
      component: this
    };
  };

  Menu.prototype.componentDidMount = function componentDidMount() {
    this.openActiveItemMenus();
  };

  Menu.prototype.componentWillReceiveProps = function componentWillReceiveProps(props) {
    if (props.defaultActive != this.props.defaultActive || props.defaultActive != this.state.activeIndex) {
      this.defaultActiveChanged(props.defaultActive);
    }

    if (props.defaultOpeneds != this.props.defaultOpeneds) {
      this.defaultOpenedsChanged(props.defaultOpeneds);
    }
  };

  Menu.prototype.openMenu = function openMenu(index, indexPath) {
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
  };

  Menu.prototype.closeMenu = function closeMenu(index) {
    var openedMenus = this.state.openedMenus;


    openedMenus.splice(openedMenus.indexOf(index), 1);

    this.setState({ openedMenus: openedMenus });
  };

  Menu.prototype.handleSubmenuClick = function handleSubmenuClick(index, indexPath) {
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
  };

  Menu.prototype.handleSelect = function handleSelect(index, indexPath, instance) {
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
  };

  Menu.prototype.openActiveItemMenus = function openActiveItemMenus() {
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
  };

  Menu.prototype.defaultActiveChanged = function defaultActiveChanged(value) {
    var _this4 = this;

    var menuItems = this.state.menuItems;


    this.setState({ activeIndex: value }, function () {
      if (!menuItems[value]) return;

      var menuItem = menuItems[value];
      var indexPath = menuItem.indexPath();

      _this4.handleSelect(value, indexPath, menuItem);
    });
  };

  Menu.prototype.defaultOpenedsChanged = function defaultOpenedsChanged(value) {
    this.setState({
      openedMenus: value
    });
  };

  Menu.prototype.render = function render() {
    return React.createElement(
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
  };

  return Menu;
}(Component);

export default Menu;


Menu.childContextTypes = {
  component: PropTypes.any
};

Menu.propTypes = {
  mode: PropTypes.string,
  defaultActive: PropTypes.string,
  defaultOpeneds: PropTypes.arrayOf(PropTypes.any),
  theme: PropTypes.string,
  uniqueOpened: PropTypes.bool,
  menuTrigger: PropTypes.string,
  onSelect: PropTypes.func,
  onOpen: PropTypes.func,
  onClose: PropTypes.func
};

Menu.defaultProps = {
  mode: 'vertical',
  theme: 'light',
  menuTrigger: 'hover'
};