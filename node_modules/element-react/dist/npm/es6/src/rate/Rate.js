import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import { Component, PropTypes } from '../../libs';

var Rate = function (_Component) {
  _inherits(Rate, _Component);

  function Rate(props) {
    _classCallCheck(this, Rate);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.state = {
      pointerAtLeftHalf: false,
      currentValue: _this.props.value - 1,
      hoverIndex: -1,
      value: -1
    };
    var _this$props = _this.props,
        iconClasses = _this$props.iconClasses,
        voidIconClass = _this$props.voidIconClass,
        disabledVoidIconClass = _this$props.disabledVoidIconClass,
        colors = _this$props.colors,
        voidColor = _this$props.voidColor,
        disabledVoidColor = _this$props.disabledVoidColor;


    _this.classMap = {
      lowClass: iconClasses[0],
      mediumClass: iconClasses[1],
      highClass: iconClasses[2],
      voidClass: voidIconClass,
      disabledVoidClass: disabledVoidIconClass
    };

    _this.colorMap = {
      lowColor: colors[0],
      mediumColor: colors[1],
      highColor: colors[2],
      voidColor: voidColor,
      disabledVoidColor: disabledVoidColor
    };
    return _this;
  }

  Rate.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (nextProps.value && nextProps.value !== this.props.value) {
      this.setState({
        value: nextProps.value
      });
    }
  };

  Rate.prototype.hasClass = function hasClass(target, classname) {
    return target.classList.contains(classname);
  };

  Rate.prototype.setCurrentValue = function setCurrentValue(e, value) {
    var _props = this.props,
        disabled = _props.disabled,
        allowHalf = _props.allowHalf;
    var _state = this.state,
        pointerAtLeftHalf = _state.pointerAtLeftHalf,
        currentValue = _state.currentValue,
        hoverIndex = _state.hoverIndex;

    if (disabled) {
      return;
    }
    /* istanbul ignore if */
    if (allowHalf) {
      e.persist();
      var target = e.target;
      if (this.hasClass(target, 'el-rate__item')) {
        target = target.querySelector('.el-rate__icon');
      }
      if (this.hasClass(target, 'el-rate__decimal')) {
        target = target.parentNode;
      }
      this.setState({
        pointerAtLeftHalf: (e.clientX - target.getBoundingClientRect().left) * 2 <= target.clientWidth,
        currentValue: (e.clientX - target.getBoundingClientRect().left) * 2 <= target.clientWidth ? value - 0.5 : value
      });
    } else {
      this.setState({
        currentValue: value
      });
    }
    this.setState({
      hoverIndex: value
    });
  };

  Rate.prototype.getValueFromMap = function getValueFromMap(value, map) {
    var _props2 = this.props,
        lowThreshold = _props2.lowThreshold,
        highThreshold = _props2.highThreshold;

    var result = '';
    if (value <= lowThreshold - 1) {
      result = map.lowColor || map.lowClass;
    } else if (value >= highThreshold - 1) {
      result = map.highColor || map.highClass;
    } else {
      result = map.mediumColor || map.mediumClass;
    }

    return result;
  };

  Rate.prototype.getIconStyle = function getIconStyle(item) {
    var disabled = this.props.disabled;
    var currentValue = this.state.currentValue;

    var voidColor = disabled ? this.colorMap.disabledVoidColor : this.colorMap.voidColor;
    return {
      color: item <= currentValue ? this.activeColor() : voidColor
    };
  };

  Rate.prototype.showDecimalIcon = function showDecimalIcon(item) {
    var _props3 = this.props,
        disabled = _props3.disabled,
        allowHalf = _props3.allowHalf,
        value = _props3.value;
    var _state2 = this.state,
        pointerAtLeftHalf = _state2.pointerAtLeftHalf,
        currentValue = _state2.currentValue;

    var showWhenDisabled = disabled && this.valueDecimal() > 0 && item - 1 < value - 1 && item > value - 1;
    /* istanbul ignore next */
    var showWhenAllowHalf = allowHalf && pointerAtLeftHalf && (item - 0.5).toFixed(1) === currentValue.toFixed(1);
    return showWhenDisabled || showWhenAllowHalf;
  };

  Rate.prototype.classes = function classes() {
    var currentValue = this.state.currentValue;
    var _props4 = this.props,
        allowHalf = _props4.allowHalf,
        max = _props4.max;

    var result = [];
    var i = 0;
    var threshold = currentValue;
    if (allowHalf && currentValue !== Math.floor(currentValue)) {
      threshold;
    }
    for (; i <= threshold; i++) {
      result.push(this.activeClass());
    }
    for (; i < max; i++) {
      result.push(this.voidClass());
    }
    return result;
  };

  Rate.prototype.valueDecimal = function valueDecimal() {
    var value = this.props.value;

    return value * 100 - Math.floor(value) * 100;
  };

  Rate.prototype.decimalIconClass = function decimalIconClass() {
    return this.getValueFromMap(this.props.value, this.classMap);
  };

  Rate.prototype.voidClass = function voidClass() {
    return this.props.disabled ? this.classMap.disabledVoidClass : this.classMap.voidClass;
  };

  Rate.prototype.activeClass = function activeClass() {
    return this.getValueFromMap(this.state.currentValue, this.classMap);
  };

  Rate.prototype.activeColor = function activeColor() {
    return this.getValueFromMap(this.state.currentValue, this.colorMap);
  };

  Rate.prototype.selectValue = function selectValue(value) {
    var _props5 = this.props,
        disabled = _props5.disabled,
        allowHalf = _props5.allowHalf,
        onChange = _props5.onChange;
    var _state3 = this.state,
        pointerAtLeftHalf = _state3.pointerAtLeftHalf,
        currentValue = _state3.currentValue;

    if (disabled) {
      return;
    }
    if (allowHalf && pointerAtLeftHalf) {
      // this.$emit('input', this.currentValue);
      this.setState({
        value: currentValue
      }, function () {
        onChange && onChange(currentValue + 1);
      });
    } else {
      this.setState({
        currentValue: value,
        value: value
      }, function () {
        onChange && onChange(value + 1);
      });
    }
  };

  Rate.prototype.decimalStyle = function decimalStyle() {
    var _props6 = this.props,
        disabled = _props6.disabled,
        allowHalf = _props6.allowHalf;

    var width = '';
    if (disabled) {
      width = (this.valueDecimal() < 50 ? 0 : 50) + '%';
    }
    if (allowHalf) {
      width = '50%';
    }
    return {
      color: this.activeColor(),
      width: width
    };
  };

  Rate.prototype.showText = function showText() {
    var _props7 = this.props,
        disabled = _props7.disabled,
        texts = _props7.texts,
        textTemplate = _props7.textTemplate,
        value = _props7.value;
    var currentValue = this.state.currentValue;

    var result = '';
    if (disabled) {
      result = textTemplate.replace(/\{\s*value\s*\}/, value);
    } else {
      result = texts[Math.ceil(currentValue)];
    }
    return result;
  };

  Rate.prototype.resetCurrentValue = function resetCurrentValue() {
    var _props8 = this.props,
        disabled = _props8.disabled,
        allowHalf = _props8.allowHalf;
    var value = this.state.value;

    if (disabled) {
      return;
    }
    if (allowHalf) {
      this.setState({
        pointerAtLeftHalf: value !== Math.floor(value)
      });
    }
    this.setState({
      currentValue: value,
      hoverIndex: -1
    });
  };

  Rate.prototype.render = function render() {
    var _this2 = this;

    var _props9 = this.props,
        showText = _props9.showText,
        textColor = _props9.textColor,
        disabled = _props9.disabled,
        max = _props9.max;
    var hoverIndex = this.state.hoverIndex;

    return React.createElement(
      'div',
      { style: this.style(), className: this.className('el-rate') },
      [].concat(Array(max)).map(function (v, k) {
        return React.createElement(
          'span',
          {
            className: 'el-rate__item',
            style: { cursor: disabled ? 'auto' : 'pointer' },
            onClick: function onClick() {
              return _this2.selectValue(k);
            },
            onMouseMove: function onMouseMove(e) {
              return _this2.setCurrentValue(e, k);
            },
            onMouseLeave: function onMouseLeave() {
              return _this2.resetCurrentValue();
            },
            key: k
          },
          React.createElement(
            'i',
            {
              style: _this2.getIconStyle(k),
              className: hoverIndex === k ? 'hover el-rate__icon ' + _this2.classes()[k] : 'el-rate__icon ' + _this2.classes()[k]
            },
            _this2.showDecimalIcon(k) ? React.createElement('i', {
              style: _this2.decimalStyle(),
              className: 'el-rate__decimal ' + _this2.decimalIconClass()
            }) : null
          )
        );
      }),
      showText ? React.createElement(
        'span',
        { className: 'el-rate__text', style: { color: textColor } },
        this.showText()
      ) : null
    );
  };

  return Rate;
}(Component);

export default Rate;


Rate.propTypes = {
  colors: PropTypes.array,
  texts: PropTypes.array,
  showText: PropTypes.bool,
  textColor: PropTypes.string,
  disabled: PropTypes.bool,
  value: PropTypes.number,
  onChange: PropTypes.func,
  textTemplate: PropTypes.string,
  lowThreshold: PropTypes.number,
  highThreshold: PropTypes.number,
  max: PropTypes.number,
  voidColor: PropTypes.string,
  disabledVoidColor: PropTypes.string,
  iconClasses: PropTypes.array,
  voidIconClass: PropTypes.string,
  disabledVoidIconClass: PropTypes.string,
  allowHalf: PropTypes.bool
};

Rate.defaultProps = {
  colors: ['#F7BA2A', '#F7BA2A', '#F7BA2A'], // icon 的颜色数组，共有 3 个元素，为 3 个分段所对应的颜色
  texts: ['极差', '失望', '一般', '满意', '惊喜'], // 辅助文字数组
  showText: false, // 是否显示辅助文字
  textColor: '#1F2D3D', //   辅助文字的颜色
  disabled: false, // 是否为只读
  value: 0, // 星级
  lowThreshold: 2, // 低分和中等分数的界限值，值本身被划分在低分中
  highThreshold: 4, // 高分和中等分数的界限值，值本身被划分在高分中
  max: 5,
  voidColor: '#C6D1DE',
  disabledVoidColor: '#EFF2F7',
  iconClasses: ['el-icon-star-on', 'el-icon-star-on', 'el-icon-star-on'],
  voidIconClass: 'el-icon-star-off',
  disabledVoidIconClass: 'el-icon-star-on',
  allowHalf: false,
  textTemplate: '{value}'
};