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

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _libs = require('../../libs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CarouselItem = function (_Component) {
  (0, _inherits3.default)(CarouselItem, _Component);

  function CarouselItem(props) {
    (0, _classCallCheck3.default)(this, CarouselItem);

    var _this = (0, _possibleConstructorReturn3.default)(this, (CarouselItem.__proto__ || Object.getPrototypeOf(CarouselItem)).call(this, props));

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

  (0, _createClass3.default)(CarouselItem, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.parent().addItem(this);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.parent().removeItem(this);
    }
  }, {
    key: 'processIndex',
    value: function processIndex(index, activeIndex, length) {
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
    }
  }, {
    key: 'calculateTranslate',
    value: function calculateTranslate(index, activeIndex, parentWidth) {
      var denominator = this.isFlat ? 3 : 4;
      if (this.state.inStage) {
        return parentWidth * ((2 - this.CARD_SCALE) * (index - activeIndex) + 1) / denominator;
      } else if (index < activeIndex) {
        return -(1 + this.CARD_SCALE) * parentWidth / denominator;
      } else {
        return (denominator - 1 + this.CARD_SCALE) * parentWidth / denominator;
      }
    }
  }, {
    key: 'translateItem',
    value: function translateItem(index, activeIndex, oldIndex) {
      var parent = _reactDom2.default.findDOMNode(this.parent());
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
    }
  }, {
    key: 'handleItemClick',
    value: function handleItemClick() {
      if (this.parent().iscard) {
        var index = this.parent().state.items.indexOf(this);
        this.parent().setActiveItem(index);
      }
    }
  }, {
    key: 'parent',
    value: function parent() {
      return this.context.component;
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state,
          hover = _state.hover,
          translate = _state.translate,
          scale = _state.scale,
          active = _state.active,
          ready = _state.ready,
          inStage = _state.inStage,
          animating = _state.animating;


      return _react2.default.createElement(
        _libs.View,
        { show: ready },
        _react2.default.createElement(
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
          this.parent().iscard && _react2.default.createElement(
            _libs.View,
            { show: !active },
            _react2.default.createElement('div', { className: 'el-carousel__mask' })
          ),
          this.props.children
        )
      );
    }
  }, {
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
}(_libs.Component);

var _default = CarouselItem;
exports.default = _default;


CarouselItem.contextTypes = {
  component: _libs.PropTypes.any
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(CarouselItem, 'CarouselItem', 'src/carousel/CarouselItem.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/carousel/CarouselItem.jsx');
}();

;