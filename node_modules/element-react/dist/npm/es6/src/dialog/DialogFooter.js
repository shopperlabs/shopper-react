import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import { Component } from '../../libs';

var DialogFooter = function (_Component) {
  _inherits(DialogFooter, _Component);

  function DialogFooter() {
    _classCallCheck(this, DialogFooter);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  DialogFooter.prototype.render = function render() {
    return React.createElement(
      'div',
      { style: this.style(), className: this.className('el-dialog__footer') },
      this.props.children
    );
  };

  return DialogFooter;
}(Component);

export default DialogFooter;