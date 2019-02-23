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

var _codemirror = require('codemirror');

var _codemirror2 = _interopRequireDefault(_codemirror);

require('codemirror/mode/jsx/jsx');

require('codemirror/keymap/sublime');

require('codemirror/addon/comment/comment');

require('codemirror/lib/codemirror.css');

require('./style.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Editor = function (_Component) {
  (0, _inherits3.default)(Editor, _Component);

  function Editor() {
    (0, _classCallCheck3.default)(this, Editor);
    return (0, _possibleConstructorReturn3.default)(this, (Editor.__proto__ || Object.getPrototypeOf(Editor)).apply(this, arguments));
  }

  (0, _createClass3.default)(Editor, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var _props = this.props,
          onChange = _props.onChange,
          value = _props.value;


      this.cm = (0, _codemirror2.default)(this.editor, {
        mode: 'jsx',
        theme: 'react',
        keyMap: 'sublime',
        viewportMargin: Infinity,
        lineNumbers: false,
        dragDrop: false
      });

      this.cm.setValue(value);

      this.cm.on('changes', function (cm) {
        if (onChange) {
          clearTimeout(_this2.timeout);

          _this2.timeout = setTimeout(function () {
            onChange(cm.getValue());
          }, 300);
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      return _react2.default.createElement('div', { className: 'editor', ref: function ref(_ref) {
          return _this3.editor = _ref;
        } });
    }
  }]);
  return Editor;
}(_react.Component);

var _default = Editor;
exports.default = _default;


Editor.propTypes = {
  onChange: _propTypes2.default.func,
  value: _propTypes2.default.string
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Editor, 'Editor', 'libs/editor/index.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'libs/editor/index.jsx');
}();

;