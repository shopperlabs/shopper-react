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

var RadioGroup = function (_Component) {
  (0, _inherits3.default)(RadioGroup, _Component);

  function RadioGroup() {
    (0, _classCallCheck3.default)(this, RadioGroup);
    return (0, _possibleConstructorReturn3.default)(this, (RadioGroup.__proto__ || Object.getPrototypeOf(RadioGroup)).apply(this, arguments));
  }

  (0, _createClass3.default)(RadioGroup, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        component: this
      };
    }
  }, {
    key: 'onChange',
    value: function onChange(value) {
      if (this.props.onChange) {
        this.props.onChange(value);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        { ref: 'RadioGroup', style: this.style(), className: this.className('el-radio-group') },
        _react2.default.Children.map(this.props.children, function (element) {
          if (!element) {
            return null;
          }

          var elementType = element.type.elementType;

          if (elementType !== 'Radio' && elementType !== 'RadioButton') {
            return null;
          }

          return _react2.default.cloneElement(element, Object.assign({}, element.props, {
            onChange: _this2.onChange.bind(_this2),
            model: _this2.props.value,
            size: _this2.props.size
          }));
        })
      );
    }
  }]);
  return RadioGroup;
}(_libs.Component);

var _default = RadioGroup;
exports.default = _default;


RadioGroup.childContextTypes = {
  component: _libs.PropTypes.any
};

RadioGroup.propTypes = {
  value: _libs.PropTypes.oneOfType([_libs.PropTypes.string, _libs.PropTypes.number]),
  disabled: _libs.PropTypes.bool,
  size: _libs.PropTypes.string,
  textColor: _libs.PropTypes.string,
  fill: _libs.PropTypes.string,
  onChange: _libs.PropTypes.func
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(RadioGroup, 'RadioGroup', 'src/radio/RadioGroup.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/radio/RadioGroup.jsx');
}();

;