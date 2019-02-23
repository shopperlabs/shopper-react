import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import { Component, PropTypes } from '../../libs';

var Form = function (_Component) {
  _inherits(Form, _Component);

  function Form(props) {
    _classCallCheck(this, Form);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.state = {
      fields: []
    };
    return _this;
  }

  Form.prototype.componentDidUpdate = function componentDidUpdate(newProps) {
    var model = newProps.model;

    var oldModel = this.props.model;
    if (!model) return;
    var diff = Object.keys(model).filter(function (key) {
      return model[key] !== oldModel[key];
    });
    if (diff.length) {
      this.state.fields.filter(function (_ref) {
        var props = _ref.props;
        return props.prop.match(diff);
      }).map(function (field) {
        return field.validate('', function () {
          return undefined;
        });
      });
    }
  };

  Form.prototype.getChildContext = function getChildContext() {
    return {
      component: this
    };
  };

  Form.prototype.addField = function addField(field) {
    this.state.fields.push(field);
  };

  Form.prototype.removeField = function removeField(field) {
    if (field.props.prop) {
      this.state.fields.splice(this.state.fields.indexOf(field), 1);
    }
  };

  Form.prototype.resetFields = function resetFields() {
    this.state.fields.forEach(function (field) {
      field.resetField();
    });
  };

  Form.prototype.validate = function validate(callback) {
    var _this2 = this;

    var valid = true;
    var count = 0;

    // 如果需要验证的fields为空，调用验证时立刻返回callback
    if (this.state.fields.length === 0 && callback) {
      callback(true);
    }

    this.state.fields.forEach(function (field) {
      field.validate('', function (errors) {
        if (errors) {
          valid = false;
        }
        if (typeof callback === 'function' && ++count === _this2.state.fields.length) {
          callback(valid);
        }
      });
    });
  };

  Form.prototype.validateField = function validateField(prop, cb) {
    var field = this.state.fields.filter(function (field) {
      return field.props.prop === prop;
    })[0];

    if (!field) {
      throw new Error('must call validateField with valid prop string!');
    }

    field.validate('', cb);
  };

  Form.prototype.render = function render() {
    return React.createElement(
      'form',
      { style: this.style(), className: this.className('el-form', this.props.labelPosition && 'el-form--label-' + this.props.labelPosition, {
          'el-form--inline': this.props.inline
        }), onSubmit: this.props.onSubmit },
      this.props.children
    );
  };

  return Form;
}(Component);

export default Form;


Form.childContextTypes = {
  component: PropTypes.any
};

Form.propTypes = {
  model: PropTypes.object,
  rules: PropTypes.object,
  labelPosition: PropTypes.oneOf(['right', 'left', 'top']),
  labelWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  labelSuffix: PropTypes.string,
  inline: PropTypes.bool,
  onSubmit: PropTypes.func
};

Form.defaultProps = {
  labelPosition: 'right',
  labelSuffix: ''
};