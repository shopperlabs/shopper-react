import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import { Component, PropTypes } from '../../../libs';
import draggable from '../draggable';

var AlphaSlider = function (_Component) {
  _inherits(AlphaSlider, _Component);

  function AlphaSlider(props) {
    _classCallCheck(this, AlphaSlider);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.state = {
      thumbLeft: 0,
      thumbTop: 0,
      background: null
    };
    return _this;
  }

  AlphaSlider.prototype.componentDidMount = function componentDidMount() {
    var _this2 = this;

    var _refs = this.refs,
        bar = _refs.bar,
        thumb = _refs.thumb;

    var dragConfig = {
      drag: function drag(event) {
        _this2.handleDrag(event);
      },
      end: function end(event) {
        _this2.handleDrag(event);
      }
    };
    draggable(bar, dragConfig);
    draggable(thumb, dragConfig);
    this.update();
  };

  AlphaSlider.prototype.handleClick = function handleClick(event) {
    var thumb = this.refs.thumb;
    var target = event.target;
    if (target !== thumb) {
      this.handleDrag(event);
    }
  };

  AlphaSlider.prototype.handleDrag = function handleDrag(event) {
    var _props = this.props,
        vertical = _props.vertical,
        color = _props.color;
    var onChange = this.context.onChange;

    var rect = this.$el.getBoundingClientRect();
    var thumb = this.refs.thumb;

    if (!vertical) {
      var left = event.clientX - rect.left;
      left = Math.max(thumb.offsetWidth / 2, left);
      left = Math.min(left, rect.width - thumb.offsetWidth / 2);
      color.set('alpha', Math.round((left - thumb.offsetWidth / 2) / (rect.width - thumb.offsetWidth) * 100));
    } else {
      var top = event.clientY - rect.top;
      top = Math.max(thumb.offsetHeight / 2, top);
      top = Math.min(top, rect.height - thumb.offsetHeight / 2);
      color.set('alpha', Math.round((top - thumb.offsetHeight / 2) / (rect.height - thumb.offsetHeight) * 100));
    }
    this.update();
    onChange(color);
  };

  AlphaSlider.prototype.getThumbLeft = function getThumbLeft() {
    var _props2 = this.props,
        vertical = _props2.vertical,
        color = _props2.color;

    if (vertical) return 0;
    var el = this.$el;
    var alpha = color._alpha;
    if (!el) return 0;
    var thumb = this.refs.thumb;
    return Math.round(alpha * (el.offsetWidth - thumb.offsetWidth / 2) / 100);
  };

  AlphaSlider.prototype.getThumbTop = function getThumbTop() {
    var _props3 = this.props,
        vertical = _props3.vertical,
        color = _props3.color;

    if (!vertical) return 0;
    var el = this.$el;
    var alpha = color._alpha;
    if (!el) return 0;
    var thumb = this.refs.thumb;
    return Math.round(alpha * (el.offsetHeight - thumb.offsetHeight / 2) / 100);
  };

  AlphaSlider.prototype.getBackground = function getBackground() {
    var color = this.props.color;

    if (color && color.value) {
      var _color$toRgb = color.toRgb(),
          r = _color$toRgb.r,
          g = _color$toRgb.g,
          b = _color$toRgb.b;

      return 'linear-gradient(to right, rgba(' + r + ', ' + g + ', ' + b + ', 0) 0%, rgba(' + r + ', ' + g + ', ' + b + ', 1) 100%)';
    }
    return null;
  };

  AlphaSlider.prototype.update = function update() {
    this.setState({
      thumbLeft: this.getThumbLeft(),
      thumbTop: this.getThumbTop(),
      background: this.getBackground()
    });
  };

  AlphaSlider.prototype.render = function render() {
    var _this3 = this;

    var vertical = this.props.vertical;
    var _state = this.state,
        thumbLeft = _state.thumbLeft,
        thumbTop = _state.thumbTop,
        background = _state.background;

    return React.createElement(
      'div',
      {
        ref: function ref(el) {
          return _this3.$el = el;
        },
        className: this.classNames({
          'el-color-alpha-slider': true,
          'is-vertical': vertical
        })
      },
      React.createElement('div', {
        className: 'el-color-alpha-slider__bar',
        onClick: function onClick(e) {
          return _this3.handleClick(e);
        },
        ref: 'bar',
        style: { background: background }
      }),
      React.createElement('div', {
        className: 'el-color-alpha-slider__thumb',
        ref: 'thumb',
        style: {
          left: thumbLeft + 'px',
          top: thumbTop + 'px'
        }
      })
    );
  };

  return AlphaSlider;
}(Component);

export default AlphaSlider;


AlphaSlider.contextTypes = {
  onChange: PropTypes.func
};

AlphaSlider.propTypes = {
  color: PropTypes.object.isRequired,
  vertical: PropTypes.bool
};