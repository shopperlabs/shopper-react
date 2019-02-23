import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import AsyncValidator from 'async-validator';
import { Component, PropTypes, Transition } from '../../libs';

var FormItem = function (_Component) {
  _inherits(FormItem, _Component);

  function FormItem(props) {
    _classCallCheck(this, FormItem);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.state = {
      error: '',
      valid: false,
      validating: false
    };
    return _this;
  }

  FormItem.prototype.getChildContext = function getChildContext() {
    return {
      form: this
    };
  };

  FormItem.prototype.componentDidMount = function componentDidMount() {
    var prop = this.props.prop;


    if (prop) {
      this.parent().addField(this);

      this.initialValue = this.getInitialValue();
    }
  };

  FormItem.prototype.componentWillUnmount = function componentWillUnmount() {
    this.parent().removeField(this);
  };

  FormItem.prototype.parent = function parent() {
    return this.context.component;
  };

  FormItem.prototype.isRequired = function isRequired() {
    var rules = this.getRules();
    var isRequired = false;

    if (rules && rules.length) {
      rules.every(function (rule) {
        if (rule.required) {
          isRequired = true;

          return false;
        }
        return true;
      });
    }

    return isRequired;
  };

  FormItem.prototype.onFieldBlur = function onFieldBlur() {
    this.validate('blur');
  };

  FormItem.prototype.onFieldChange = function onFieldChange() {
    var _this2 = this;

    if (this.validateDisabled) {
      this.validateDisabled = false;

      return;
    }

    setTimeout(function () {
      _this2.validate('change');
    });
  };

  FormItem.prototype.validate = function validate(trigger, cb) {
    var _descriptor,
        _model,
        _this3 = this;

    var rules = this.getFilteredRule(trigger);

    if (!rules || rules.length === 0) {
      if (cb instanceof Function) {
        cb();
      }

      return true;
    }

    this.setState({ validating: true });

    var descriptor = (_descriptor = {}, _descriptor[this.props.prop] = rules, _descriptor);
    var validator = new AsyncValidator(descriptor);
    var model = (_model = {}, _model[this.props.prop] = this.fieldValue(), _model);

    validator.validate(model, { firstFields: true }, function (errors) {
      _this3.setState({
        error: errors ? errors[0].message : '',
        validating: false,
        valid: !errors
      }, function () {
        if (cb instanceof Function) {
          cb(errors);
        }
      });
    });
  };

  FormItem.prototype.getInitialValue = function getInitialValue() {
    var value = this.parent().props.model[this.props.prop];

    if (value === undefined) {
      return value;
    } else {
      return JSON.parse(JSON.stringify(value));
    }
  };

  FormItem.prototype.resetField = function resetField() {
    var _state = this.state,
        valid = _state.valid,
        error = _state.error;


    valid = true;
    error = '';

    this.setState({ valid: valid, error: error });

    var value = this.fieldValue();

    if (Array.isArray(value) && value.length > 0) {
      this.validateDisabled = true;
      this.parent().props.model[this.props.prop] = [];
    } else if (value) {
      this.validateDisabled = true;
      this.parent().props.model[this.props.prop] = this.initialValue;
    }
  };

  FormItem.prototype.getRules = function getRules() {
    var formRules = this.parent().props.rules;
    var selfRuels = this.props.rules;

    formRules = formRules ? formRules[this.props.prop] : [];
    return [].concat(selfRuels || formRules || []);
  };

  FormItem.prototype.getFilteredRule = function getFilteredRule(trigger) {
    var rules = this.getRules();

    return rules.filter(function (rule) {
      return !rule.trigger || rule.trigger.indexOf(trigger) !== -1;
    });
  };

  FormItem.prototype.labelStyle = function labelStyle() {
    var ret = {};

    if (this.parent().props.labelPosition === 'top') return ret;

    var labelWidth = this.props.labelWidth || this.parent().props.labelWidth;

    if (labelWidth) {
      ret.width = parseInt(labelWidth);
    }

    return ret;
  };

  FormItem.prototype.contentStyle = function contentStyle() {
    var ret = {};

    if (this.parent().props.labelPosition === 'top' || this.parent().props.inline) return ret;

    var labelWidth = this.props.labelWidth || this.parent().props.labelWidth;

    if (labelWidth) {
      ret.marginLeft = parseInt(labelWidth);
    }

    return ret;
  };

  FormItem.prototype.fieldValue = function fieldValue() {
    var model = this.parent().props.model;
    if (!model || !this.props.prop) {
      return;
    }
    var temp = this.props.prop.split(':');
    return temp.length > 1 ? model[temp[0]][temp[1]] : model[this.props.prop];
  };

  FormItem.prototype.render = function render() {
    var _state2 = this.state,
        error = _state2.error,
        validating = _state2.validating;
    var _props = this.props,
        label = _props.label,
        required = _props.required;


    return React.createElement(
      'div',
      { style: this.style(), className: this.className('el-form-item', {
          'is-error': error !== '',
          'is-validating': validating,
          'is-required': this.isRequired() || required
        }), onBlur: this.onFieldBlur.bind(this), onChange: this.onFieldChange.bind(this) },
      label && React.createElement(
        'label',
        { className: 'el-form-item__label', style: this.labelStyle() },
        label + this.parent().props.labelSuffix
      ),
      React.createElement(
        'div',
        { className: 'el-form-item__content', style: this.contentStyle() },
        this.props.children,
        React.createElement(
          Transition,
          { name: 'el-zoom-in-top' },
          error && React.createElement(
            'div',
            { className: 'el-form-item__error' },
            error
          )
        )
      )
    );
  };

  return FormItem;
}(Component);

export default FormItem;


FormItem.contextTypes = {
  component: PropTypes.any
};

FormItem.childContextTypes = {
  form: PropTypes.any
};

FormItem.propTypes = {
  label: PropTypes.string,
  labelWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  prop: PropTypes.string,
  required: PropTypes.bool,
  rules: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};