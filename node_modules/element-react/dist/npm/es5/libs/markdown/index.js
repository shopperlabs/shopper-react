'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

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

var _marked = require('marked');

var _marked2 = _interopRequireDefault(_marked);

var _prismjs = require('prismjs');

var _prismjs2 = _interopRequireDefault(_prismjs);

var _canvas = require('./canvas');

var _canvas2 = _interopRequireDefault(_canvas);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Markdown = function (_React$Component) {
  (0, _inherits3.default)(Markdown, _React$Component);

  function Markdown(props) {
    (0, _classCallCheck3.default)(this, Markdown);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Markdown.__proto__ || Object.getPrototypeOf(Markdown)).call(this, props));

    _this.components = new Map();

    _this.renderer = new _marked2.default.Renderer();
    _this.renderer.table = function (header, body) {
      return '<table class="grid"><thead>' + header + '</thead><tbody>' + body + '</tbody></table>';
    };
    return _this;
  }

  (0, _createClass3.default)(Markdown, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.renderDOM();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.renderDOM();
    }
  }, {
    key: 'renderDOM',
    value: function renderDOM() {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.components[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _ref = _step.value;

          var _ref2 = (0, _slicedToArray3.default)(_ref, 2);

          var id = _ref2[0];
          var component = _ref2[1];

          var div = document.getElementById(id);

          if (div instanceof HTMLElement) {
            _reactDom2.default.render(component, div);
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      _prismjs2.default.highlightAll();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var document = this.document(localStorage.getItem('ELEMENT_LANGUAGE') || 'zh-CN');

      if (typeof document === 'string') {
        this.components.clear();

        var html = (0, _marked2.default)(document.replace(/:::\s?demo\s?([^]+?):::/g, function (match, p1, offset) {
          var id = offset.toString(36);

          _this2.components.set(id, _react2.default.createElement(_canvas2.default, Object.assign({
            name: _this2.constructor.name.toLowerCase()
          }, _this2.props), p1));

          return '<div id=' + id + '></div>';
        }), { renderer: this.renderer });

        return _react2.default.createElement('div', { dangerouslySetInnerHTML: {
            __html: html
          } });
      } else {
        return _react2.default.createElement('span', null);
      }
    }
  }]);
  return Markdown;
}(_react2.default.Component);

var _default = Markdown;
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Markdown, 'Markdown', 'libs/markdown/index.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'libs/markdown/index.jsx');
}();

;