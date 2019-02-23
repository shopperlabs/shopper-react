import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import ReactDOM from 'react-dom';
import { Component, PropTypes, View } from '../../libs';

var CarouselItem = function (_Component) {
  _inherits(CarouselItem, _Component);

  function CarouselItem(props) {
    _classCallCheck(this, CarouselItem);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.state = {
      hover: false,
      translate: 0,
      scale: 1,
      active: false,
      ready: false,
      inStage: false,
      animating: false
    };
    return _this;
  }

  CarouselItem.prototype.componentWillMount = function componentWillMount() {
    this.parent().addItem(this);
  };

  CarouselItem.prototype.componentWillUnmount = function componentWillUnmount() {
    this.parent().removeItem(this);
  };

  CarouselItem.prototype.processIndex = function processIndex(index, activeIndex, length) {
    if (activeIndex === 0 && index === length - 1) {
      return -1;
    } else if (activeIndex === length - 1 && index === 0) {
      return length;
    } else if (index < activeIndex - 1 && activeIndex - index >= length / 2) {
      return length + 1;
    } else if (index > activeIndex + 1 && index - activeIndex >= length / 2) {
      return -2;
    }

    return index;
  };

  CarouselItem.prototype.calculateTranslate = function calculateTranslate(index, activeIndex, parentWidth) {
    var denominator = this.isFlat ? 3 : 4;
    if (this.state.inStage) {
      return parentWidth * ((2 - this.CARD_SCALE) * (index - activeIndex) + 1) / denominator;
    } else if (index < activeIndex) {
      return -(1 + this.CARD_SCALE) * parentWidth / denominator;
    } else {
      return (denominator - 1 + this.CARD_SCALE) * parentWidth / denominator;
    }
  };

  CarouselItem.prototype.translateItem = function translateItem(index, activeIndex, oldIndex) {
    var parent = ReactDOM.findDOMNode(this.parent());
    var parentWidth = parent.offsetWidth;
    var length = this.parent().state.items.length;

    if (!this.parent().iscard && oldIndex !== undefined) {
      this.state.animating = index === activeIndex || index === oldIndex;
    }

    if (index !== activeIndex && length > 2) {
      index = this.processIndex(index, activeIndex, length);
    }

    if (this.parent().iscard) {
      this.state.inStage = Math.round(Math.abs(index - activeIndex)) <= 1;
      this.state.active = index === activeIndex;
      this.state.translate = this.calculateTranslate(index, activeIndex, parentWidth);
      this.state.scale = this.state.active ? 1 : this.CARD_SCALE;
    } else {
      this.state.active = index === activeIndex;
      this.state.translate = parentWidth * (index - activeIndex);
    }

    this.state.ready = true;

    this.forceUpdate();
  };

  CarouselItem.prototype.handleItemClick = function handleItemClick() {
    if (this.parent().iscard) {
      var index = this.parent().state.items.indexOf(this);
      this.parent().setActiveItem(index);
    }
  };

  CarouselItem.prototype.parent = function parent() {
    return this.context.component;
  };

  CarouselItem.prototype.render = function render() {
    var _state = this.state,
        hover = _state.hover,
        translate = _state.translate,
        scale = _state.scale,
        active = _state.active,
        ready = _state.ready,
        inStage = _state.inStage,
        animating = _state.animating;


    return React.createElement(
      View,
      { show: ready },
      React.createElement(
        'div',
        {
          className: this.className('el-carousel__item', {
            'is-active': active,
            'el-carousel__item--card': this.parent().iscard,
            'is-in-stage': inStage,
            'is-hover': hover,
            'is-animating': animating
          }),
          onClick: this.handleItemClick.bind(this),
          style: {
            msTransform: 'translateX(' + translate + 'px) scale(' + scale + ')',
            WebkitTransform: 'translateX(' + translate + 'px) scale(' + scale + ')',
            transform: 'translateX(' + translate + 'px) scale(' + scale + ')'
          } },
        this.parent().iscard && React.createElement(
          View,
          { show: !active },
          React.createElement('div', { className: 'el-carousel__mask' })
        ),
        this.props.children
      )
    );
  };

  _createClass(CarouselItem, [{
    key: 'isFlat',
    get: function get() {
      return this.parent().props.type === 'flatcard';
    }
  }, {
    key: 'CARD_SCALE',
    get: function get() {
      return this.isFlat ? 1 : 0.83;
    }
  }, {
    key: 'calculateWidth',
    get: function get() {
      if (this.isFlat) {
        return parseInt(100 / 3) + '%';
      }
    }
  }]);

  return CarouselItem;
}(Component);

export default CarouselItem;


CarouselItem.contextTypes = {
  component: PropTypes.any
};