import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import { Component, PropTypes } from '../../libs';

var DropdownItem = function (_Component) {
  _inherits(DropdownItem, _Component);

  function DropdownItem() {
    _classCallCheck(this, DropdownItem);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  DropdownItem.prototype.handleClick = function handleClick() {
    this.context.component.handleMenuItemClick(this.props.command, this);
  };

  DropdownItem.prototype.render = function render() {
    var _props = this.props,
        disabled = _props.disabled,
        divided = _props.divided;


    return React.createElement(
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
  };

  return DropdownItem;
}(Component);

export default DropdownItem;


DropdownItem.contextTypes = {
  component: PropTypes.any
};

DropdownItem.propTypes = {
  command: PropTypes.string,
  disabled: PropTypes.bool,
  divided: PropTypes.bool
};