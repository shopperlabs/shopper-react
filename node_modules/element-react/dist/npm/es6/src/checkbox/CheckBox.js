import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import { Component, PropTypes } from '../../libs';

var Checkbox = function (_Component) {
  _inherits(Checkbox, _Component);

  function Checkbox(props) {
    _classCallCheck(this, Checkbox);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.state = {
      checked: props.checked,
      focus: props.focus,
      label: _this.getLabel(props)
    };
    return _this;
  }

  Checkbox.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    this.setState({
      checked: nextProps.checked, focus: nextProps.focus, label: this.getLabel(nextProps)
    });
  };

  Checkbox.prototype.onFocus = function onFocus() {
    this.setState({
      focus: true
    });
  };

  Checkbox.prototype.onBlur = function onBlur() {
    this.setState({
      focus: false
    });
  };

  Checkbox.prototype.onChange = function onChange(e) {
    var _this2 = this;

    if (e.target instanceof HTMLInputElement) {
      var _label = this.state.label;
      var _props = this.props,
          trueLabel = _props.trueLabel,
          falseLabel = _props.falseLabel;


      var _checked = e.target.checked;
      var group = this.context.ElCheckboxGroup;

      if (group) {
        var length = group.state.options.length + (_checked ? 1 : -1);

        if (group.props.min !== undefined && length < group.props.min) {
          return;
        }

        if (group.props.max !== undefined && length > group.props.max) {
          return;
        }
      }

      var newLabel = _label;

      if (this.props.trueLabel || this.props.falseLabel) {
        newLabel = _checked ? trueLabel : falseLabel;
      }

      this.setState({
        checked: _checked,
        label: newLabel
      }, function () {
        if (_this2.props.onChange) {
          _this2.props.onChange(_checked);
        }
      });
    }
  };

  Checkbox.prototype.getLabel = function getLabel(props) {
    if (props.trueLabel || props.falseLabel) {
      return props.checked ? props.trueLabel : props.falseLabel;
    } else {
      return props.label;
    }
  };

  Checkbox.prototype.render = function render() {
    return React.createElement(
      'label',
      { style: this.style(), className: this.className('el-checkbox') },
      React.createElement(
        'span',
        { className: this.classNames('el-checkbox__input', {
            'is-disabled': this.props.disabled,
            'is-checked': this.state.checked,
            'is-indeterminate': this.props.indeterminate,
            'is-focus': this.state.focus
          }) },
        React.createElement('span', { className: 'el-checkbox__inner' }),
        React.createElement('input', {
          className: 'el-checkbox__original',
          type: 'checkbox',
          checked: this.state.checked,
          disabled: this.props.disabled,
          onFocus: this.onFocus.bind(this),
          onBlur: this.onBlur.bind(this),
          onChange: this.onChange.bind(this)
        })
      ),
      React.createElement(
        'span',
        { className: 'el-checkbox__label' },
        this.props.children || this.state.label
      )
    );
  };

  return Checkbox;
}(Component);

Checkbox.elementType = 'Checkbox';
export default Checkbox;


Checkbox.contextTypes = {
  ElCheckboxGroup: PropTypes.any
};

Checkbox.propTypes = {
  label: PropTypes.string,
  trueLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  falseLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
  checked: PropTypes.bool,
  indeterminate: PropTypes.bool,
  focus: PropTypes.bool,
  onChange: PropTypes.func
};

Checkbox.defaultProps = {
  checked: false,
  focus: false
};