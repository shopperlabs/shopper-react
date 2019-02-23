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

var _input = require('../input');

var _input2 = _interopRequireDefault(_input);

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var InputNumber = function (_Component) {
  (0, _inherits3.default)(InputNumber, _Component);

  function InputNumber(props) {
    (0, _classCallCheck3.default)(this, InputNumber);

    var _this = (0, _possibleConstructorReturn3.default)(this, (InputNumber.__proto__ || Object.getPrototypeOf(InputNumber)).call(this, props));

    _this.state = {
      value: props.defaultValue,
      inputActive: false
    };
    return _this;
  }

  (0, _createClass3.default)(InputNumber, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(props) {
      if (props.value != this.props.value) {
        this.setState({ value: props.value });
      }
    }
  }, {
    key: 'onKeyDown',
    value: function onKeyDown(e) {
      switch (e.keyCode) {
        case 38:
          // KeyUp
          e.preventDefault();
          this.increase();
          break;
        case 40:
          // KeyDown
          e.preventDefault();
          this.decrease();
          break;
        default:
          break;
      }
    }
  }, {
    key: 'onBlur',
    value: function onBlur() {
      var value = this.state.value;

      if (this.isValid) {
        value = Number(value);

        if (value > this.props.max) {
          value = Number(this.props.max);
        } else if (value < this.props.min) {
          value = Number(this.props.min);
        }
      } else {
        value = undefined;
      }

      this.setState({ value: value }, this.onChange);
    }
  }, {
    key: 'onInput',
    value: function onInput(value) {
      var _this2 = this;

      this.setState({ value: value }, function () {
        clearTimeout(_this2.timeout);

        _this2.timeout = setTimeout(function () {
          _this2.onBlur();
        }, 750);
      });
    }
  }, {
    key: 'onChange',
    value: function onChange() {
      if (this.props.onChange) {
        this.props.onChange(this.state.value);
      }
    }
  }, {
    key: 'increase',
    value: function increase() {
      var _props = this.props,
          step = _props.step,
          max = _props.max,
          disabled = _props.disabled,
          min = _props.min;
      var _state = this.state,
          value = _state.value,
          inputActive = _state.inputActive;


      if (this.maxDisabled) {
        inputActive = false;
      } else {
        if (value + Number(step) > max || disabled) return;
        if (value + Number(step) < min) value = min - Number(step);

        value = (0, _util.accAdd)(step, value);
      }

      this.setState({ value: value, inputActive: inputActive }, this.onChange);
    }
  }, {
    key: 'decrease',
    value: function decrease() {
      var _props2 = this.props,
          step = _props2.step,
          min = _props2.min,
          disabled = _props2.disabled,
          max = _props2.max;
      var _state2 = this.state,
          value = _state2.value,
          inputActive = _state2.inputActive;


      if (this.minDisabled) {
        inputActive = false;
      } else {
        if (value - Number(step) < min || disabled) return;
        if (value - Number(step) > max) value = Number(max) + Number(step);
        value = (0, _util.accSub)(value, step);
      }

      this.setState({ value: value, inputActive: inputActive }, this.onChange);
    }
  }, {
    key: 'activeInput',
    value: function activeInput(disabled) {
      if (!this.props.disabled && !disabled) {
        this.setState({
          inputActive: true
        });
      }
    }
  }, {
    key: 'inactiveInput',
    value: function inactiveInput(disabled) {
      if (!this.props.disabled && !disabled) {
        this.setState({
          inputActive: false
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props3 = this.props,
          controls = _props3.controls,
          disabled = _props3.disabled,
          size = _props3.size;
      var _state3 = this.state,
          value = _state3.value,
          inputActive = _state3.inputActive;


      return _react2.default.createElement(
        'div',
        { style: this.style(), className: this.className('el-input-number', size && 'el-input-number--' + size, {
            'is-disabled': disabled,
            'is-without-controls': !controls
          }) },
        controls && _react2.default.createElement(
          'span',
          {
            className: this.classNames("el-input-number__decrease", {
              'is-disabled': this.minDisabled
            }),
            onClick: this.decrease.bind(this)
          },
          _react2.default.createElement('i', { className: 'el-icon-minus' })
        ),
        controls && _react2.default.createElement(
          'span',
          {
            className: this.classNames("el-input-number__increase", {
              'is-disabled': this.maxDisabled
            }),
            onClick: this.increase.bind(this)
          },
          _react2.default.createElement('i', { className: 'el-icon-plus' })
        ),
        _react2.default.createElement(_input2.default, {
          ref: 'input',
          className: this.classNames({
            'is-active': inputActive
          }),
          value: value,
          disabled: disabled,
          size: size,
          onChange: this.onInput.bind(this),
          onKeyDown: this.onKeyDown.bind(this),
          onBlur: this.onBlur.bind(this) })
      );
    }
  }, {
    key: 'isValid',
    get: function get() {
      return this.state.value !== '' && !isNaN(Number(this.state.value));
    }
  }, {
    key: 'minDisabled',
    get: function get() {
      return !this.isValid || this.state.value - Number(this.props.step) < this.props.min;
    }
  }, {
    key: 'maxDisabled',
    get: function get() {
      return !this.isValid || this.state.value + Number(this.props.step) > this.props.max;
    }
  }]);
  return InputNumber;
}(_libs.Component);

var _default = InputNumber;
exports.default = _default;


InputNumber.propTypes = {
  defaultValue: _libs.PropTypes.number,
  value: _libs.PropTypes.number,
  step: _libs.PropTypes.oneOfType([_libs.PropTypes.number, _libs.PropTypes.string]),
  max: _libs.PropTypes.oneOfType([_libs.PropTypes.number, _libs.PropTypes.string]),
  min: _libs.PropTypes.oneOfType([_libs.PropTypes.number, _libs.PropTypes.string]),
  disabled: _libs.PropTypes.bool,
  controls: _libs.PropTypes.bool,
  size: _libs.PropTypes.string,
  onChange: _libs.PropTypes.func
};

InputNumber.defaultProps = {
  step: 1,
  controls: true,
  max: Infinity,
  min: 0
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(InputNumber, 'InputNumber', 'src/input-number/InputNumber.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/input-number/InputNumber.jsx');
}();

;