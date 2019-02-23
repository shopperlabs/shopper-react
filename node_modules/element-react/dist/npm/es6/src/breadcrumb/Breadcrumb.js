import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import { Component, PropTypes } from '../../libs';

var Breadcrumb = function (_Component) {
  _inherits(Breadcrumb, _Component);

  function Breadcrumb() {
    _classCallCheck(this, Breadcrumb);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  Breadcrumb.prototype.getChildContext = function getChildContext() {
    return {
      separator: this.props.separator
    };
  };

  Breadcrumb.prototype.render = function render() {
    return React.createElement(
      'div',
      { style: this.style(), className: this.className('el-breadcrumb') },
      this.props.children
    );
  };

  return Breadcrumb;
}(Component);

export default Breadcrumb;


Breadcrumb.childContextTypes = {
  separator: PropTypes.string
};

Breadcrumb.propTypes = {
  separator: PropTypes.string
};

Breadcrumb.defaultProps = {
  separator: '/'
};