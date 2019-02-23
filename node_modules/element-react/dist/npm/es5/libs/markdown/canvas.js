'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _marked = require('marked');

var _marked2 = _interopRequireDefault(_marked);

var _babelStandalone = require('babel-standalone');

var _editor = require('../editor');

var _editor2 = _interopRequireDefault(_editor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Canvas = function (_React$Component) {
  (0, _inherits3.default)(Canvas, _React$Component);

  function Canvas(props) {
    (0, _classCallCheck3.default)(this, Canvas);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Canvas.__proto__ || Object.getPrototypeOf(Canvas)).call(this, props));

    _this.playerId = '' + parseInt(Math.random() * 1e9).toString(36);
    _this.document = _this.props.children.match(/([^]*)\n?(```[^]+```)/);
    _this.description = (0, _marked2.default)(_this.document[1]);
    _this.source = _this.document[2].match(/```(.*)\n?([^]+)```/);

    _this.state = {
      showBlock: false
    };
    return _this;
  }

  (0, _createClass3.default)(Canvas, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.renderSource(this.source[2]);
    }
  }, {
    key: 'blockControl',
    value: function blockControl() {
      this.setState({
        showBlock: !this.state.showBlock
      });
    }
  }, {
    key: 'renderSource',
    value: function renderSource(value) {
      var _this2 = this;

      import('../../src').then(function (Element) {
        var args = ['context', 'React', 'ReactDOM'];
        var argv = [_this2, _react2.default, _reactDom2.default];

        for (var key in Element) {
          args.push(key);
          argv.push(Element[key]);
        }

        return {
          args: args,
          argv: argv
        };
      }).then(function (_ref) {
        var args = _ref.args,
            argv = _ref.argv;

        var code = (0, _babelStandalone.transform)('\n        class Demo extends React.Component {\n          ' + value + '\n        }\n\n        ReactDOM.render(<Demo {...context.props} />, document.getElementById(\'' + _this2.playerId + '\'))\n      ', {
          presets: ['es2015', 'react']
        }).code;

        args.push(code);

        new (Function.prototype.bind.apply(Function, [null].concat((0, _toConsumableArray3.default)(args))))().apply(null, argv);

        _this2.source[2] = value;
      }).catch(function (err) {
        if (process.env.NODE_ENV !== 'production') {
          throw err;
        }
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      return _react2.default.createElement(
        'div',
        { className: 'demo-block demo-box demo-' + this.props.name },
        _react2.default.createElement('div', { className: 'source', id: this.playerId }),
        this.state.showBlock && _react2.default.createElement(
          'div',
          { className: 'meta' },
          this.description && _react2.default.createElement('div', {
            ref: 'description',
            className: 'description',
            dangerouslySetInnerHTML: { __html: this.description }
          }),
          _react2.default.createElement(_editor2.default, {
            value: this.source[2],
            onChange: function onChange(code) {
              return _this3.renderSource(code);
            }
          })
        ),
        _react2.default.createElement(
          'div',
          { className: 'demo-block-control', onClick: this.blockControl.bind(this) },
          this.state.showBlock ? _react2.default.createElement(
            'span',
            null,
            _react2.default.createElement('i', { className: 'el-icon-caret-top' }),
            this.props.locale.hide
          ) : _react2.default.createElement(
            'span',
            null,
            _react2.default.createElement('i', { className: 'el-icon-caret-bottom' }),
            this.props.locale.show
          )
        )
      );
    }
  }]);
  return Canvas;
}(_react2.default.Component);

var _default = Canvas;
exports.default = _default;


Canvas.propTypes = {
  locale: _propTypes2.default.object
};

Canvas.defaultProps = {
  locale: {}
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Canvas, 'Canvas', 'libs/markdown/canvas.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'libs/markdown/canvas.jsx');
}();

;