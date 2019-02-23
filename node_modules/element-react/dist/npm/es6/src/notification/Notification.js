import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import { Component, PropTypes, Transition, View } from '../../libs';

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

    _this.state = {
      visible: false
    };
    return _this;
  }

  Notification.prototype.componentDidMount = function componentDidMount() {
    this.setState({ visible: true });
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
    this.stopTimer();

    this.setState({
      visible: false
    });
  };

  Notification.prototype.startTimer = function startTimer() {
    var _this2 = this;

    if (this.props.duration) {
      this.timeout = setTimeout(function () {
        _this2.onClose();
      }, this.props.duration);
    }
  };

  Notification.prototype.stopTimer = function stopTimer() {
    clearTimeout(this.timeout);
  };

  Notification.prototype.typeClass = function typeClass() {
    return this.props.type && typeMap[this.props.type] ? 'el-icon-' + typeMap[this.props.type] : '';
  };

  Notification.prototype.render = function render() {
    var _this3 = this;

    return React.createElement(
      Transition,
      {
        name: 'el-notification-fade',
        onAfterEnter: function onAfterEnter() {
          _this3.offsetHeight = _this3.rootDOM.offsetHeight;
        },
        onLeave: function onLeave() {
          _this3.props.onClose && _this3.props.onClose();
        },
        onAfterLeave: function onAfterLeave() {
          _this3.props.willUnmount(_this3.offsetHeight, parseInt(_this3.rootDOM.style.top));
        }
      },
      React.createElement(
        View,
        { show: this.state.visible },
        React.createElement(
          'div',
          {
            ref: function ref(ele) {
              _this3.rootDOM = ele;
            },
            className: 'el-notification',
            style: {
              top: this.props.top,
              zIndex: 9999
            },
            onMouseEnter: this.stopTimer.bind(this),
            onMouseLeave: this.startTimer.bind(this),
            onClick: this.onClick.bind(this)
          },
          this.props.type && React.createElement('i', { className: this.classNames('el-notification__icon', this.typeClass(), this.props.iconClass) }),
          React.createElement(
            'div',
            { className: this.classNames('el-notification__group', {
                'is-with-icon': this.typeClass() || this.props.iconClass
              }) },
            React.createElement(
              'h2',
              { className: 'el-notification__title' },
              this.props.title
            ),
            React.createElement(
              'div',
              { className: 'el-notification__content' },
              this.props.message
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