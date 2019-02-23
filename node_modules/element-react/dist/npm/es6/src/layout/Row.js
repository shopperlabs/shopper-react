import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import { Component, PropTypes } from '../../libs';

var Row = function (_Component) {
  _inherits(Row, _Component);

  function Row() {
    _classCallCheck(this, Row);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  Row.prototype.getChildContext = function getChildContext() {
    return {
      gutter: this.props.gutter
    };
  };

  Row.prototype.getStyle = function getStyle() {
    var style = {};

    if (this.props.gutter) {
      style.marginLeft = '-' + this.props.gutter / 2 + 'px';
      style.marginRight = style.marginLeft;
    }

    return style;
  };

  Row.prototype.render = function render() {
    return React.createElement(this.props.tag, {
      className: this.className('el-row', this.props.justify !== 'start' && 'is-justify-' + this.props.justify, this.props.align !== 'top' && 'is-align-' + this.props.align, {
        'el-row--flex': this.props.type === 'flex'
      }),
      style: this.style(this.getStyle())
    }, this.props.children);
  };

  return Row;
}(Component);

export default Row;


Row.childContextTypes = {
  gutter: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

Row.propTypes = {
  gutter: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  type: PropTypes.string,
  justify: PropTypes.string,
  align: PropTypes.string,
  tag: PropTypes.string
};

Row.defaultProps = {
  justify: 'start',
  align: 'top',
  tag: 'div'
};