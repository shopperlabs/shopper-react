import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import { Component, PropTypes, Transition, View } from '../../libs';
import icons from './assets';

var Toast = function (_Component) {
  _inherits(Toast, _Component);

  function Toast(props) {
    _classCallCheck(this, Toast);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.state = {
      visible: false
    };
    return _this;
  }

  Toast.prototype.componentDidMount = function componentDidMount() {
    this.setState({
      visible: true
    });

    this.startTimer();
  };

  Toast.prototype.componentWillUnmount = function componentWillUnmount() {
    this.stopTimer();
  };

  Toast.prototype.onClose = function onClose() {
    this.stopTimer();

    this.setState({
      visible: false
    });
  };

  Toast.prototype.startTimer = function startTimer() {
    var _this2 = this;

    if (this.props.duration > 0) {
      this.timeout = setTimeout(function () {
        _this2.onClose();
      }, this.props.duration);
    }
  };

  Toast.prototype.stopTimer = function stopTimer() {
    clearTimeout(this.timeout);
  };

  Toast.prototype.render = function render() {
    var _this3 = this;

    var _props = this.props,
        iconClass = _props.iconClass,
        customClass = _props.customClass;


    return React.createElement(
      Transition,
      { name: 'el-message-fade', onAfterLeave: function onAfterLeave() {
          _this3.props.willUnmount();
        } },
      React.createElement(
        View,
        { show: this.state.visible },
        React.createElement(
          'div',
          { className: this.classNames('el-message', customClass), onMouseEnter: this.stopTimer.bind(this), onMouseLeave: this.startTimer.bind(this) },
          !iconClass && React.createElement('img', { className: 'el-message__img', src: icons[this.props.type] }),
          React.createElement(
            'div',
            { className: this.classNames('el-message__group', { 'is-with-icon': iconClass }) },
            iconClass && React.createElement('i', { className: this.classNames('el-message__icon', iconClass) }),
            React.createElement(
              'p',
              null,
              this.props.message
            ),
            this.props.showClose && React.createElement('div', { className: 'el-message__closeBtn el-icon-close', onClick: this.onClose.bind(this) })
          )
        )
      )
    );
  };

  return Toast;
}(Component);

export default Toast;


Toast.propTypes = {
  type: PropTypes.oneOf(['success', 'warning', 'info', 'error']),
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
  duration: PropTypes.number,
  showClose: PropTypes.bool,
  customClass: PropTypes.string,
  iconClass: PropTypes.string
};

Toast.defaultProps = {
  type: 'info',
  duration: 3000,
  showClose: false
};