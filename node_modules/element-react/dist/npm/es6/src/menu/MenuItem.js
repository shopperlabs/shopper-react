import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import { PropTypes } from '../../libs';

import MixinComponent from './MixinComponent';

var MenuItem = function (_MixinComponent) {
  _inherits(MenuItem, _MixinComponent);

  function MenuItem(props) {
    _classCallCheck(this, MenuItem);

    var _this = _possibleConstructorReturn(this, _MixinComponent.call(this, props));

    _this.instanceType = 'MenuItem';
    return _this;
  }

  MenuItem.prototype.componentDidMount = function componentDidMount() {
    this.rootMenu().state.menuItems[this.props.index] = this;
  };

  MenuItem.prototype.handleClick = function handleClick() {
    this.rootMenu().handleSelect(this.props.index, this.indexPath(), this);
  };

  MenuItem.prototype.active = function active() {
    return this.props.index === this.rootMenu().state.activeIndex;
  };

  MenuItem.prototype.render = function render() {
    return React.createElement(
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
  };

  return MenuItem;
}(MixinComponent);

export default MenuItem;


MenuItem.propTypes = {
  index: PropTypes.string.isRequired,
  disabled: PropTypes.bool
};