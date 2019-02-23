import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import ReactDOM from 'react-dom';
import Popper from 'popper.js';
import { Component, PropTypes, Transition, View } from '../../libs';

var DropdownMenu = function (_Component) {
  _inherits(DropdownMenu, _Component);

  function DropdownMenu(props) {
    _classCallCheck(this, DropdownMenu);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.state = {
      showPopper: false
    };
    return _this;
  }

  DropdownMenu.prototype.onVisibleChange = function onVisibleChange(visible) {
    this.setState({
      showPopper: visible
    });
  };

  DropdownMenu.prototype.onEnter = function onEnter() {
    var parent = ReactDOM.findDOMNode(this.parent());

    this.popperJS = new Popper(parent, this.refs.popper, {
      placement: this.placement(),
      modifiers: {
        computeStyle: {
          gpuAcceleration: false
        }
      }
    });
  };

  DropdownMenu.prototype.onAfterLeave = function onAfterLeave() {
    this.popperJS.destroy();
  };

  DropdownMenu.prototype.parent = function parent() {
    return this.context.component;
  };

  DropdownMenu.prototype.placement = function placement() {
    return 'bottom-' + this.parent().props.menuAlign;
  };

  DropdownMenu.prototype.render = function render() {
    return React.createElement(
      Transition,
      { name: 'el-zoom-in-top', onEnter: this.onEnter.bind(this), onAfterLeave: this.onAfterLeave.bind(this) },
      React.createElement(
        View,
        { show: this.state.showPopper },
        React.createElement(
          'ul',
          { ref: 'popper', style: this.style(), className: this.className('el-dropdown-menu') },
          this.props.children
        )
      )
    );
  };

  return DropdownMenu;
}(Component);

export default DropdownMenu;


DropdownMenu.contextTypes = {
  component: PropTypes.any
};