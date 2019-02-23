import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import { Component, PropTypes } from '../../../libs';
import draggable from '../draggable';

var SvPanel = function (_Component) {
  _inherits(SvPanel, _Component);

  function SvPanel(props) {
    _classCallCheck(this, SvPanel);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.state = {
      cursorTop: 0,
      cursorLeft: 0,
      background: 'hsl(0, 100%, 50%)'
    };
    return _this;
  }

  SvPanel.prototype.componentDidMount = function componentDidMount() {
    var _this2 = this;

    var dragConfig = {
      drag: function drag(event) {
        _this2.handleDrag(event);
      },
      end: function end(event) {
        _this2.handleDrag(event);
      }
    };
    draggable(this.$el, dragConfig);
    this.update();
  };

  SvPanel.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var background = this.state.background;

    var newBackground = 'hsl(' + nextProps.color.get('hue') + ', 100%, 50%)';
    if (newBackground !== background) {
      this.update(nextProps);
    }
  };

  SvPanel.prototype.update = function update(props) {
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
  };

  SvPanel.prototype.handleDrag = function handleDrag(event) {
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
  };

  SvPanel.prototype.render = function render() {
    var _this3 = this;

    var _state = this.state,
        cursorTop = _state.cursorTop,
        cursorLeft = _state.cursorLeft,
        background = _state.background;

    return React.createElement(
      'div',
      {
        className: 'el-color-svpanel',
        style: { backgroundColor: background },
        ref: function ref(el) {
          return _this3.$el = el;
        }
      },
      React.createElement('div', { className: 'el-color-svpanel__white' }),
      React.createElement('div', { className: 'el-color-svpanel__black' }),
      React.createElement(
        'div',
        {
          className: 'el-color-svpanel__cursor',
          style: {
            top: cursorTop + 'px',
            left: cursorLeft + 'px'
          }
        },
        React.createElement('div', null)
      )
    );
  };

  return SvPanel;
}(Component);

export default SvPanel;


SvPanel.contextTypes = {
  onChange: PropTypes.func
};

SvPanel.propTypes = {
  color: PropTypes.object.isRequired
};