import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import { Component, PropTypes } from '../../libs';

var Radio = function (_Component) {
  _inherits(Radio, _Component);

  function Radio(props) {
    _classCallCheck(this, Radio);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.state = {
      checked: _this.getChecked(props)
    };
    return _this;
  }

  Radio.prototype.componentWillReceiveProps = function componentWillReceiveProps(props) {
    var checked = this.getChecked(props);

    if (this.state.checked != checked) {
      this.setState({ checked: checked });
    }
  };

  Radio.prototype.onChange = function onChange(e) {
    var checked = e.target.checked;

    if (checked) {
      if (this.props.onChange) {
        this.props.onChange(this.props.value);
      }
    }

    this.setState({ checked: checked });
  };

  Radio.prototype.onFocus = function onFocus() {
    this.setState({
      focus: true
    });
  };

  Radio.prototype.onBlur = function onBlur() {
    this.setState({
      focus: false
    });
  };

  Radio.prototype.getChecked = function getChecked(props) {
    return props.model == props.value || Boolean(props.checked);
  };

  Radio.prototype.render = function render() {
    var _state = this.state,
        checked = _state.checked,
        focus = _state.focus;
    var _props = this.props,
        disabled = _props.disabled,
        value = _props.value,
        children = _props.children;


    return React.createElement(
      'label',
      { style: this.style(), className: this.className('el-radio') },
      React.createElement(
        'span',
        { className: this.classNames({
            'el-radio__input': true,
            'is-checked': checked,
            'is-disabled': disabled,
            'is-focus': focus
          }) },
        React.createElement('span', { className: 'el-radio__inner' }),
        React.createElement('input', {
          type: 'radio',
          className: 'el-radio__original',
          checked: checked,
          disabled: disabled,
          onChange: this.onChange.bind(this),
          onFocus: this.onFocus.bind(this),
          onBlur: this.onBlur.bind(this)
        })
      ),
      React.createElement(
        'span',
        { className: 'el-radio__label' },
        children || value
      )
    );
  };

  return Radio;
}(Component);

Radio.elementType = 'Radio';
export default Radio;


Radio.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  checked: PropTypes.bool
};