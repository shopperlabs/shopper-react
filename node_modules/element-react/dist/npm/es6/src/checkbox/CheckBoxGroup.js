import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import { Component, PropTypes } from '../../libs';

var CheckboxGroup = function (_Component) {
  _inherits(CheckboxGroup, _Component);

  function CheckboxGroup(props) {
    _classCallCheck(this, CheckboxGroup);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.state = {
      options: _this.props.value || []
    };
    return _this;
  }

  CheckboxGroup.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({
        options: nextProps.value
      });
    }
  };

  CheckboxGroup.prototype.getChildContext = function getChildContext() {
    return {
      ElCheckboxGroup: this
    };
  };

  CheckboxGroup.prototype.onChange = function onChange(value, checked) {
    var index = this.state.options.indexOf(value);

    if (checked) {
      if (index === -1) {
        this.state.options.push(value);
      }
    } else {
      this.state.options.splice(index, 1);
    }

    this.forceUpdate();

    if (this.props.onChange) {
      this.props.onChange(this.state.options);
    }
  };

  CheckboxGroup.prototype.render = function render() {
    var _this2 = this;

    var options = this.state.options;


    var children = React.Children.map(this.props.children, function (child, index) {
      if (!child) {
        return null;
      }

      var elementType = child.type.elementType;
      // 过滤非Checkbox和CheckboxButton的子组件

      if (elementType !== 'Checkbox' && elementType !== 'CheckboxButton') {
        return null;
      }

      return React.cloneElement(child, Object.assign({}, child.props, {
        key: index,
        checked: child.props.checked || options.indexOf(child.props.value) >= 0 || options.indexOf(child.props.label) >= 0,
        onChange: _this2.onChange.bind(_this2, child.props.value || child.props.label)
      }));
    });

    return React.createElement(
      'div',
      { style: this.style(), className: this.className('el-checkbox-group') },
      children
    );
  };

  return CheckboxGroup;
}(Component);

export default CheckboxGroup;


CheckboxGroup.childContextTypes = {
  ElCheckboxGroup: PropTypes.any
};

CheckboxGroup.propTypes = {
  min: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  max: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  size: PropTypes.string,
  fill: PropTypes.string,
  textColor: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func
};