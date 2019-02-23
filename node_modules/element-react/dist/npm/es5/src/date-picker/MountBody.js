'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MountBody = undefined;

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

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MountBody = exports.MountBody = function (_Component) {
  (0, _inherits3.default)(MountBody, _Component);

  function MountBody() {
    (0, _classCallCheck3.default)(this, MountBody);
    return (0, _possibleConstructorReturn3.default)(this, (MountBody.__proto__ || Object.getPrototypeOf(MountBody)).apply(this, arguments));
  }

  (0, _createClass3.default)(MountBody, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var c = _react2.default.cloneElement(this.props.children);
      this.tnode = document.createElement('div');
      document.body.appendChild(this.tnode);
      _reactDom2.default.render(c, this.tnode);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _reactDom2.default.unmountComponentAtNode(this.tnode);
      document.body.removeChild(this.tnode);
    }
  }, {
    key: 'contains',
    value: function contains(evt) {
      var parent = this.tnode.childNodes[0];
      var rect = parent.getBoundingClientRect();
      var isContain = evt.clientX >= rect.left && evt.clientX <= rect.right && evt.clientY >= rect.top && evt.clientY <= rect.bottom;
      return isContain;
    }
  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }]);
  return MountBody;
}(_react.Component);

;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(MountBody, 'MountBody', 'src/date-picker/MountBody.jsx');
}();

;