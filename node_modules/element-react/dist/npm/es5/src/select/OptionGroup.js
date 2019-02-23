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

var OptionGroup = function (_Component) {
  (0, _inherits3.default)(OptionGroup, _Component);

  function OptionGroup() {
    (0, _classCallCheck3.default)(this, OptionGroup);
    return (0, _possibleConstructorReturn3.default)(this, (OptionGroup.__proto__ || Object.getPrototypeOf(OptionGroup)).apply(this, arguments));
  }

  (0, _createClass3.default)(OptionGroup, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'ul',
        { style: this.style(), className: this.className('el-select-group__wrap') },
        _react2.default.createElement(
          'li',
          { className: 'el-select-group__title' },
          this.props.label
        ),
        _react2.default.createElement(
          'li',
          null,
          _react2.default.createElement(
            'ul',
            { className: 'el-select-group' },
            this.props.children
          )
        )
      );
    }
  }]);
  return OptionGroup;
}(_libs.Component);

var _default = OptionGroup;
exports.default = _default;


OptionGroup.propTypes = {
  label: _libs.PropTypes.string
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(OptionGroup, 'OptionGroup', 'src/select/OptionGroup.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/select/OptionGroup.jsx');
}();

;