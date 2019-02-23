import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import { Component } from '../../libs';

var DialogBody = function (_Component) {
  _inherits(DialogBody, _Component);

  function DialogBody() {
    _classCallCheck(this, DialogBody);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  DialogBody.prototype.render = function render() {
    return React.createElement(
      'div',
      { style: this.style(), className: this.className('el-dialog__body') },
      this.props.children
    );
  };

  return DialogBody;
}(Component);

export default DialogBody;