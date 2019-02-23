import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import { Component, PropTypes } from '../../libs';

var BreadcrumbItem = function (_Component) {
  _inherits(BreadcrumbItem, _Component);

  function BreadcrumbItem() {
    _classCallCheck(this, BreadcrumbItem);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  BreadcrumbItem.prototype.render = function render() {
    return React.createElement(
      'span',
      { style: this.style(), className: this.className('el-breadcrumb__item') },
      React.createElement(
        'span',
        { className: 'el-breadcrumb__item__inner', ref: 'link' },
        this.props.children
      ),
      React.createElement(
        'span',
        { className: 'el-breadcrumb__separator' },
        this.context.separator
      )
    );
  };

  return BreadcrumbItem;
}(Component);

export default BreadcrumbItem;


BreadcrumbItem.contextTypes = {
  separator: PropTypes.string
};