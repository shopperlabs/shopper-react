import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import Popper from 'popper.js';
import { Component, PropTypes, Transition, View } from '../../libs';

var Tooltip = function (_Component) {
  _inherits(Tooltip, _Component);

  function Tooltip(props) {
    _classCallCheck(this, Tooltip);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.state = {
      showPopper: false
    };
    return _this;
  }

  Tooltip.prototype.componentWillReceiveProps = function componentWillReceiveProps(props) {
    if (props.visible !== this.props.visible) {
      this.setState({
        showPopper: props.visible
      });
    }
  };

  Tooltip.prototype.showPopper = function showPopper() {
    var _this2 = this;

    if (!this.props.manual) {
      this.timeout = setTimeout(function () {
        _this2.setState({ showPopper: true });
      }, this.props.openDelay);
    }
  };

  Tooltip.prototype.hidePopper = function hidePopper() {
    if (!this.props.manual) {
      clearTimeout(this.timeout);
      this.setState({ showPopper: false });
    }
  };

  Tooltip.prototype.onEnter = function onEnter() {
    var _refs = this.refs,
        popper = _refs.popper,
        reference = _refs.reference,
        arrow = _refs.arrow;


    if (arrow) {
      arrow.setAttribute('x-arrow', '');
    }

    this.popperJS = new Popper(reference, popper, {
      placement: this.props.placement,
      modifiers: {
        computeStyle: {
          gpuAcceleration: false
        }
      }
    });
  };

  Tooltip.prototype.onAfterLeave = function onAfterLeave() {
    this.popperJS.destroy();
  };

  Tooltip.prototype.render = function render() {
    var _props = this.props,
        effect = _props.effect,
        content = _props.content,
        disabled = _props.disabled,
        transition = _props.transition,
        visibleArrow = _props.visibleArrow;


    return React.createElement(
      'div',
      { style: this.style(), className: this.className('el-tooltip'), onMouseEnter: this.showPopper.bind(this), onMouseLeave: this.hidePopper.bind(this) },
      React.createElement(
        'div',
        { ref: 'reference', className: 'el-tooltip__rel' },
        React.createElement(
          'div',
          null,
          this.props.children
        )
      ),
      !disabled && React.createElement(
        Transition,
        { name: transition, onEnter: this.onEnter.bind(this), onAfterLeave: this.onAfterLeave.bind(this) },
        React.createElement(
          View,
          { show: this.state.showPopper },
          React.createElement(
            'div',
            { ref: 'popper', className: this.classNames("el-tooltip__popper", 'is-' + effect) },
            React.createElement(
              'div',
              null,
              content
            ),
            visibleArrow && React.createElement('div', { ref: 'arrow', className: 'popper__arrow' })
          )
        )
      )
    );
  };

  return Tooltip;
}(Component);

Tooltip.defaultProps = {
  effect: "dark",
  placement: "bottom",
  disabled: false,
  transition: "fade-in-linear",
  visibleArrow: true,
  openDelay: 0,
  manual: false
};
export default Tooltip;


Tooltip.propTypes = {
  // 默认提供的主题: dark, light
  effect: PropTypes.string,
  // 显示的内容，也可以通过 slot#content 传入 DOM
  content: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  // Tooltip 的出现位置 [top, top-start, top-end, bottom, bottom-start, bottom-end, left, left-start, left-end, right, right-start, right-end]
  placement: PropTypes.oneOf(['top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end', 'left', 'left-start', 'left-end', 'right', 'right-start', 'right-end']),
  // 状态是否可用
  disabled: PropTypes.bool,
  // 渐变动画定义
  transition: PropTypes.string,
  // 是否显示 Tooltip 箭头
  visibleArrow: PropTypes.bool,
  // 延迟出现(单位: 毫秒)
  openDelay: PropTypes.number,
  // 手动控制模式，设置为 true 后，mouseenter 和 mouseleave 事件将不会生效
  manual: PropTypes.bool,
  // 手动控制状态的展示
  visible: PropTypes.bool
};