import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import { Component, PropTypes } from '../../libs';

import Tooltip from '../tooltip';

var SliderButton = function (_Component) {
  _inherits(SliderButton, _Component);

  function SliderButton(props) {
    _classCallCheck(this, SliderButton);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.state = {
      hovering: false,
      dragging: false,
      startX: 0,
      startY: 0,
      currentX: 0,
      currentY: 0,
      startPosition: 0,
      newPosition: 0
    };
    return _this;
  }

  SliderButton.prototype.parent = function parent() {
    return this.context.component;
  };

  SliderButton.prototype.handleMouseEnter = function handleMouseEnter() {
    this.setState({
      hovering: true
    });
  };

  SliderButton.prototype.handleMouseLeave = function handleMouseLeave() {
    this.setState({
      hovering: false
    });
  };

  SliderButton.prototype.onButtonDown = function onButtonDown(event) {
    if (this.disabled()) return;

    this.onDragStart(event);

    window.addEventListener('mousemove', this.onDragging.bind(this));
    window.addEventListener('mouseup', this.onDragEnd.bind(this));
    window.addEventListener('contextmenu', this.onDragEnd.bind(this));
  };

  SliderButton.prototype.onDragStart = function onDragStart(event) {
    this.setState({
      dragging: true,
      startX: event.clientX,
      startY: event.clientY,
      startPosition: parseInt(this.currentPosition(), 10)
    });
  };

  SliderButton.prototype.onDragging = function onDragging(event) {
    if (this.state.dragging) {
      this.state.currentX = event.clientX;
      this.state.currentY = event.clientY;

      var diff = void 0;

      if (this.props.vertical) {
        diff = (this.state.startY - this.state.currentY) / this.parent().sliderSize() * 100;
      } else {
        diff = (this.state.currentX - this.state.startX) / this.parent().sliderSize() * 100;
      }

      this.state.newPosition = this.state.startPosition + diff;

      this.setPosition(this.state.newPosition);
      this.forceUpdate();
    }
  };

  SliderButton.prototype.onDragEnd = function onDragEnd() {
    var _this2 = this;

    if (this.state.dragging) {
      /*
       * 防止在 mouseup 后立即触发 click，导致滑块有几率产生一小段位移
       * 不使用 preventDefault 是因为 mouseup 和 click 没有注册在同一个 DOM 上
       */
      setTimeout(function () {
        _this2.setState({
          dragging: false
        }, function () {
          _this2.setPosition(_this2.state.newPosition);
        });
      }, 0);

      window.removeEventListener('mousemove', this.onDragging.bind(this));
      window.removeEventListener('mouseup', this.onDragEnd.bind(this));
      window.removeEventListener('contextmenu', this.onDragEnd.bind(this));
    }
  };

  SliderButton.prototype.setPosition = function setPosition(newPosition) {
    if (newPosition < 0) {
      newPosition = 0;
    } else if (newPosition > 100) {
      newPosition = 100;
    }

    var lengthPerStep = 100 / ((this.max() - this.min()) / this.step());
    var steps = Math.round(newPosition / lengthPerStep);
    var value = steps * lengthPerStep * (this.max() - this.min()) * 0.01 + this.min();

    this.props.onChange(parseFloat(value.toFixed(this.precision())));
  };

  /* Computed Methods */

  SliderButton.prototype.formatValue = function formatValue() {
    var formatTooltip = this.parent().props.formatTooltip;


    if (formatTooltip instanceof Function) {
      return formatTooltip(this.props.value);
    }

    return this.props.value;
  };

  SliderButton.prototype.disabled = function disabled() {
    return this.parent().props.disabled;
  };

  SliderButton.prototype.max = function max() {
    return this.parent().props.max;
  };

  SliderButton.prototype.min = function min() {
    return this.parent().props.min;
  };

  SliderButton.prototype.step = function step() {
    return this.parent().props.step;
  };

  SliderButton.prototype.precision = function precision() {
    return this.parent().state.precision;
  };

  SliderButton.prototype.currentPosition = function currentPosition() {
    return (this.props.value - this.min()) / (this.max() - this.min()) * 100 + '%';
  };

  SliderButton.prototype.wrapperStyle = function wrapperStyle() {
    return this.props.vertical ? { bottom: this.currentPosition() } : { left: this.currentPosition() };
  };

  SliderButton.prototype.render = function render() {
    var _state = this.state,
        hovering = _state.hovering,
        dragging = _state.dragging;


    return React.createElement(
      'div',
      {
        ref: 'button',
        className: this.classNames('el-slider__button-wrapper', {
          'hover': hovering,
          'dragging': dragging
        }),
        style: this.wrapperStyle(),
        onMouseEnter: this.handleMouseEnter.bind(this),
        onMouseLeave: this.handleMouseLeave.bind(this),
        onMouseDown: this.onButtonDown.bind(this) },
      React.createElement(
        Tooltip,
        { ref: 'tooltip', placement: 'top', content: React.createElement(
            'span',
            null,
            this.formatValue()
          ), disabled: !this.parent().props.showTooltip },
        React.createElement('div', { className: this.classNames('el-slider__button', {
            'hover': this.state.hovering,
            'dragging': this.state.dragging
          }) })
      )
    );
  };

  return SliderButton;
}(Component);

SliderButton.defaultProps = {
  value: 0
};
export default SliderButton;


SliderButton.contextTypes = {
  component: PropTypes.any
};

SliderButton.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.number,
  vertical: PropTypes.bool
};