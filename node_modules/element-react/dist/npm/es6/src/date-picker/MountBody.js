import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export var MountBody = function (_Component) {
  _inherits(MountBody, _Component);

  function MountBody() {
    _classCallCheck(this, MountBody);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  MountBody.prototype.componentWillMount = function componentWillMount() {
    var c = React.cloneElement(this.props.children);
    this.tnode = document.createElement('div');
    document.body.appendChild(this.tnode);
    ReactDOM.render(c, this.tnode);
  };

  MountBody.prototype.componentWillUnmount = function componentWillUnmount() {
    ReactDOM.unmountComponentAtNode(this.tnode);
    document.body.removeChild(this.tnode);
  };

  MountBody.prototype.contains = function contains(evt) {
    var parent = this.tnode.childNodes[0];
    var rect = parent.getBoundingClientRect();
    var isContain = evt.clientX >= rect.left && evt.clientX <= rect.right && evt.clientY >= rect.top && evt.clientY <= rect.bottom;
    return isContain;
  };

  MountBody.prototype.render = function render() {
    return null;
  };

  return MountBody;
}(Component);