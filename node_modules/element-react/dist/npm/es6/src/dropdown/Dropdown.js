import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import ReactDOM from 'react-dom';
import ClickOutside from 'react-click-outside';
import { Component, PropTypes } from '../../libs';

import Button from '../button';

var Dropdown = function (_Component) {
  _inherits(Dropdown, _Component);

  function Dropdown(props) {
    _classCallCheck(this, Dropdown);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.state = {
      visible: false
    };
    return _this;
  }

  Dropdown.prototype.getChildContext = function getChildContext() {
    return {
      component: this
    };
  };

  Dropdown.prototype.componentDidMount = function componentDidMount() {
    this.initEvent();
  };

  Dropdown.prototype.componentWillUpdate = function componentWillUpdate(props, state) {
    if (state.visible != this.state.visible) {
      this.refs.dropdown.onVisibleChange(state.visible);

      if (this.props.onVisibleChange) {
        this.props.onVisibleChange(state.visible);
      }
    }
  };

  Dropdown.prototype.handleClickOutside = function handleClickOutside() {
    if (this.state.visible) {
      this.setState({ visible: false });
    }
  };

  Dropdown.prototype.show = function show() {
    var _this2 = this;

    clearTimeout(this.timeout);
    this.timeout = setTimeout(function () {
      return _this2.setState({ visible: true });
    }, 250);
  };

  Dropdown.prototype.hide = function hide() {
    var _this3 = this;

    clearTimeout(this.timeout);
    this.timeout = setTimeout(function () {
      return _this3.setState({ visible: false });
    }, 150);
  };

  Dropdown.prototype.handleClick = function handleClick() {
    this.setState({ visible: !this.state.visible });
  };

  Dropdown.prototype.initEvent = function initEvent() {
    var _props = this.props,
        trigger = _props.trigger,
        splitButton = _props.splitButton;

    var triggerElm = ReactDOM.findDOMNode(splitButton ? this.refs.trigger : this.refs.default);

    if (trigger === 'hover') {
      triggerElm.addEventListener('mouseenter', this.show.bind(this));
      triggerElm.addEventListener('mouseleave', this.hide.bind(this));

      var dropdownElm = ReactDOM.findDOMNode(this.refs.dropdown);

      dropdownElm.addEventListener('mouseenter', this.show.bind(this));
      dropdownElm.addEventListener('mouseleave', this.hide.bind(this));
    } else if (trigger === 'click') {
      triggerElm.addEventListener('click', this.handleClick.bind(this));
    }
  };

  Dropdown.prototype.handleMenuItemClick = function handleMenuItemClick(command, instance) {
    var _this4 = this;

    if (this.props.hideOnClick) {
      this.setState({
        visible: false
      });
    }

    if (this.props.onCommand) {
      setTimeout(function () {
        _this4.props.onCommand(command, instance);
      });
    }
  };

  Dropdown.prototype.render = function render() {
    var _props2 = this.props,
        splitButton = _props2.splitButton,
        type = _props2.type,
        size = _props2.size,
        menu = _props2.menu;


    return React.createElement(
      'div',
      { style: this.style(), className: this.className('el-dropdown') },
      splitButton ? React.createElement(
        Button.Group,
        null,
        React.createElement(
          Button,
          { type: type, size: size, onClick: this.props.onClick.bind(this) },
          this.props.children
        ),
        React.createElement(
          Button,
          { ref: 'trigger', type: type, size: size, className: 'el-dropdown__caret-button' },
          React.createElement('i', { className: 'el-dropdown__icon el-icon-caret-bottom' })
        )
      ) : React.cloneElement(this.props.children, { ref: 'default' }),
      React.cloneElement(menu, {
        ref: 'dropdown'
      })
    );
  };

  return Dropdown;
}(Component);

Dropdown.childContextTypes = {
  component: PropTypes.any
};

Dropdown.propTypes = {
  menu: PropTypes.node.isRequired,
  type: PropTypes.string,
  size: PropTypes.string,
  trigger: PropTypes.oneOf(['hover', 'click']),
  menuAlign: PropTypes.oneOf(['start', 'end']),
  splitButton: PropTypes.bool,
  hideOnClick: PropTypes.bool,
  onClick: PropTypes.func,
  onCommand: PropTypes.func,
  onVisibleChange: PropTypes.func
};

Dropdown.defaultProps = {
  hideOnClick: true,
  trigger: 'hover',
  menuAlign: 'end'
};

export default ClickOutside(Dropdown);