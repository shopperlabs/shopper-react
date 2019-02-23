'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _libs = require('../../libs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var typeMap = {
  success: 'circle-check',
  info: 'information',
  warning: 'warning',
  error: 'circle-cross'
};

var Notification = function (_Component) {
  (0, _inherits3.default)(Notification, _Component);

  function Notification(props) {
    (0, _classCallCheck3.default)(this, Notification);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Notification.__proto__ || Object.getPrototypeOf(Notification)).call(this, props));

    _this.state = {
      visible: false
    };
    return _this;
  }

  (0, _createClass3.default)(Notification, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setState({ visible: true });
      this.startTimer();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.stopTimer();
    }
  }, {
    key: 'onClick',
    value: function onClick() {
      if (this.props.onClick) {
        this.props.onClick();
      }
    }
  }, {
    key: 'onClose',
    value: function onClose() {
      this.stopTimer();

      this.setState({
        visible: false
      });
    }
  }, {
    key: 'startTimer',
    value: function startTimer() {
      var _this2 = this;

      if (this.props.duration) {
        this.timeout = setTimeout(function () {
          _this2.onClose();
        }, this.props.duration);
      }
    }
  }, {
    key: 'stopTimer',
    value: function stopTimer() {
      clearTimeout(this.timeout);
    }
  }, {
    key: 'typeClass',
    value: function typeClass() {
      return this.props.type && typeMap[this.props.type] ? 'el-icon-' + typeMap[this.props.type] : '';
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      return _react2.default.createElement(
        _libs.Transition,
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
        _react2.default.createElement(
          _libs.View,
          { show: this.state.visible },
          _react2.default.createElement(
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
            this.props.type && _react2.default.createElement('i', { className: this.classNames('el-notification__icon', this.typeClass(), this.props.iconClass) }),
            _react2.default.createElement(
              'div',
              { className: this.classNames('el-notification__group', {
                  'is-with-icon': this.typeClass() || this.props.iconClass
                }) },
              _react2.default.createElement(
                'h2',
                { className: 'el-notification__title' },
                this.props.title
              ),
              _react2.default.createElement(
                'div',
                { className: 'el-notification__content' },
                this.props.message
              ),
              _react2.default.createElement('div', { className: 'el-notification__closeBtn el-icon-close', onClick: this.onClose.bind(this) })
            )
          )
        )
      );
    }
  }]);
  return Notification;
}(_libs.Component);

var _default = Notification;
exports.default = _default;


Notification.propTypes = {
  type: _libs.PropTypes.oneOf(['success', 'warning', 'info', 'error']),
  title: _libs.PropTypes.string,
  message: _libs.PropTypes.oneOfType([_libs.PropTypes.string, _libs.PropTypes.element]),
  duration: _libs.PropTypes.number,
  iconClass: _libs.PropTypes.string,
  onClick: _libs.PropTypes.func,
  top: _libs.PropTypes.number
};

Notification.defaultProps = {
  duration: 4500,
  top: 16
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(typeMap, 'typeMap', 'src/notification/Notification.jsx');

  __REACT_HOT_LOADER__.register(Notification, 'Notification', 'src/notification/Notification.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/notification/Notification.jsx');
}();

;