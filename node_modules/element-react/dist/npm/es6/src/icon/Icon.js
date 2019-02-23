import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import { Component, PropTypes } from '../../libs';

var Icon = function (_Component) {
  _inherits(Icon, _Component);

  function Icon() {
    _classCallCheck(this, Icon);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  Icon.prototype.render = function render() {
    return React.createElement('i', { style: this.style(), className: this.className('el-icon-' + this.props.name) });
  };

  return Icon;
}(Component);

export default Icon;


Icon.propTypes = {
  name: PropTypes.string
};