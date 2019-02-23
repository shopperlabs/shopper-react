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

var Card = function (_Component) {
  (0, _inherits3.default)(Card, _Component);

  function Card() {
    (0, _classCallCheck3.default)(this, Card);
    return (0, _possibleConstructorReturn3.default)(this, (Card.__proto__ || Object.getPrototypeOf(Card)).apply(this, arguments));
  }

  (0, _createClass3.default)(Card, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          header = _props.header,
          bodyStyle = _props.bodyStyle,
          children = _props.children;

      return _react2.default.createElement(
        'div',
        { style: this.style(), className: this.className('el-card') },
        header && _react2.default.createElement(
          'div',
          { className: 'el-card__header' },
          header
        ),
        _react2.default.createElement(
          'div',
          { className: 'el-card__body', style: bodyStyle },
          children
        )
      );
    }
  }]);
  return Card;
}(_libs.Component);

Card.defaultProps = {
  bodyStyle: {
    padding: '20px'
  }
};
var _default = Card;
exports.default = _default;


Card.propTypes = {
  header: _libs.PropTypes.node,
  bodyStyle: _libs.PropTypes.object
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Card, 'Card', 'src/card/Card.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/card/Card.jsx');
}();

;