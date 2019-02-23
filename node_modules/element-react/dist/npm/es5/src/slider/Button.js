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

var _libs = require('../../libs');

var _tooltip = require('../tooltip');

var _tooltip2 = _interopRequireDefault(_tooltip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SliderButton = function (_Component) {
  (0, _inherits3.default)(SliderButton, _Component);

  function SliderButton(props) {
    (0, _classCallCheck3.default)(this, SliderButton);

    var _this = (0, _possibleConstructorReturn3.default)(this, (SliderButton.__proto__ || Object.getPrototypeOf(SliderButton)).call(this, props));

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

  (0, _createClass3.default)(SliderButton, [{
    key: 'parent',
    value: function parent() {
      return this.context.component;
    }
  }, {
    key: 'handleMouseEnter',
    value: function handleMouseEnter() {
      this.setState({
        hovering: true
      });
    }
  }, {
    key: 'handleMouseLeave',
    value: function handleMouseLeave() {
      this.setState({
        hovering: false
      });
    }
  }, {
    key: 'onButtonDown',
    value: function onButtonDown(event) {
      if (this.disabled()) return;

      this.onDragStart(event);

      window.addEventListener('mousemove', this.onDragging.bind(this));
      window.addEventListener('mouseup', this.onDragEnd.bind(this));
      window.addEventListener('contextmenu', this.onDragEnd.bind(this));
    }
  }, {
    key: 'onDragStart',
    value: function onDragStart(event) {
      this.setState({
        dragging: true,
        startX: event.clientX,
        startY: event.clientY,
        startPosition: parseInt(this.currentPosition(), 10)
      });
    }
  }, {
    key: 'onDragging',
    value: function onDragging(event) {
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
    }
  }, {
    key: 'onDragEnd',
    value: function onDragEnd() {
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
    }
  }, {
    key: 'setPosition',
    value: function setPosition(newPosition) {
      if (newPosition < 0) {
        newPosition = 0;
      } else if (newPosition > 100) {
        newPosition = 100;
      }

      var lengthPerStep = 100 / ((this.max() - this.min()) / this.step());
      var steps = Math.round(newPosition / lengthPerStep);
      var value = steps * lengthPerStep * (this.max() - this.min()) * 0.01 + this.min();

      this.props.onChange(parseFloat(value.toFixed(this.precision())));
    }

    /* Computed Methods */

  }, {
    key: 'formatValue',
    value: function formatValue() {
      var formatTooltip = this.parent().props.formatTooltip;


      if (formatTooltip instanceof Function) {
        return formatTooltip(this.props.value);
      }

      return this.props.value;
    }
  }, {
    key: 'disabled',
    value: function disabled() {
      return this.parent().props.disabled;
    }
  }, {
    key: 'max',
    value: function max() {
      return this.parent().props.max;
    }
  }, {
    key: 'min',
    value: function min() {
      return this.parent().props.min;
    }
  }, {
    key: 'step',
    value: function step() {
      return this.parent().props.step;
    }
  }, {
    key: 'precision',
    value: function precision() {
      return this.parent().state.precision;
    }
  }, {
    key: 'currentPosition',
    value: function currentPosition() {
      return (this.props.value - this.min()) / (this.max() - this.min()) * 100 + '%';
    }
  }, {
    key: 'wrapperStyle',
    value: function wrapperStyle() {
      return this.props.vertical ? { bottom: this.currentPosition() } : { left: this.currentPosition() };
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state,
          hovering = _state.hovering,
          dragging = _state.dragging;


      return _react2.default.createElement(
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
        _react2.default.createElement(
          _tooltip2.default,
          { ref: 'tooltip', placement: 'top', content: _react2.default.createElement(
              'span',
              null,
              this.formatValue()
            ), disabled: !this.parent().props.showTooltip },
          _react2.default.createElement('div', { className: this.classNames('el-slider__button', {
              'hover': this.state.hovering,
              'dragging': this.state.dragging
            }) })
        )
      );
    }
  }]);
  return SliderButton;
}(_libs.Component);

SliderButton.defaultProps = {
  value: 0
};
var _default = SliderButton;
exports.default = _default;


SliderButton.contextTypes = {
  component: _libs.PropTypes.any
};

SliderButton.propTypes = {
  onChange: _libs.PropTypes.func.isRequired,
  value: _libs.PropTypes.number,
  vertical: _libs.PropTypes.bool
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(SliderButton, 'SliderButton', 'src/slider/Button.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/slider/Button.jsx');
}();

;