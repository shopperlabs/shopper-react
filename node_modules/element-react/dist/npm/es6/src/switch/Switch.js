import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import { Component, PropTypes, View, Transition } from '../../libs';

var Switch = function (_Component) {
  _inherits(Switch, _Component);

  function Switch(props) {
    _classCallCheck(this, Switch);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.state = {
      value: props.value,
      coreWidth: props.width,
      buttonStyle: {
        transform: ''
      }
    };
    return _this;
  }

  Switch.prototype.componentDidMount = function componentDidMount() {
    if (this.props.width === 0) {
      this.state.coreWidth = this.hasText() ? 58 : 46;
    }

    this.updateSwitch();
  };

  Switch.prototype.componentWillReceiveProps = function componentWillReceiveProps(props) {
    var _this2 = this;

    this.setState({ value: props.value }, function () {
      _this2.updateSwitch();
    });

    if (props.width) {
      this.setState({ coreWidth: props.width });
    }
  };

  Switch.prototype.updateSwitch = function updateSwitch() {
    this.handleButtonTransform();

    if (this.props.onColor || this.props.offColor) {
      this.setBackgroundColor();
    }
  };

  Switch.prototype.hasText = function hasText() {
    return this.props.onText || this.props.offText;
  };

  Switch.prototype.setBackgroundColor = function setBackgroundColor() {
    var newColor = this.state.value === this.props.onValue ? this.props.onColor : this.props.offColor;

    this.refs.core.style.borderColor = newColor;
    this.refs.core.style.backgroundColor = newColor;
  };

  Switch.prototype.setFocus = function setFocus() {
    if (this.props.allowFocus) {
      this.refs.input.focus();
    }
  };

  Switch.prototype.handleFocus = function handleFocus(e) {
    if (this.props.allowFocus) {
      this.props.onFocus(e);
    }
  };

  Switch.prototype.handleBlur = function handleBlur(e) {
    if (this.props.allowFocus) {
      this.props.onBlur(e);
    }
  };

  Switch.prototype.handleChange = function handleChange(e) {
    var _this3 = this;

    this.setState({
      value: e.target.checked ? this.props.onValue : this.props.offValue
    }, function () {
      _this3.updateSwitch();

      if (_this3.props.onChange) {
        _this3.props.onChange(_this3.state.value);
      }
    });
  };

  Switch.prototype.handleButtonTransform = function handleButtonTransform() {
    var _state = this.state,
        value = _state.value,
        coreWidth = _state.coreWidth,
        buttonStyle = _state.buttonStyle;

    buttonStyle.transform = value === this.props.onValue ? 'translate(' + (coreWidth - 20) + 'px, 2px)' : 'translate(2px, 2px)';

    this.setState({ buttonStyle: buttonStyle });
  };

  Switch.prototype.render = function render() {
    var _props = this.props,
        name = _props.name,
        disabled = _props.disabled,
        onText = _props.onText,
        offText = _props.offText,
        onValue = _props.onValue,
        onIconClass = _props.onIconClass,
        offIconClass = _props.offIconClass,
        allowFocus = _props.allowFocus;
    var _state2 = this.state,
        value = _state2.value,
        coreWidth = _state2.coreWidth,
        buttonStyle = _state2.buttonStyle;


    return React.createElement(
      'label',
      {
        style: this.style(),
        className: this.className('el-switch', {
          'is-disabled': disabled,
          'el-switch--wide': this.hasText(),
          'is-checked': value === onValue
        }) },
      React.createElement(
        View,
        { show: disabled },
        React.createElement('div', { className: 'el-switch__mask' })
      ),
      React.createElement('input', {
        className: this.className('el-switch__input', {
          'allow-focus': allowFocus
        }),
        type: 'checkbox',
        checked: value === onValue,
        name: name,
        ref: 'input',
        disabled: disabled,
        onChange: this.handleChange.bind(this),
        onFocus: this.handleFocus.bind(this),
        onBlur: this.handleBlur.bind(this)
      }),
      React.createElement(
        'span',
        { className: 'el-switch__core', ref: 'core', style: { 'width': coreWidth + 'px' } },
        React.createElement('span', { className: 'el-switch__button', style: Object.assign({}, buttonStyle), onClick: this.setFocus.bind(this) })
      ),
      React.createElement(
        Transition,
        { name: 'label-fade' },
        React.createElement(
          View,
          { show: value === onValue },
          React.createElement(
            'div',
            {
              className: 'el-switch__label el-switch__label--left',
              style: { 'width': coreWidth + 'px' }
            },
            onIconClass && React.createElement('i', { className: onIconClass }),
            !onIconClass && onText && React.createElement(
              'span',
              null,
              onText
            )
          )
        )
      ),
      React.createElement(
        Transition,
        { name: 'label-fade' },
        React.createElement(
          View,
          { show: value !== onValue },
          React.createElement(
            'div',
            {
              className: 'el-switch__label el-switch__label--right',
              style: { 'width': coreWidth + 'px' }
            },
            offIconClass && React.createElement('i', { className: offIconClass }),
            !offIconClass && offText && React.createElement(
              'span',
              null,
              offText
            )
          )
        )
      )
    );
  };

  return Switch;
}(Component);

export default Switch;


Switch.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.bool]),
  disabled: PropTypes.bool,
  width: PropTypes.number,
  onIconClass: PropTypes.string,
  offIconClass: PropTypes.string,
  onText: PropTypes.string,
  offText: PropTypes.string,
  onColor: PropTypes.string,
  offColor: PropTypes.string,
  onValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.bool]),
  offValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.bool]),
  name: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  allowFocus: PropTypes.bool
};

Switch.defaultProps = {
  value: true,
  disabled: false,
  width: 0,
  onIconClass: '',
  offIconClass: '',
  onText: 'ON',
  offText: 'OFF',
  onValue: true,
  offValue: false,
  onColor: '',
  offColor: '',
  name: '',
  allowFocus: false
};