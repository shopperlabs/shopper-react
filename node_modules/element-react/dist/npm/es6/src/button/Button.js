import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import { Component, PropTypes } from '../../libs';

var Button = function (_Component) {
  _inherits(Button, _Component);

  function Button() {
    _classCallCheck(this, Button);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  Button.prototype.onClick = function onClick(e) {
    if (!this.props.loading) {
      this.props.onClick && this.props.onClick(e);
    }
  };

  Button.prototype.render = function render() {
    return React.createElement(
      'button',
      { style: this.style(), className: this.className('el-button', this.props.type && 'el-button--' + this.props.type, this.props.size && 'el-button--' + this.props.size, {
          'is-disabled': this.props.disabled,
          'is-loading': this.props.loading,
          'is-plain': this.props.plain
        }), disabled: this.props.disabled, type: this.props.nativeType, onClick: this.onClick.bind(this) },
      this.props.loading && React.createElement('i', { className: 'el-icon-loading' }),
      this.props.icon && !this.props.loading && React.createElement('i', { className: 'el-icon-' + this.props.icon }),
      React.createElement(
        'span',
        null,
        this.props.children
      )
    );
  };

  return Button;
}(Component);

export default Button;


Button.propTypes = {
  onClick: PropTypes.func,
  type: PropTypes.string,
  size: PropTypes.string,
  icon: PropTypes.string,
  nativeType: PropTypes.string,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  plain: PropTypes.bool
};

Button.defaultProps = {
  type: 'default',
  nativeType: 'button',
  loading: false,
  disabled: false,
  plain: false
};