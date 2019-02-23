import _typeof from 'babel-runtime/helpers/typeof';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import { Component, PropTypes } from '../../libs';

var Col = function (_Component) {
  _inherits(Col, _Component);

  function Col() {
    _classCallCheck(this, Col);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  Col.prototype.getStyle = function getStyle() {
    var style = {};

    if (this.context.gutter) {
      style.paddingLeft = this.context.gutter / 2 + 'px';
      style.paddingRight = style.paddingLeft;
    }

    return style;
  };

  Col.prototype.render = function render() {
    var _this2 = this;

    var classList = [];

    ['span', 'offset', 'pull', 'push'].forEach(function (prop) {
      if (_this2.props[prop] >= 0) {
        classList.push(prop !== 'span' ? 'el-col-' + prop + '-' + _this2.props[prop] : 'el-col-' + _this2.props[prop]);
      }
    });

    ['xs', 'sm', 'md', 'lg'].forEach(function (size) {
      if (_typeof(_this2.props[size]) === 'object') {
        var props = _this2.props[size];
        Object.keys(props).forEach(function (prop) {
          classList.push(prop !== 'span' ? 'el-col-' + size + '-' + prop + '-' + props[prop] : 'el-col-' + size + '-' + props[prop]);
        });
      } else if (_this2.props[size] >= 0) {
        classList.push('el-col-' + size + '-' + Number(_this2.props[size]));
      }
    });

    return React.createElement(this.props.tag, {
      className: this.className('el-col', classList),
      style: this.style(this.getStyle())
    }, this.props.children);
  };

  return Col;
}(Component);

export default Col;


Col.contextTypes = {
  gutter: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

Col.propTypes = {
  span: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  offset: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  pull: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  push: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  xs: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.object]),
  sm: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.object]),
  md: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.object]),
  lg: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.object]),
  tag: PropTypes.string
};

Col.defaultProps = {
  span: 24,
  tag: 'div'
};