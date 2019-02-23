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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Component = function (_React$Component) {
  (0, _inherits3.default)(Component, _React$Component);

  function Component() {
    (0, _classCallCheck3.default)(this, Component);
    return (0, _possibleConstructorReturn3.default)(this, (Component.__proto__ || Object.getPrototypeOf(Component)).apply(this, arguments));
  }

  (0, _createClass3.default)(Component, [{
    key: 'classNames',
    value: function classNames() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return (0, _classnames2.default)(args);
    }
  }, {
    key: 'className',
    value: function className() {
      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return this.classNames.apply(this, args.concat([this.props.className]));
    }
  }, {
    key: 'style',
    value: function style(args) {
      return Object.assign({}, args, this.props.style);
    }
  }]);
  return Component;
}(_react2.default.Component);

var _default = Component;
exports.default = _default;


Component.propTypes = {
  className: _propTypes2.default.string,
  style: _propTypes2.default.object
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Component, 'Component', 'libs/component/index.js');

  __REACT_HOT_LOADER__.register(_default, 'default', 'libs/component/index.js');
}();

;