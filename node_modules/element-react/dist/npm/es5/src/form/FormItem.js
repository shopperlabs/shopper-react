'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _asyncValidator = require('async-validator');

var _asyncValidator2 = _interopRequireDefault(_asyncValidator);

var _libs = require('../../libs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FormItem = function (_Component) {
  (0, _inherits3.default)(FormItem, _Component);

  function FormItem(props) {
    (0, _classCallCheck3.default)(this, FormItem);

    var _this = (0, _possibleConstructorReturn3.default)(this, (FormItem.__proto__ || Object.getPrototypeOf(FormItem)).call(this, props));

    _this.state = {
      error: '',
      valid: false,
      validating: false
    };
    return _this;
  }

  (0, _createClass3.default)(FormItem, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        form: this
      };
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var prop = this.props.prop;


      if (prop) {
        this.parent().addField(this);

        this.initialValue = this.getInitialValue();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.parent().removeField(this);
    }
  }, {
    key: 'parent',
    value: function parent() {
      return this.context.component;
    }
  }, {
    key: 'isRequired',
    value: function isRequired() {
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
    }
  }, {
    key: 'onFieldBlur',
    value: function onFieldBlur() {
      this.validate('blur');
    }
  }, {
    key: 'onFieldChange',
    value: function onFieldChange() {
      var _this2 = this;

      if (this.validateDisabled) {
        this.validateDisabled = false;

        return;
      }

      setTimeout(function () {
        _this2.validate('change');
      });
    }
  }, {
    key: 'validate',
    value: function validate(trigger, cb) {
      var _this3 = this;

      var rules = this.getFilteredRule(trigger);

      if (!rules || rules.length === 0) {
        if (cb instanceof Function) {
          cb();
        }

        return true;
      }

      this.setState({ validating: true });

      var descriptor = (0, _defineProperty3.default)({}, this.props.prop, rules);
      var validator = new _asyncValidator2.default(descriptor);
      var model = (0, _defineProperty3.default)({}, this.props.prop, this.fieldValue());

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
    }
  }, {
    key: 'getInitialValue',
    value: function getInitialValue() {
      var value = this.parent().props.model[this.props.prop];

      if (value === undefined) {
        return value;
      } else {
        return JSON.parse(JSON.stringify(value));
      }
    }
  }, {
    key: 'resetField',
    value: function resetField() {
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
    }
  }, {
    key: 'getRules',
    value: function getRules() {
      var formRules = this.parent().props.rules;
      var selfRuels = this.props.rules;

      formRules = formRules ? formRules[this.props.prop] : [];
      return [].concat(selfRuels || formRules || []);
    }
  }, {
    key: 'getFilteredRule',
    value: function getFilteredRule(trigger) {
      var rules = this.getRules();

      return rules.filter(function (rule) {
        return !rule.trigger || rule.trigger.indexOf(trigger) !== -1;
      });
    }
  }, {
    key: 'labelStyle',
    value: function labelStyle() {
      var ret = {};

      if (this.parent().props.labelPosition === 'top') return ret;

      var labelWidth = this.props.labelWidth || this.parent().props.labelWidth;

      if (labelWidth) {
        ret.width = parseInt(labelWidth);
      }

      return ret;
    }
  }, {
    key: 'contentStyle',
    value: function contentStyle() {
      var ret = {};

      if (this.parent().props.labelPosition === 'top' || this.parent().props.inline) return ret;

      var labelWidth = this.props.labelWidth || this.parent().props.labelWidth;

      if (labelWidth) {
        ret.marginLeft = parseInt(labelWidth);
      }

      return ret;
    }
  }, {
    key: 'fieldValue',
    value: function fieldValue() {
      var model = this.parent().props.model;
      if (!model || !this.props.prop) {
        return;
      }
      var temp = this.props.prop.split(':');
      return temp.length > 1 ? model[temp[0]][temp[1]] : model[this.props.prop];
    }
  }, {
    key: 'render',
    value: function render() {
      var _state2 = this.state,
          error = _state2.error,
          validating = _state2.validating;
      var _props = this.props,
          label = _props.label,
          required = _props.required;


      return _react2.default.createElement(
        'div',
        { style: this.style(), className: this.className('el-form-item', {
            'is-error': error !== '',
            'is-validating': validating,
            'is-required': this.isRequired() || required
          }), onBlur: this.onFieldBlur.bind(this), onChange: this.onFieldChange.bind(this) },
        label && _react2.default.createElement(
          'label',
          { className: 'el-form-item__label', style: this.labelStyle() },
          label + this.parent().props.labelSuffix
        ),
        _react2.default.createElement(
          'div',
          { className: 'el-form-item__content', style: this.contentStyle() },
          this.props.children,
          _react2.default.createElement(
            _libs.Transition,
            { name: 'el-zoom-in-top' },
            error && _react2.default.createElement(
              'div',
              { className: 'el-form-item__error' },
              error
            )
          )
        )
      );
    }
  }]);
  return FormItem;
}(_libs.Component);

var _default = FormItem;
exports.default = _default;


FormItem.contextTypes = {
  component: _libs.PropTypes.any
};

FormItem.childContextTypes = {
  form: _libs.PropTypes.any
};

FormItem.propTypes = {
  label: _libs.PropTypes.string,
  labelWidth: _libs.PropTypes.oneOfType([_libs.PropTypes.string, _libs.PropTypes.number]),
  prop: _libs.PropTypes.string,
  required: _libs.PropTypes.bool,
  rules: _libs.PropTypes.oneOfType([_libs.PropTypes.object, _libs.PropTypes.array])
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(FormItem, 'FormItem', 'src/form/FormItem.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/form/FormItem.jsx');
}();

;