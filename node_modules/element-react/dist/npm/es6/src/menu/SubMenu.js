import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import ReactDOM from 'react-dom';
import { PropTypes, View, Transition, CollapseTransition } from '../../libs';

import MixinComponent from './MixinComponent';

var SubMenu = function (_MixinComponent) {
  _inherits(SubMenu, _MixinComponent);

  function SubMenu(props) {
    _classCallCheck(this, SubMenu);

    var _this = _possibleConstructorReturn(this, _MixinComponent.call(this, props));

    _this.instanceType = 'SubMenu';

    _this.state = {
      active: false
    };
    return _this;
  }

  SubMenu.prototype.getChildContext = function getChildContext() {
    return {
      component: this
    };
  };

  SubMenu.prototype.componentDidMount = function componentDidMount() {
    this.rootMenu().state.submenus[this.props.index] = this;
    this.initEvents();
  };

  SubMenu.prototype.onItemSelect = function onItemSelect(index, indexPath) {
    this.setState({
      active: indexPath.indexOf(this.props.index) !== -1
    });
  };

  SubMenu.prototype.handleClick = function handleClick() {
    this.rootMenu().handleSubmenuClick(this.props.index, this.indexPath());
  };

  SubMenu.prototype.handleMouseenter = function handleMouseenter() {
    var _this2 = this;

    clearTimeout(this.timeout);

    this.timeout = setTimeout(function () {
      _this2.rootMenu().openMenu(_this2.props.index, _this2.indexPath());
    }, 300);
  };

  SubMenu.prototype.handleMouseleave = function handleMouseleave() {
    var _this3 = this;

    clearTimeout(this.timeout);

    this.timeout = setTimeout(function () {
      _this3.rootMenu().closeMenu(_this3.props.index, _this3.indexPath());
    }, 300);
  };

  SubMenu.prototype.initEvents = function initEvents() {
    if (this.rootMenu().props.mode === 'horizontal' && this.rootMenu().props.menuTrigger === 'hover') {
      var triggerElm = ReactDOM.findDOMNode(this);

      triggerElm.addEventListener('mouseenter', this.handleMouseenter.bind(this));
      triggerElm.addEventListener('mouseleave', this.handleMouseleave.bind(this));
    } else {
      var _triggerElm = this.refs['submenu-title'];

      _triggerElm.addEventListener('click', this.handleClick.bind(this));
    }
  };

  SubMenu.prototype.opened = function opened() {
    return this.rootMenu().state.openedMenus.indexOf(this.props.index) !== -1;
  };

  SubMenu.prototype.render = function render() {
    return React.createElement(
      'li',
      { style: this.style(), className: this.className('el-submenu', {
          'is-active': this.state.active,
          'is-opened': this.opened()
        }) },
      React.createElement(
        'div',
        { ref: 'submenu-title', className: 'el-submenu__title' },
        this.props.title,
        React.createElement('i', { className: this.classNames('el-submenu__icon-arrow', {
            'el-icon-arrow-down': this.rootMenu().props.mode === 'vertical',
            'el-icon-caret-bottom': this.rootMenu().props.mode === 'horizontal'
          }) })
      ),
      this.rootMenu().props.mode === 'horizontal' ? React.createElement(
        Transition,
        { name: 'el-zoom-in-top' },
        React.createElement(
          View,
          { show: this.opened() },
          React.createElement(
            'ul',
            { className: 'el-menu' },
            this.props.children
          )
        )
      ) : React.createElement(
        CollapseTransition,
        { isShow: this.opened() },
        React.createElement(
          'ul',
          { className: 'el-menu' },
          this.props.children
        )
      )
    );
  };

  return SubMenu;
}(MixinComponent);

export default SubMenu;


SubMenu.childContextTypes = {
  component: PropTypes.any
};

SubMenu.propTypes = {
  index: PropTypes.string.isRequired
};