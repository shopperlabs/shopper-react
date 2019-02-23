import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import { Component } from '../../libs';

var ButtonGroup = function (_Component) {
  _inherits(ButtonGroup, _Component);

  function ButtonGroup() {
    _classCallCheck(this, ButtonGroup);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  ButtonGroup.prototype.render = function render() {
    return React.createElement(
      'div',
      { style: this.style(), className: this.className('el-button-group') },
      this.props.children
    );
  };

  return ButtonGroup;
}(Component);

export default ButtonGroup;