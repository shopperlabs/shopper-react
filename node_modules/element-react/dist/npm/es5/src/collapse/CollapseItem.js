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

var CollapseItem = function (_Component) {
  (0, _inherits3.default)(CollapseItem, _Component);

  function CollapseItem(props) {
    (0, _classCallCheck3.default)(this, CollapseItem);
    return (0, _possibleConstructorReturn3.default)(this, (CollapseItem.__proto__ || Object.getPrototypeOf(CollapseItem)).call(this, props));
  }

  (0, _createClass3.default)(CollapseItem, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          title = _props.title,
          isActive = _props.isActive,
          _onClick = _props.onClick,
          name = _props.name;


      return _react2.default.createElement(
        'div',
        {
          className: this.classNames({
            'el-collapse-item': true,
            'is-active': isActive
          })
        },
        _react2.default.createElement(
          'div',
          { className: 'el-collapse-item__header', onClick: function onClick() {
              return _onClick(name);
            } },
          _react2.default.createElement('i', { className: 'el-collapse-item__header__arrow el-icon-arrow-right' }),
          title
        ),
        _react2.default.createElement(
          _libs.CollapseTransition,
          { isShow: isActive },
          _react2.default.createElement(
            'div',
            { className: 'el-collapse-item__wrap' },
            _react2.default.createElement(
              'div',
              { className: 'el-collapse-item__content' },
              this.props.children
            )
          )
        )
      );
    }
  }]);
  return CollapseItem;
}(_libs.Component);

var _default = CollapseItem;
exports.default = _default;


CollapseItem.propTypes = {
  onClick: _libs.PropTypes.func,
  isActive: _libs.PropTypes.bool,
  title: _libs.PropTypes.node,
  name: _libs.PropTypes.string
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(CollapseItem, 'CollapseItem', 'src/collapse/CollapseItem.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/collapse/CollapseItem.jsx');
}();

;