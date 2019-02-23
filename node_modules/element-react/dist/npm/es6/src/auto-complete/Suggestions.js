import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import ReactDOM from 'react-dom';
import Popper from 'popper.js';
import { Component, PropTypes, Transition, View } from '../../libs';

import { Scrollbar } from '../scrollbar';

var Suggestions = function (_Component) {
  _inherits(Suggestions, _Component);

  function Suggestions(props) {
    _classCallCheck(this, Suggestions);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.state = {
      showPopper: false,
      dropdownWidth: ''
    };
    return _this;
  }

  Suggestions.prototype.onVisibleChange = function onVisibleChange(visible, inputWidth) {
    this.setState({
      dropdownWidth: inputWidth,
      showPopper: visible
    });
  };

  Suggestions.prototype.parent = function parent() {
    return this.context.component;
  };

  Suggestions.prototype.onSelect = function onSelect(item) {
    this.parent().select(item);
  };

  Suggestions.prototype.onEnter = function onEnter() {
    var reference = ReactDOM.findDOMNode(this.parent().inputNode);

    this.popperJS = new Popper(reference, this.refs.popper, {
      modifiers: {
        computeStyle: {
          gpuAcceleration: false
        }
      }
    });
  };

  Suggestions.prototype.onAfterLeave = function onAfterLeave() {
    this.popperJS.destroy();
  };

  Suggestions.prototype.render = function render() {
    var _this2 = this;

    var customItem = this.parent().props.customItem;
    var _parent$state = this.parent().state,
        loading = _parent$state.loading,
        highlightedIndex = _parent$state.highlightedIndex;
    var suggestions = this.props.suggestions;
    var _state = this.state,
        showPopper = _state.showPopper,
        dropdownWidth = _state.dropdownWidth;


    return React.createElement(
      Transition,
      { name: 'el-zoom-in-top', onEnter: this.onEnter.bind(this), onAfterLeave: this.onAfterLeave.bind(this) },
      React.createElement(
        View,
        { show: showPopper },
        React.createElement(
          'div',
          {
            ref: 'popper',
            className: this.classNames('el-autocomplete-suggestion', 'el-popper', {
              'is-loading': loading
            }),
            style: {
              width: dropdownWidth,
              zIndex: 1
            }
          },
          React.createElement(
            Scrollbar,
            {
              viewComponent: 'ul',
              wrapClass: 'el-autocomplete-suggestion__wrap',
              viewClass: 'el-autocomplete-suggestion__list'
            },
            loading ? React.createElement(
              'li',
              null,
              React.createElement('i', { className: 'el-icon-loading' })
            ) : suggestions.map(function (item, index) {
              return React.createElement(
                'li',
                {
                  key: index,
                  className: _this2.classNames({ 'highlighted': highlightedIndex === index }),
                  onClick: _this2.onSelect.bind(_this2, item) },
                !customItem ? item.value : React.createElement(customItem, {
                  index: index,
                  item: item
                })
              );
            })
          )
        )
      )
    );
  };

  return Suggestions;
}(Component);

export default Suggestions;


Suggestions.contextTypes = {
  component: PropTypes.any
};