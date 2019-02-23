import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import { Component, PropTypes } from '../../libs';

var OptionGroup = function (_Component) {
  _inherits(OptionGroup, _Component);

  function OptionGroup() {
    _classCallCheck(this, OptionGroup);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  OptionGroup.prototype.render = function render() {
    return React.createElement(
      'ul',
      { style: this.style(), className: this.className('el-select-group__wrap') },
      React.createElement(
        'li',
        { className: 'el-select-group__title' },
        this.props.label
      ),
      React.createElement(
        'li',
        null,
        React.createElement(
          'ul',
          { className: 'el-select-group' },
          this.props.children
        )
      )
    );
  };

  return OptionGroup;
}(Component);

export default OptionGroup;


OptionGroup.propTypes = {
  label: PropTypes.string
};