import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import { Component, PropTypes } from '../../libs';

var RadioGroup = function (_Component) {
  _inherits(RadioGroup, _Component);

  function RadioGroup() {
    _classCallCheck(this, RadioGroup);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  RadioGroup.prototype.getChildContext = function getChildContext() {
    return {
      component: this
    };
  };

  RadioGroup.prototype.onChange = function onChange(value) {
    if (this.props.onChange) {
      this.props.onChange(value);
    }
  };

  RadioGroup.prototype.render = function render() {
    var _this2 = this;

    return React.createElement(
      'div',
      { ref: 'RadioGroup', style: this.style(), className: this.className('el-radio-group') },
      React.Children.map(this.props.children, function (element) {
        if (!element) {
          return null;
        }

        var elementType = element.type.elementType;

        if (elementType !== 'Radio' && elementType !== 'RadioButton') {
          return null;
        }

        return React.cloneElement(element, Object.assign({}, element.props, {
          onChange: _this2.onChange.bind(_this2),
          model: _this2.props.value,
          size: _this2.props.size
        }));
      })
    );
  };

  return RadioGroup;
}(Component);

export default RadioGroup;


RadioGroup.childContextTypes = {
  component: PropTypes.any
};

RadioGroup.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
  size: PropTypes.string,
  textColor: PropTypes.string,
  fill: PropTypes.string,
  onChange: PropTypes.func
};