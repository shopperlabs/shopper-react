import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import { Component, PropTypes } from '../../../libs';
import draggable from '../draggable';

var HueSlider = function (_Component) {
  _inherits(HueSlider, _Component);

  function HueSlider(props) {
    _classCallCheck(this, HueSlider);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.state = {
      thumbLeft: 0,
      thumbTop: 0
    };
    return _this;
  }

  HueSlider.prototype.componentDidMount = function componentDidMount() {
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

  HueSlider.prototype.handleClick = function handleClick(event) {
    var thumb = this.refs.thumb;
    var target = event.target;
    if (target !== thumb) {
      this.handleDrag(event);
    }
  };

  HueSlider.prototype.handleDrag = function handleDrag(event) {
    var rect = this.$el.getBoundingClientRect();
    var thumb = this.refs.thumb;
    var _props = this.props,
        vertical = _props.vertical,
        color = _props.color;
    var onChange = this.context.onChange;

    var hue = void 0;
    if (!vertical) {
      var left = event.clientX - rect.left;
      left = Math.min(left, rect.width - thumb.offsetWidth / 2);
      left = Math.max(thumb.offsetWidth / 2, left);
      hue = Math.round((left - thumb.offsetWidth / 2) / (rect.width - thumb.offsetWidth) * 360);
    } else {
      var top = event.clientY - rect.top;
      top = Math.min(top, rect.height - thumb.offsetHeight / 2);
      top = Math.max(thumb.offsetHeight / 2, top);
      hue = Math.round((top - thumb.offsetHeight / 2) / (rect.height - thumb.offsetHeight) * 360);
    }
    color.set('hue', hue);
    this.update();
    onChange(color);
  };

  HueSlider.prototype.getThumbLeft = function getThumbLeft() {
    var _props2 = this.props,
        vertical = _props2.vertical,
        color = _props2.color;

    if (vertical) return 0;
    var el = this.$el;
    var hue = color.get('hue');
    if (!el) return 0;
    var thumb = this.refs.thumb;
    return Math.round(hue * (el.offsetWidth - thumb.offsetWidth / 2) / 360);
  };

  HueSlider.prototype.getThumbTop = function getThumbTop() {
    var _props3 = this.props,
        vertical = _props3.vertical,
        color = _props3.color;

    if (!vertical) return 0;
    var el = this.$el;
    var hue = color.get('hue');
    if (!el) return 0;
    var thumb = this.refs.thumb;
    return Math.round(hue * (el.offsetHeight - thumb.offsetHeight / 2) / 360);
  };

  HueSlider.prototype.update = function update() {
    this.setState({
      thumbLeft: this.getThumbLeft(),
      thumbTop: this.getThumbTop()
    });
  };

  HueSlider.prototype.render = function render() {
    var _this3 = this;

    var vertical = this.props.vertical;
    var _state = this.state,
        thumbLeft = _state.thumbLeft,
        thumbTop = _state.thumbTop;

    return React.createElement(
      'div',
      {
        ref: function ref(el) {
          return _this3.$el = el;
        },
        className: this.classNames({
          'el-color-hue-slider': true,
          'is-vertical': vertical
        }),
        style: { float: 'right' }
      },
      React.createElement('div', {
        className: 'el-color-hue-slider__bar',
        onClick: function onClick(e) {
          return _this3.handleClick(e);
        },
        ref: 'bar'
      }),
      React.createElement('div', {
        className: 'el-color-hue-slider__thumb',
        style: {
          left: thumbLeft + 'px',
          top: thumbTop + 'px'
        },
        ref: 'thumb'
      })
    );
  };

  return HueSlider;
}(Component);

export default HueSlider;


HueSlider.contextTypes = {
  onChange: PropTypes.func
};

HueSlider.propTypes = {
  vertical: PropTypes.bool,
  color: PropTypes.object.isRequired
};