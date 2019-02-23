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

var CheckboxGroup = function (_Component) {
  (0, _inherits3.default)(CheckboxGroup, _Component);

  function CheckboxGroup(props) {
    (0, _classCallCheck3.default)(this, CheckboxGroup);

    var _this = (0, _possibleConstructorReturn3.default)(this, (CheckboxGroup.__proto__ || Object.getPrototypeOf(CheckboxGroup)).call(this, props));

    _this.state = {
      options: _this.props.value || []
    };
    return _this;
  }

  (0, _createClass3.default)(CheckboxGroup, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.value !== this.props.value) {
        this.setState({
          options: nextProps.value
        });
      }
    }
  }, {
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        ElCheckboxGroup: this
      };
    }
  }, {
    key: 'onChange',
    value: function onChange(value, checked) {
      var index = this.state.options.indexOf(value);

      if (checked) {
        if (index === -1) {
          this.state.options.push(value);
        }
      } else {
        this.state.options.splice(index, 1);
      }

      this.forceUpdate();

      if (this.props.onChange) {
        this.props.onChange(this.state.options);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var options = this.state.options;


      var children = _react2.default.Children.map(this.props.children, function (child, index) {
        if (!child) {
          return null;
        }

        var elementType = child.type.elementType;
        // 过滤非Checkbox和CheckboxButton的子组件

        if (elementType !== 'Checkbox' && elementType !== 'CheckboxButton') {
          return null;
        }

        return _react2.default.cloneElement(child, Object.assign({}, child.props, {
          key: index,
          checked: child.props.checked || options.indexOf(child.props.value) >= 0 || options.indexOf(child.props.label) >= 0,
          onChange: _this2.onChange.bind(_this2, child.props.value || child.props.label)
        }));
      });

      return _react2.default.createElement(
        'div',
        { style: this.style(), className: this.className('el-checkbox-group') },
        children
      );
    }
  }]);
  return CheckboxGroup;
}(_libs.Component);

var _default = CheckboxGroup;
exports.default = _default;


CheckboxGroup.childContextTypes = {
  ElCheckboxGroup: _libs.PropTypes.any
};

CheckboxGroup.propTypes = {
  min: _libs.PropTypes.oneOfType([_libs.PropTypes.string, _libs.PropTypes.number]),
  max: _libs.PropTypes.oneOfType([_libs.PropTypes.string, _libs.PropTypes.number]),
  size: _libs.PropTypes.string,
  fill: _libs.PropTypes.string,
  textColor: _libs.PropTypes.string,
  value: _libs.PropTypes.any,
  onChange: _libs.PropTypes.func
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(CheckboxGroup, 'CheckboxGroup', 'src/checkbox/CheckBoxGroup.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/checkbox/CheckBoxGroup.jsx');
}();

;