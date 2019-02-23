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

var HueSlider = function (_Component) {
  (0, _inherits3.default)(HueSlider, _Component);

  function HueSlider(props) {
    (0, _classCallCheck3.default)(this, HueSlider);

    var _this = (0, _possibleConstructorReturn3.default)(this, (HueSlider.__proto__ || Object.getPrototypeOf(HueSlider)).call(this, props));

    _this.state = {
      thumbLeft: 0,
      thumbTop: 0
    };
    return _this;
  }

  (0, _createClass3.default)(HueSlider, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
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
      (0, _draggable2.default)(bar, dragConfig);
      (0, _draggable2.default)(thumb, dragConfig);
      this.update();
    }
  }, {
    key: 'handleClick',
    value: function handleClick(event) {
      var thumb = this.refs.thumb;
      var target = event.target;
      if (target !== thumb) {
        this.handleDrag(event);
      }
    }
  }, {
    key: 'handleDrag',
    value: function handleDrag(event) {
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
    }
  }, {
    key: 'getThumbLeft',
    value: function getThumbLeft() {
      var _props2 = this.props,
          vertical = _props2.vertical,
          color = _props2.color;

      if (vertical) return 0;
      var el = this.$el;
      var hue = color.get('hue');
      if (!el) return 0;
      var thumb = this.refs.thumb;
      return Math.round(hue * (el.offsetWidth - thumb.offsetWidth / 2) / 360);
    }
  }, {
    key: 'getThumbTop',
    value: function getThumbTop() {
      var _props3 = this.props,
          vertical = _props3.vertical,
          color = _props3.color;

      if (!vertical) return 0;
      var el = this.$el;
      var hue = color.get('hue');
      if (!el) return 0;
      var thumb = this.refs.thumb;
      return Math.round(hue * (el.offsetHeight - thumb.offsetHeight / 2) / 360);
    }
  }, {
    key: 'update',
    value: function update() {
      this.setState({
        thumbLeft: this.getThumbLeft(),
        thumbTop: this.getThumbTop()
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var vertical = this.props.vertical;
      var _state = this.state,
          thumbLeft = _state.thumbLeft,
          thumbTop = _state.thumbTop;

      return _react2.default.createElement(
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
        _react2.default.createElement('div', {
          className: 'el-color-hue-slider__bar',
          onClick: function onClick(e) {
            return _this3.handleClick(e);
          },
          ref: 'bar'
        }),
        _react2.default.createElement('div', {
          className: 'el-color-hue-slider__thumb',
          style: {
            left: thumbLeft + 'px',
            top: thumbTop + 'px'
          },
          ref: 'thumb'
        })
      );
    }
  }]);
  return HueSlider;
}(_libs.Component);

var _default = HueSlider;
exports.default = _default;


HueSlider.contextTypes = {
  onChange: _libs.PropTypes.func
};

HueSlider.propTypes = {
  vertical: _libs.PropTypes.bool,
  color: _libs.PropTypes.object.isRequired
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(HueSlider, 'HueSlider', 'src/color-picker/components/HueSlider.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/color-picker/components/HueSlider.jsx');
}();

;