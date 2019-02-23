import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';

var ANIMATION_DURATION = 300;

var CollapseTransition = function (_Component) {
  _inherits(CollapseTransition, _Component);

  function CollapseTransition() {
    _classCallCheck(this, CollapseTransition);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  CollapseTransition.prototype.componentDidMount = function componentDidMount() {
    this.beforeEnter();
    if (this.props.isShow) {
      this.enter();
    }
  };

  CollapseTransition.prototype.componentWillUnmount = function componentWillUnmount() {
    this.beforeLeave();
    this.leave();
  };

  CollapseTransition.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (this.props.isShow !== nextProps.isShow) this.triggerChange(nextProps.isShow);
  };

  CollapseTransition.prototype.triggerChange = function triggerChange(isShow) {
    clearTimeout(this.enterTimer);
    clearTimeout(this.leaveTimer);
    if (isShow) {
      this.beforeEnter();
      this.enter();
    } else {
      this.beforeLeave();
      this.leave();
    }
  };

  CollapseTransition.prototype.beforeEnter = function beforeEnter() {
    var el = this.selfRef;
    //prepare
    el.dataset.oldPaddingTop = el.style.paddingTop;
    el.dataset.oldPaddingBottom = el.style.paddingBottom;
    el.dataset.oldOverflow = el.style.overflow;
    el.style.height = '0';
    el.style.paddingTop = 0;
    el.style.paddingBottom = 0;
  };

  CollapseTransition.prototype.enter = function enter() {
    var _this2 = this;

    var el = this.selfRef;
    //start
    el.style.display = 'block';
    if (el.scrollHeight !== 0) {
      el.style.height = el.scrollHeight + 'px';
      el.style.paddingTop = el.dataset.oldPaddingTop;
      el.style.paddingBottom = el.dataset.oldPaddingBottom;
    } else {
      el.style.height = '';
      el.style.paddingTop = el.dataset.oldPaddingTop;
      el.style.paddingBottom = el.dataset.oldPaddingBottom;
    }

    el.style.overflow = 'hidden';

    this.enterTimer = setTimeout(function () {
      return _this2.afterEnter();
    }, ANIMATION_DURATION);
  };

  CollapseTransition.prototype.afterEnter = function afterEnter() {
    var el = this.selfRef;
    el.style.display = 'block';
    el.style.height = '';
    el.style.overflow = el.dataset.oldOverflow;
  };

  CollapseTransition.prototype.beforeLeave = function beforeLeave() {
    var el = this.selfRef;
    el.dataset.oldPaddingTop = el.style.paddingTop;
    el.dataset.oldPaddingBottom = el.style.paddingBottom;
    el.dataset.oldOverflow = el.style.overflow;

    el.style.display = 'block';
    if (el.scrollHeight !== 0) {
      el.style.height = el.scrollHeight + 'px';
    }
    el.style.overflow = 'hidden';
  };

  CollapseTransition.prototype.leave = function leave() {
    var _this3 = this;

    var el = this.selfRef;
    if (el.scrollHeight !== 0) {
      el.style.height = 0;
      el.style.paddingTop = 0;
      el.style.paddingBottom = 0;
    }
    this.leaveTimer = setTimeout(function () {
      return _this3.afterLeave();
    }, ANIMATION_DURATION);
  };

  CollapseTransition.prototype.afterLeave = function afterLeave() {
    var el = this.selfRef;
    if (!el) return;

    el.style.display = 'none';
    el.style.height = '';
    el.style.overflow = el.dataset.oldOverflow;
    el.style.paddingTop = el.dataset.oldPaddingTop;
    el.style.paddingBottom = el.dataset.oldPaddingBottom;
  };

  CollapseTransition.prototype.render = function render() {
    var _this4 = this;

    return React.createElement(
      'div',
      {
        className: 'collapse-transition',
        style: { overflow: 'hidden' },
        ref: function ref(e) {
          return _this4.selfRef = e;
        }
      },
      this.props.children
    );
  };

  return CollapseTransition;
}(Component);

export default CollapseTransition;