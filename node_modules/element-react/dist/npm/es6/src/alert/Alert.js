import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import { Component, PropTypes, Transition, View } from '../../libs';

var TYPE_CLASSES_MAP = {
  'success': 'el-icon-circle-check',
  'warning': 'el-icon-warning',
  'error': 'el-icon-circle-cross'
};

var Alert = function (_Component) {
  _inherits(Alert, _Component);

  function Alert(props) {
    _classCallCheck(this, Alert);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.state = {
      visible: true
    };
    return _this;
  }

  Alert.prototype.close = function close() {
    this.setState({
      visible: false
    });
  };

  Alert.prototype.onAfterLeave = function onAfterLeave() {
    if (this.props.onClose) {
      this.props.onClose();
    }
  };

  Alert.prototype.render = function render() {
    return React.createElement(
      Transition,
      { name: 'el-alert-fade', onAfterLeave: this.onAfterLeave.bind(this) },
      React.createElement(
        View,
        { show: this.state.visible },
        React.createElement(
          'div',
          { style: this.style(), className: this.className('el-alert', 'el-alert--' + this.props.type) },
          this.props.showIcon && React.createElement('i', { className: this.classNames('el-alert__icon', TYPE_CLASSES_MAP[this.props.type] || 'el-icon-information', {
              'is-big': this.props.description
            }) }),
          React.createElement(
            'div',
            { className: 'el-alert__content' },
            this.props.title && React.createElement(
              'span',
              { className: this.classNames('el-alert__title', {
                  'is-bold': this.props.description
                }) },
              this.props.title
            ),
            this.props.description && React.createElement(
              'p',
              { className: 'el-alert__description' },
              this.props.description
            ),
            React.createElement(
              View,
              { show: this.props.closable },
              React.createElement(
                'i',
                { className: this.classNames('el-alert__closebtn', this.props.closeText ? 'is-customed' : 'el-icon-close'), onClick: this.close.bind(this) },
                this.props.closeText
              )
            )
          )
        )
      )
    );
  };

  return Alert;
}(Component);

export default Alert;


Alert.propTypes = {
  onClose: PropTypes.func,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  type: PropTypes.string,
  closable: PropTypes.bool,
  closeText: PropTypes.string,
  showIcon: PropTypes.bool
};

Alert.defaultProps = {
  type: 'info',
  closable: true
};