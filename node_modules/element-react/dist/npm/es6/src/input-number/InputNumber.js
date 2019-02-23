import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import { Component, PropTypes } from '../../libs';

import Input from '../input';
import { accAdd, accSub } from './util';

var InputNumber = function (_Component) {
  _inherits(InputNumber, _Component);

  function InputNumber(props) {
    _classCallCheck(this, InputNumber);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.state = {
      value: props.defaultValue,
      inputActive: false
    };
    return _this;
  }

  InputNumber.prototype.componentWillReceiveProps = function componentWillReceiveProps(props) {
    if (props.value != this.props.value) {
      this.setState({ value: props.value });
    }
  };

  InputNumber.prototype.onKeyDown = function onKeyDown(e) {
    switch (e.keyCode) {
      case 38:
        // KeyUp
        e.preventDefault();
        this.increase();
        break;
      case 40:
        // KeyDown
        e.preventDefault();
        this.decrease();
        break;
      default:
        break;
    }
  };

  InputNumber.prototype.onBlur = function onBlur() {
    var value = this.state.value;

    if (this.isValid) {
      value = Number(value);

      if (value > this.props.max) {
        value = Number(this.props.max);
      } else if (value < this.props.min) {
        value = Number(this.props.min);
      }
    } else {
      value = undefined;
    }

    this.setState({ value: value }, this.onChange);
  };

  InputNumber.prototype.onInput = function onInput(value) {
    var _this2 = this;

    this.setState({ value: value }, function () {
      clearTimeout(_this2.timeout);

      _this2.timeout = setTimeout(function () {
        _this2.onBlur();
      }, 750);
    });
  };

  InputNumber.prototype.onChange = function onChange() {
    if (this.props.onChange) {
      this.props.onChange(this.state.value);
    }
  };

  InputNumber.prototype.increase = function increase() {
    var _props = this.props,
        step = _props.step,
        max = _props.max,
        disabled = _props.disabled,
        min = _props.min;
    var _state = this.state,
        value = _state.value,
        inputActive = _state.inputActive;


    if (this.maxDisabled) {
      inputActive = false;
    } else {
      if (value + Number(step) > max || disabled) return;
      if (value + Number(step) < min) value = min - Number(step);

      value = accAdd(step, value);
    }

    this.setState({ value: value, inputActive: inputActive }, this.onChange);
  };

  InputNumber.prototype.decrease = function decrease() {
    var _props2 = this.props,
        step = _props2.step,
        min = _props2.min,
        disabled = _props2.disabled,
        max = _props2.max;
    var _state2 = this.state,
        value = _state2.value,
        inputActive = _state2.inputActive;


    if (this.minDisabled) {
      inputActive = false;
    } else {
      if (value - Number(step) < min || disabled) return;
      if (value - Number(step) > max) value = Number(max) + Number(step);
      value = accSub(value, step);
    }

    this.setState({ value: value, inputActive: inputActive }, this.onChange);
  };

  InputNumber.prototype.activeInput = function activeInput(disabled) {
    if (!this.props.disabled && !disabled) {
      this.setState({
        inputActive: true
      });
    }
  };

  InputNumber.prototype.inactiveInput = function inactiveInput(disabled) {
    if (!this.props.disabled && !disabled) {
      this.setState({
        inputActive: false
      });
    }
  };

  InputNumber.prototype.render = function render() {
    var _props3 = this.props,
        controls = _props3.controls,
        disabled = _props3.disabled,
        size = _props3.size;
    var _state3 = this.state,
        value = _state3.value,
        inputActive = _state3.inputActive;


    return React.createElement(
      'div',
      { style: this.style(), className: this.className('el-input-number', size && 'el-input-number--' + size, {
          'is-disabled': disabled,
          'is-without-controls': !controls
        }) },
      controls && React.createElement(
        'span',
        {
          className: this.classNames("el-input-number__decrease", {
            'is-disabled': this.minDisabled
          }),
          onClick: this.decrease.bind(this)
        },
        React.createElement('i', { className: 'el-icon-minus' })
      ),
      controls && React.createElement(
        'span',
        {
          className: this.classNames("el-input-number__increase", {
            'is-disabled': this.maxDisabled
          }),
          onClick: this.increase.bind(this)
        },
        React.createElement('i', { className: 'el-icon-plus' })
      ),
      React.createElement(Input, {
        ref: 'input',
        className: this.classNames({
          'is-active': inputActive
        }),
        value: value,
        disabled: disabled,
        size: size,
        onChange: this.onInput.bind(this),
        onKeyDown: this.onKeyDown.bind(this),
        onBlur: this.onBlur.bind(this) })
    );
  };

  _createClass(InputNumber, [{
    key: 'isValid',
    get: function get() {
      return this.state.value !== '' && !isNaN(Number(this.state.value));
    }
  }, {
    key: 'minDisabled',
    get: function get() {
      return !this.isValid || this.state.value - Number(this.props.step) < this.props.min;
    }
  }, {
    key: 'maxDisabled',
    get: function get() {
      return !this.isValid || this.state.value + Number(this.props.step) > this.props.max;
    }
  }]);

  return InputNumber;
}(Component);

export default InputNumber;


InputNumber.propTypes = {
  defaultValue: PropTypes.number,
  value: PropTypes.number,
  step: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  max: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  min: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  disabled: PropTypes.bool,
  controls: PropTypes.bool,
  size: PropTypes.string,
  onChange: PropTypes.func
};

InputNumber.defaultProps = {
  step: 1,
  controls: true,
  max: Infinity,
  min: 0
};