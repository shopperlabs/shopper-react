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

var _assets = require('./assets');

var _assets2 = _interopRequireDefault(_assets);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Toast = function (_Component) {
  (0, _inherits3.default)(Toast, _Component);

  function Toast(props) {
    (0, _classCallCheck3.default)(this, Toast);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Toast.__proto__ || Object.getPrototypeOf(Toast)).call(this, props));

    _this.state = {
      visible: false
    };
    return _this;
  }

  (0, _createClass3.default)(Toast, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.setState({
        visible: true
      });

      this.startTimer();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.stopTimer();
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

      if (this.props.duration > 0) {
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
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props = this.props,
          iconClass = _props.iconClass,
          customClass = _props.customClass;


      return _react2.default.createElement(
        _libs.Transition,
        { name: 'el-message-fade', onAfterLeave: function onAfterLeave() {
            _this3.props.willUnmount();
          } },
        _react2.default.createElement(
          _libs.View,
          { show: this.state.visible },
          _react2.default.createElement(
            'div',
            { className: this.classNames('el-message', customClass), onMouseEnter: this.stopTimer.bind(this), onMouseLeave: this.startTimer.bind(this) },
            !iconClass && _react2.default.createElement('img', { className: 'el-message__img', src: _assets2.default[this.props.type] }),
            _react2.default.createElement(
              'div',
              { className: this.classNames('el-message__group', { 'is-with-icon': iconClass }) },
              iconClass && _react2.default.createElement('i', { className: this.classNames('el-message__icon', iconClass) }),
              _react2.default.createElement(
                'p',
                null,
                this.props.message
              ),
              this.props.showClose && _react2.default.createElement('div', { className: 'el-message__closeBtn el-icon-close', onClick: this.onClose.bind(this) })
            )
          )
        )
      );
    }
  }]);
  return Toast;
}(_libs.Component);

var _default = Toast;
exports.default = _default;


Toast.propTypes = {
  type: _libs.PropTypes.oneOf(['success', 'warning', 'info', 'error']),
  message: _libs.PropTypes.oneOfType([_libs.PropTypes.string, _libs.PropTypes.element]).isRequired,
  duration: _libs.PropTypes.number,
  showClose: _libs.PropTypes.bool,
  customClass: _libs.PropTypes.string,
  iconClass: _libs.PropTypes.string
};

Toast.defaultProps = {
  type: 'info',
  duration: 3000,
  showClose: false
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Toast, 'Toast', 'src/message/Toast.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/message/Toast.jsx');
}();

;