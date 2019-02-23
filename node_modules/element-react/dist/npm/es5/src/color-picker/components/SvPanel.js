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

var _libs = require('../../../libs');

var _draggable = require('../draggable');

var _draggable2 = _interopRequireDefault(_draggable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SvPanel = function (_Component) {
  (0, _inherits3.default)(SvPanel, _Component);

  function SvPanel(props) {
    (0, _classCallCheck3.default)(this, SvPanel);

    var _this = (0, _possibleConstructorReturn3.default)(this, (SvPanel.__proto__ || Object.getPrototypeOf(SvPanel)).call(this, props));

    _this.state = {
      cursorTop: 0,
      cursorLeft: 0,
      background: 'hsl(0, 100%, 50%)'
    };
    return _this;
  }

  (0, _createClass3.default)(SvPanel, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var dragConfig = {
        drag: function drag(event) {
          _this2.handleDrag(event);
        },
        end: function end(event) {
          _this2.handleDrag(event);
        }
      };
      (0, _draggable2.default)(this.$el, dragConfig);
      this.update();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var background = this.state.background;

      var newBackground = 'hsl(' + nextProps.color.get('hue') + ', 100%, 50%)';
      if (newBackground !== background) {
        this.update(nextProps);
      }
    }
  }, {
    key: 'update',
    value: function update(props) {
      var _ref = props || this.props,
          color = _ref.color;

      var saturation = color.get('saturation');
      var value = color.get('value');
      var el = this.$el;

      var _el$getBoundingClient = el.getBoundingClientRect(),
          width = _el$getBoundingClient.width,
          height = _el$getBoundingClient.height;

      if (!height) height = width * 3 / 4;
      this.setState({
        cursorLeft: saturation * width / 100,
        cursorTop: (100 - value) * height / 100,
        background: 'hsl(' + color.get('hue') + ', 100%, 50%)'
      });
    }
  }, {
    key: 'handleDrag',
    value: function handleDrag(event) {
      var color = this.props.color;
      var onChange = this.context.onChange;

      var el = this.$el;
      var rect = el.getBoundingClientRect();
      var left = event.clientX - rect.left;
      var top = event.clientY - rect.top;
      left = Math.max(0, left);
      left = Math.min(left, rect.width);
      top = Math.max(0, top);
      top = Math.min(top, rect.height);
      this.setState({
        cursorLeft: left,
        cursorTop: top,
        background: 'hsl(' + color.get('hue') + ', 100%, 50%)'
      }, function () {
        color.set({
          saturation: left / rect.width * 100,
          value: 100 - top / rect.height * 100
        });
        onChange(color);
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _state = this.state,
          cursorTop = _state.cursorTop,
          cursorLeft = _state.cursorLeft,
          background = _state.background;

      return _react2.default.createElement(
        'div',
        {
          className: 'el-color-svpanel',
          style: { backgroundColor: background },
          ref: function ref(el) {
            return _this3.$el = el;
          }
        },
        _react2.default.createElement('div', { className: 'el-color-svpanel__white' }),
        _react2.default.createElement('div', { className: 'el-color-svpanel__black' }),
        _react2.default.createElement(
          'div',
          {
            className: 'el-color-svpanel__cursor',
            style: {
              top: cursorTop + 'px',
              left: cursorLeft + 'px'
            }
          },
          _react2.default.createElement('div', null)
        )
      );
    }
  }]);
  return SvPanel;
}(_libs.Component);

var _default = SvPanel;
exports.default = _default;


SvPanel.contextTypes = {
  onChange: _libs.PropTypes.func
};

SvPanel.propTypes = {
  color: _libs.PropTypes.object.isRequired
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(SvPanel, 'SvPanel', 'src/color-picker/components/SvPanel.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/color-picker/components/SvPanel.jsx');
}();

;