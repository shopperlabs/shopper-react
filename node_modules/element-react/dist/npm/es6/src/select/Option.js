import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import { Component, PropTypes, View } from '../../libs';

var Option = function (_Component) {
  _inherits(Option, _Component);

  function Option(props) {
    _classCallCheck(this, Option);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.state = {
      index: -1,
      visible: true,
      hitState: false
    };
    return _this;
  }

  Option.prototype.componentWillMount = function componentWillMount() {
    this.parent().onOptionCreate(this);

    this.setState({
      index: this.parent().state.options.indexOf(this)
    });

    if (this.currentSelected() === true) {
      this.parent().addOptionToValue(this, true);
    }
  };

  Option.prototype.componentWillUnmount = function componentWillUnmount() {
    this.parent().onOptionDestroy(this);
  };

  Option.prototype.parent = function parent() {
    return this.context.component;
  };

  Option.prototype.currentSelected = function currentSelected() {
    return this.props.selected || (this.parent().props.multiple ? this.parent().state.value.indexOf(this.props.value) > -1 : this.parent().state.value === this.props.value);
  };

  Option.prototype.currentLabel = function currentLabel() {
    return this.props.label || (typeof this.props.value === 'string' || typeof this.props.value === 'number' ? this.props.value : '');
  };

  Option.prototype.itemSelected = function itemSelected() {
    if (Object.prototype.toString.call(this.parent().state.selected) === '[object Object]') {
      return this === this.parent().state.selected;
    } else if (Array.isArray(this.parent().state.selected)) {
      return this.parent().state.selected.map(function (el) {
        return el.props.value;
      }).indexOf(this.props.value) > -1;
    }

    return false;
  };

  Option.prototype.hoverItem = function hoverItem() {
    if (!this.props.disabled && !this.parent().props.disabled) {
      this.parent().setState({
        hoverIndex: this.parent().state.options.indexOf(this)
      });
    }
  };

  Option.prototype.selectOptionClick = function selectOptionClick() {
    if (this.props.disabled !== true && this.parent().props.disabled !== true) {
      this.parent().onOptionClick(this);
    }
  };

  Option.prototype.queryChange = function queryChange(query) {
    // query 里如果有正则中的特殊字符，需要先将这些字符转义
    var parsedQuery = query.replace(/(\^|\(|\)|\[|\]|\$|\*|\+|\.|\?|\\|\{|\}|\|)/g, '\\$1');
    var visible = new RegExp(parsedQuery, 'i').test(this.currentLabel());

    if (!visible) {
      this.parent().setState({
        filteredOptionsCount: this.parent().state.filteredOptionsCount - 1
      });
    }

    this.setState({ visible: visible });
  };

  Option.prototype.resetIndex = function resetIndex() {
    this.setState({
      index: this.parent().state.options.indexOf(this)
    });
  };

  Option.prototype.render = function render() {
    var _state = this.state,
        visible = _state.visible,
        index = _state.index;


    return React.createElement(
      View,
      { show: visible },
      React.createElement(
        'li',
        {
          style: this.style(),
          className: this.className('el-select-dropdown__item', {
            'selected': this.itemSelected(),
            'is-disabled': this.props.disabled || this.parent().props.disabled,
            'hover': this.parent().state.hoverIndex === index
          }),
          onMouseEnter: this.hoverItem.bind(this),
          onClick: this.selectOptionClick.bind(this)
        },
        this.props.children || React.createElement(
          'span',
          null,
          this.currentLabel()
        )
      )
    );
  };

  return Option;
}(Component);

export default Option;


Option.contextTypes = {
  component: PropTypes.any
};

Option.propTypes = {
  value: PropTypes.any.isRequired,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  selected: PropTypes.bool,
  disabled: PropTypes.bool
};