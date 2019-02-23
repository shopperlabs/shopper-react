import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import * as React from 'react';
import { Component, PropTypes, Animate, View } from '../../libs';

var Transition = Animate.Transition;


var typeMap = {
  success: 'circle-check',
  info: 'information',
  warning: 'warning',
  error: 'circle-cross'
};

var Notification = function (_Component) {
  _inherits(Notification, _Component);

  function Notification(props) {
    _classCallCheck(this, Notification);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.state = { visible: true };
    return _this;
  }

  Notification.prototype.componentDidMount = function componentDidMount() {
    this.startTimer();
  };

  Notification.prototype.componentWillUnmount = function componentWillUnmount() {
    this.stopTimer();
  };

  Notification.prototype.onClick = function onClick() {
    if (this.props.onClick) {
      this.props.onClick();
    }
  };

  Notification.prototype.onClose = function onClose() {
    var _this2 = this;

    this.setState({ visible: false }, function () {
      return _this2.stopTimer();
    });
  };

  Notification.prototype.startTimer = function startTimer() {
    var _this3 = this;

    var duration = this.props.duration;

    if (duration) {
      this.timeout = setTimeout(function () {
        return _this3.onClose();
      }, duration);
    }
  };

  Notification.prototype.stopTimer = function stopTimer() {
    clearTimeout(this.timeout);
  };

  Notification.prototype.typeClass = function typeClass() {
    var type = this.props.type;

    return type && typeMap[type] ? 'el-icon-' + typeMap[type] : '';
  };

  Notification.prototype.render = function render() {
    var _this4 = this;

    var visible = this.state.visible;
    var _props = this.props,
        _props$onClose = _props.onClose,
        onClose = _props$onClose === undefined ? function () {
      return false;
    } : _props$onClose,
        willUnmount = _props.willUnmount,
        duration = _props.duration,
        top = _props.top,
        type = _props.type,
        iconClass = _props.iconClass,
        title = _props.title,
        message = _props.message;

    return React.createElement(
      Transition,
      {
        unmountOnExit: true,
        transitionClass: {
          exiting: 'el-notification-fade-leave-active',
          exited: 'el-notification-fade-enter'
        },
        'in': visible,
        onEnter: function onEnter() {
          _this4.offsetHeight = _this4.rootDOM.offsetHeight;
        },
        onExit: function onExit() {
          return willUnmount(_this4.offsetHeight, parseInt(_this4.rootDOM.style.top));
        },
        onExited: function onExited() {
          return onClose();
        }
      },
      React.createElement(
        View,
        { show: visible },
        React.createElement(
          'div',
          {
            ref: function ref(ele) {
              _this4.rootDOM = ele;
            },
            className: 'el-notification',
            style: {
              top: top,
              zIndex: 9999
            },
            onMouseEnter: this.stopTimer.bind(this),
            onMouseLeave: this.startTimer.bind(this),
            onClick: this.onClick.bind(this)
          },
          type && React.createElement('i', { className: this.classNames('el-notification__icon', this.typeClass(), iconClass) }),
          React.createElement(
            'div',
            {
              className: this.classNames('el-notification__group', {
                'is-with-icon': this.typeClass() || iconClass
              })
            },
            React.createElement(
              'h2',
              { className: 'el-notification__title' },
              title
            ),
            React.createElement(
              'div',
              { className: 'el-notification__content' },
              message
            ),
            React.createElement('div', { className: 'el-notification__closeBtn el-icon-close', onClick: this.onClose.bind(this) })
          )
        )
      )
    );
  };

  return Notification;
}(Component);

export default Notification;


Notification.propTypes = {
  type: PropTypes.oneOf(['success', 'warning', 'info', 'error']),
  title: PropTypes.string,
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  duration: PropTypes.number,
  iconClass: PropTypes.string,
  onClick: PropTypes.func,
  top: PropTypes.number
};

Notification.defaultProps = {
  duration: 4500,
  top: 16
};