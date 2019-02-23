import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import { Component, PropTypes } from '../../libs';

import Radio from './Radio';

var RadioButton = function (_Radio) {
  _inherits(RadioButton, _Radio);

  function RadioButton() {
    _classCallCheck(this, RadioButton);

    return _possibleConstructorReturn(this, _Radio.apply(this, arguments));
  }

  RadioButton.prototype.parent = function parent() {
    return this.context.component;
  };

  RadioButton.prototype.size = function size() {
    return this.parent().props.size;
  };

  RadioButton.prototype.isDisabled = function isDisabled() {
    return this.props.disabled || this.parent().props.disabled;
  };

  RadioButton.prototype.activeStyle = function activeStyle() {
    return {
      backgroundColor: this.parent().props.fill || '',
      borderColor: this.parent().props.fill || '',
      color: this.parent().props.textColor || ''
    };
  };

  RadioButton.prototype.render = function render() {
    return React.createElement(
      'label',
      { style: this.style(), className: this.className('el-radio-button', this.props.size && 'el-radio-button--' + this.size(), {
          'is-active': this.state.checked
        }) },
      React.createElement('input', {
        type: 'radio',
        className: 'el-radio-button__orig-radio',
        checked: this.state.checked,
        disabled: this.isDisabled(),
        onChange: this.onChange.bind(this)
      }),
      React.createElement(
        'span',
        { className: 'el-radio-button__inner', style: this.state.checked ? this.activeStyle() : {} },
        this.props.children || this.props.value
      )
    );
  };

  return RadioButton;
}(Radio);

RadioButton.elementType = 'RadioButton';
export default RadioButton;


RadioButton.contextTypes = {
  component: PropTypes.any
};

RadioButton.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
  name: PropTypes.string
};