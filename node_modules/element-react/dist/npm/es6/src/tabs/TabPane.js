import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import { Component, PropTypes } from '../../libs';

var TabPane = function (_Component) {
  _inherits(TabPane, _Component);

  function TabPane() {
    _classCallCheck(this, TabPane);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  TabPane.prototype.render = function render() {
    return React.createElement(
      'div',
      { style: this.style(), className: this.className('el-tab-pane') },
      this.props.children
    );
  };

  return TabPane;
}(Component);

export default TabPane;


TabPane.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  name: PropTypes.string,
  disabled: PropTypes.bool,
  closable: PropTypes.bool
};

TabPane.defaultProps = {
  disabled: false,
  closable: false
};