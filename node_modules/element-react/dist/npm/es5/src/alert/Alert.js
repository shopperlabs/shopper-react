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

var TYPE_CLASSES_MAP = {
  'success': 'el-icon-circle-check',
  'warning': 'el-icon-warning',
  'error': 'el-icon-circle-cross'
};

var Alert = function (_Component) {
  (0, _inherits3.default)(Alert, _Component);

  function Alert(props) {
    (0, _classCallCheck3.default)(this, Alert);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Alert.__proto__ || Object.getPrototypeOf(Alert)).call(this, props));

    _this.state = {
      visible: true
    };
    return _this;
  }

  (0, _createClass3.default)(Alert, [{
    key: 'close',
    value: function close() {
      this.setState({
        visible: false
      });
    }
  }, {
    key: 'onAfterLeave',
    value: function onAfterLeave() {
      if (this.props.onClose) {
        this.props.onClose();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _libs.Transition,
        { name: 'el-alert-fade', onAfterLeave: this.onAfterLeave.bind(this) },
        _react2.default.createElement(
          _libs.View,
          { show: this.state.visible },
          _react2.default.createElement(
            'div',
            { style: this.style(), className: this.className('el-alert', 'el-alert--' + this.props.type) },
            this.props.showIcon && _react2.default.createElement('i', { className: this.classNames('el-alert__icon', TYPE_CLASSES_MAP[this.props.type] || 'el-icon-information', {
                'is-big': this.props.description
              }) }),
            _react2.default.createElement(
              'div',
              { className: 'el-alert__content' },
              this.props.title && _react2.default.createElement(
                'span',
                { className: this.classNames('el-alert__title', {
                    'is-bold': this.props.description
                  }) },
                this.props.title
              ),
              this.props.description && _react2.default.createElement(
                'p',
                { className: 'el-alert__description' },
                this.props.description
              ),
              _react2.default.createElement(
                _libs.View,
                { show: this.props.closable },
                _react2.default.createElement(
                  'i',
                  { className: this.classNames('el-alert__closebtn', this.props.closeText ? 'is-customed' : 'el-icon-close'), onClick: this.close.bind(this) },
                  this.props.closeText
                )
              )
            )
          )
        )
      );
    }
  }]);
  return Alert;
}(_libs.Component);

var _default = Alert;
exports.default = _default;


Alert.propTypes = {
  onClose: _libs.PropTypes.func,
  title: _libs.PropTypes.string.isRequired,
  description: _libs.PropTypes.string,
  type: _libs.PropTypes.string,
  closable: _libs.PropTypes.bool,
  closeText: _libs.PropTypes.string,
  showIcon: _libs.PropTypes.bool
};

Alert.defaultProps = {
  type: 'info',
  closable: true
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(TYPE_CLASSES_MAP, 'TYPE_CLASSES_MAP', 'src/alert/Alert.jsx');

  __REACT_HOT_LOADER__.register(Alert, 'Alert', 'src/alert/Alert.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/alert/Alert.jsx');
}();

;