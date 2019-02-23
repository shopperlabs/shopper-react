import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import { PropTypes } from '../../libs';

import MixinComponent from './MixinComponent';

var MenuItemGroup = function (_MixinComponent) {
  _inherits(MenuItemGroup, _MixinComponent);

  function MenuItemGroup(props) {
    _classCallCheck(this, MenuItemGroup);

    var _this = _possibleConstructorReturn(this, _MixinComponent.call(this, props));

    _this.instanceType = 'MenuItemGroup';

    _this.state = {
      paddingLeft: 20
    };
    return _this;
  }

  MenuItemGroup.prototype.componentDidMount = function componentDidMount() {
    this.initPadding();
  };

  MenuItemGroup.prototype.initPadding = function initPadding() {
    var level = 0,
        parent = this.parent(),
        component = parent.instanceType;

    while (component !== 'Menu') {
      if (component === 'SubMenu') {
        level++;
      }

      parent = parent.parent();
      component = parent.instanceType;
    }

    this.setState({
      paddingLeft: this.state.paddingLeft + level * 10
    });
  };

  MenuItemGroup.prototype.render = function render() {
    return React.createElement(
      'li',
      { style: this.style(), className: this.className('el-menu-item-group') },
      React.createElement(
        'div',
        { className: 'el-menu-item-group__title', style: {
            paddingLeft: this.state.paddingLeft
          } },
        this.props.title
      ),
      React.createElement(
        'ul',
        null,
        this.props.children
      )
    );
  };

  return MenuItemGroup;
}(MixinComponent);

export default MenuItemGroup;


MenuItemGroup.propTypes = {
  title: PropTypes.string.isRequired
};