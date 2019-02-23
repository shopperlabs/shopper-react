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

var Switch = function (_Component) {
  (0, _inherits3.default)(Switch, _Component);

  function Switch(props) {
    (0, _classCallCheck3.default)(this, Switch);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Switch.__proto__ || Object.getPrototypeOf(Switch)).call(this, props));

    _this.state = {
      value: props.value,
      coreWidth: props.width,
      buttonStyle: {
        transform: ''
      }
    };
    return _this;
  }

  (0, _createClass3.default)(Switch, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.width === 0) {
        this.state.coreWidth = this.hasText() ? 58 : 46;
      }

      this.updateSwitch();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      var _this2 = this;

      this.setState({ value: props.value }, function () {
        _this2.updateSwitch();
      });

      if (props.width) {
        this.setState({ coreWidth: props.width });
      }
    }
  }, {
    key: 'updateSwitch',
    value: function updateSwitch() {
      this.handleButtonTransform();

      if (this.props.onColor || this.props.offColor) {
        this.setBackgroundColor();
      }
    }
  }, {
    key: 'hasText',
    value: function hasText() {
      return this.props.onText || this.props.offText;
    }
  }, {
    key: 'setBackgroundColor',
    value: function setBackgroundColor() {
      var newColor = this.state.value === this.props.onValue ? this.props.onColor : this.props.offColor;

      this.refs.core.style.borderColor = newColor;
      this.refs.core.style.backgroundColor = newColor;
    }
  }, {
    key: 'setFocus',
    value: function setFocus() {
      if (this.props.allowFocus) {
        this.refs.input.focus();
      }
    }
  }, {
    key: 'handleFocus',
    value: function handleFocus(e) {
      if (this.props.allowFocus) {
        this.props.onFocus(e);
      }
    }
  }, {
    key: 'handleBlur',
    value: function handleBlur(e) {
      if (this.props.allowFocus) {
        this.props.onBlur(e);
      }
    }
  }, {
    key: 'handleChange',
    value: function handleChange(e) {
      var _this3 = this;

      this.setState({
        value: e.target.checked ? this.props.onValue : this.props.offValue
      }, function () {
        _this3.updateSwitch();

        if (_this3.props.onChange) {
          _this3.props.onChange(_this3.state.value);
        }
      });
    }
  }, {
    key: 'handleButtonTransform',
    value: function handleButtonTransform() {
      var _state = this.state,
          value = _state.value,
          coreWidth = _state.coreWidth,
          buttonStyle = _state.buttonStyle;

      buttonStyle.transform = value === this.props.onValue ? 'translate(' + (coreWidth - 20) + 'px, 2px)' : 'translate(2px, 2px)';

      this.setState({ buttonStyle: buttonStyle });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          name = _props.name,
          disabled = _props.disabled,
          onText = _props.onText,
          offText = _props.offText,
          onValue = _props.onValue,
          onIconClass = _props.onIconClass,
          offIconClass = _props.offIconClass,
          allowFocus = _props.allowFocus;
      var _state2 = this.state,
          value = _state2.value,
          coreWidth = _state2.coreWidth,
          buttonStyle = _state2.buttonStyle;


      return _react2.default.createElement(
        'label',
        {
          style: this.style(),
          className: this.className('el-switch', {
            'is-disabled': disabled,
            'el-switch--wide': this.hasText(),
            'is-checked': value === onValue
          }) },
        _react2.default.createElement(
          _libs.View,
          { show: disabled },
          _react2.default.createElement('div', { className: 'el-switch__mask' })
        ),
        _react2.default.createElement('input', {
          className: this.className('el-switch__input', {
            'allow-focus': allowFocus
          }),
          type: 'checkbox',
          checked: value === onValue,
          name: name,
          ref: 'input',
          disabled: disabled,
          onChange: this.handleChange.bind(this),
          onFocus: this.handleFocus.bind(this),
          onBlur: this.handleBlur.bind(this)
        }),
        _react2.default.createElement(
          'span',
          { className: 'el-switch__core', ref: 'core', style: { 'width': coreWidth + 'px' } },
          _react2.default.createElement('span', { className: 'el-switch__button', style: Object.assign({}, buttonStyle), onClick: this.setFocus.bind(this) })
        ),
        _react2.default.createElement(
          _libs.Transition,
          { name: 'label-fade' },
          _react2.default.createElement(
            _libs.View,
            { show: value === onValue },
            _react2.default.createElement(
              'div',
              {
                className: 'el-switch__label el-switch__label--left',
                style: { 'width': coreWidth + 'px' }
              },
              onIconClass && _react2.default.createElement('i', { className: onIconClass }),
              !onIconClass && onText && _react2.default.createElement(
                'span',
                null,
                onText
              )
            )
          )
        ),
        _react2.default.createElement(
          _libs.Transition,
          { name: 'label-fade' },
          _react2.default.createElement(
            _libs.View,
            { show: value !== onValue },
            _react2.default.createElement(
              'div',
              {
                className: 'el-switch__label el-switch__label--right',
                style: { 'width': coreWidth + 'px' }
              },
              offIconClass && _react2.default.createElement('i', { className: offIconClass }),
              !offIconClass && offText && _react2.default.createElement(
                'span',
                null,
                offText
              )
            )
          )
        )
      );
    }
  }]);
  return Switch;
}(_libs.Component);

var _default = Switch;
exports.default = _default;


Switch.propTypes = {
  value: _libs.PropTypes.oneOfType([_libs.PropTypes.number, _libs.PropTypes.string, _libs.PropTypes.bool]),
  disabled: _libs.PropTypes.bool,
  width: _libs.PropTypes.number,
  onIconClass: _libs.PropTypes.string,
  offIconClass: _libs.PropTypes.string,
  onText: _libs.PropTypes.string,
  offText: _libs.PropTypes.string,
  onColor: _libs.PropTypes.string,
  offColor: _libs.PropTypes.string,
  onValue: _libs.PropTypes.oneOfType([_libs.PropTypes.number, _libs.PropTypes.string, _libs.PropTypes.bool]),
  offValue: _libs.PropTypes.oneOfType([_libs.PropTypes.number, _libs.PropTypes.string, _libs.PropTypes.bool]),
  name: _libs.PropTypes.string,
  onChange: _libs.PropTypes.func,
  onBlur: _libs.PropTypes.func,
  onFocus: _libs.PropTypes.func,
  allowFocus: _libs.PropTypes.bool
};

Switch.defaultProps = {
  value: true,
  disabled: false,
  width: 0,
  onIconClass: '',
  offIconClass: '',
  onText: 'ON',
  offText: 'OFF',
  onValue: true,
  offValue: false,
  onColor: '',
  offColor: '',
  name: '',
  allowFocus: false
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Switch, 'Switch', 'src/switch/Switch.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/switch/Switch.jsx');
}();

;