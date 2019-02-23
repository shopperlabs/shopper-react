import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import CheckBox from './CheckBox';

var CheckboxButton = function (_CheckBox) {
  _inherits(CheckboxButton, _CheckBox);

  function CheckboxButton() {
    _classCallCheck(this, CheckboxButton);

    return _possibleConstructorReturn(this, _CheckBox.apply(this, arguments));
  }

  CheckboxButton.prototype.render = function render() {
    var group = this.context.ElCheckboxGroup;

    return React.createElement(
      'label',
      { style: this.style(), className: this.className('el-checkbox-button', group.props.size ? 'el-checkbox-button--' + group.props.size : '', {
          'is-disabled': this.props.disabled,
          'is-checked': this.state.checked,
          'is-focus': this.state.focus
        }) },
      React.createElement('input', {
        className: 'el-checkbox-button__original',
        type: 'checkbox',
        checked: this.state.checked,
        disabled: this.props.disabled,
        onFocus: this.onFocus.bind(this),
        onBlur: this.onBlur.bind(this),
        onChange: this.onChange.bind(this)
      }),
      React.createElement(
        'span',
        { className: 'el-checkbox-button__inner', style: this.state.checked ? {
            boxShadow: '-1px 0 0 0 ' + group.props.fill,
            backgroundColor: group.props.fill || '',
            borderColor: group.props.fill || '',
            color: group.props.textColor || ''
          } : {} },
        this.state.label || this.props.children
      )
    );
  };

  return CheckboxButton;
}(CheckBox);

CheckboxButton.elementType = 'CheckboxButton';
export default CheckboxButton;