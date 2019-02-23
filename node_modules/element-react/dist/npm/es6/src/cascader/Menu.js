import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import { Component, PropTypes, Transition, View } from '../../libs';

var CascaderMenu = function (_Component) {
  _inherits(CascaderMenu, _Component);

  function CascaderMenu(props) {
    _classCallCheck(this, CascaderMenu);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.state = {
      inputWidth: 0,
      options: [],
      props: {},
      visible: false,
      activeValue: [],
      value: [],
      expandTrigger: 'click',
      changeOnSelect: false,
      popperClass: ''
    };
    return _this;
  }

  CascaderMenu.prototype.parent = function parent() {
    return this.context.component;
  };

  CascaderMenu.prototype.componentDidMount = function componentDidMount() {
    this.parent().initMenu(this);
  };

  CascaderMenu.prototype.componentDidUpdate = function componentDidUpdate(props, state) {
    if (state.value !== this.state.value || state.visible !== this.state.visible) {
      this.setState({ activeValue: this.state.value });
    }
  };

  CascaderMenu.prototype.select = function select(item, menuIndex) {
    var activeValue = this.state.activeValue;

    if (item.__IS__FLAT__OPTIONS) {
      activeValue = item.value;
    } else {
      if (!menuIndex) {
        activeValue = [item.value];
      } else {
        activeValue.splice(menuIndex, activeValue.length - 1, item.value);
      }
    }

    this.forceUpdate();
    this.parent().handlePick(activeValue);
  };

  CascaderMenu.prototype.handleMenuLeave = function handleMenuLeave() {};

  CascaderMenu.prototype.activeItem = function activeItem(item, menuIndex) {
    var activeOptions = this.activeOptions();

    this.state.activeValue.splice(menuIndex, activeOptions.length, item.value);

    this.forceUpdate();

    if (this.parent().props.changeOnSelect) {
      this.parent().handlePick(this.state.activeValue, false);
    } else {
      this.parent().handleActiveItemChange(this.state.activeValue);
    }
  };

  /* Computed Methods */

  CascaderMenu.prototype.activeOptions = function activeOptions() {
    var _this2 = this;

    var activeValue = this.state.activeValue;
    var configurableProps = ['label', 'value', 'children', 'disabled'];
    var formatOptions = function formatOptions(options) {
      options.forEach(function (option) {
        if (option.__IS__FLAT__OPTIONS) return;
        configurableProps.forEach(function (prop) {
          var value = option[_this2.parent().props.props[prop] || prop];
          if (value) option[prop] = value;
        });
        if (Array.isArray(option.children)) {
          formatOptions(option.children);
        }
      });
    };
    var loadActiveOptions = function loadActiveOptions(options) {
      var activeOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

      var level = activeOptions.length;
      activeOptions[level] = options;
      var active = activeValue[level];
      if (active) {
        options = options.filter(function (option) {
          return option.value === active;
        })[0];
        if (options && options.children) {
          loadActiveOptions(options.children, activeOptions);
        }
      }
      return activeOptions;
    };

    formatOptions(this.state.options);

    return loadActiveOptions(this.state.options);
  };

  CascaderMenu.prototype.render = function render() {
    var _this3 = this;

    var _parent$props = this.parent().props,
        expandTrigger = _parent$props.expandTrigger,
        popperClass = _parent$props.popperClass;
    var _state = this.state,
        activeValue = _state.activeValue,
        visible = _state.visible;

    var activeOptions = this.activeOptions();

    var menus = activeOptions.map(function (menu, menuIndex) {
      var isFlat = false;

      var items = menu.map(function (item, index) {
        var events = {};

        if (item.__IS__FLAT__OPTIONS) isFlat = true;

        if (!item.disabled) {
          if (item.children) {
            var triggerEvent = {
              click: 'onClick',
              hover: 'onMouseEnter'
            }[expandTrigger];
            events[triggerEvent] = function () {
              _this3.activeItem(item, menuIndex);
            };
          } else {
            events.onClick = function () {
              _this3.select(item, menuIndex);
            };
          }
        }

        return React.createElement(
          'li',
          _extends({ key: index, className: _this3.classNames({
              'el-cascader-menu__item': true,
              'el-cascader-menu__item--extensible': item.children,
              'is-active': item.value === activeValue[menuIndex],
              'is-disabled': item.disabled
            })
          }, events),
          item.label
        );
      });

      var menuStyle = {};

      if (isFlat) {
        menuStyle.minWidth = _this3.inputWidth + 'px';
      }

      return React.createElement(
        'ul',
        { key: menuIndex, className: _this3.classNames({
            'el-cascader-menu': true,
            'el-cascader-menu--flexible': isFlat
          }), style: menuStyle },
        items
      );
    });

    return React.createElement(
      Transition,
      { name: 'el-zoom-in-top' },
      React.createElement(
        View,
        { show: visible },
        React.createElement(
          'div',
          { className: this.classNames('el-cascader-menus', popperClass) },
          menus
        )
      )
    );
  };

  return CascaderMenu;
}(Component);

export default CascaderMenu;


CascaderMenu.contextTypes = {
  component: PropTypes.any
};