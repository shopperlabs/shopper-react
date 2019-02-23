import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import ReactDOM from 'react-dom';
import ClickOutside from 'react-click-outside';
import { Component, PropTypes } from '../../libs';
import Input from '../input';
import Suggestions from './Suggestions';

var AutoComplete = function (_Component) {
  _inherits(AutoComplete, _Component);

  function AutoComplete(props) {
    _classCallCheck(this, AutoComplete);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.state = {
      inputValue: props.value,
      isFocus: false,
      suggestions: [],
      loading: false,
      highlightedIndex: -1
    };
    return _this;
  }

  AutoComplete.prototype.getChildContext = function getChildContext() {
    return {
      component: this
    };
  };

  AutoComplete.prototype.componentWillReceiveProps = function componentWillReceiveProps(props) {
    this.setState({ inputValue: props.value });
  };

  AutoComplete.prototype.componentDidUpdate = function componentDidUpdate() {
    var _this2 = this;

    var visible = this.suggestionVisible();
    var reference = ReactDOM.findDOMNode(this.inputNode);

    if (reference instanceof HTMLElement) {
      setTimeout(function () {
        _this2.suggestionsNode.onVisibleChange(visible, reference.offsetWidth);
      });
    }
  };

  AutoComplete.prototype.getData = function getData(queryString) {
    var _this3 = this;

    this.setState({ loading: true });

    this.props.fetchSuggestions(queryString, function (suggestions) {
      _this3.setState({ loading: false });

      if (Array.isArray(suggestions)) {
        _this3.setState({ suggestions: suggestions });
      }
    });
  };

  AutoComplete.prototype.handleChange = function handleChange(value) {
    this.setState({ inputValue: value });

    if (!this.props.triggerOnFocus && !value) {
      this.setState({ suggestions: [] });return;
    }

    if (this.props.onChange) {
      this.props.onChange(value);
    }

    this.getData(value);
  };

  AutoComplete.prototype.handleFocus = function handleFocus(e) {
    this.setState({ isFocus: true });
    if (this.props.onFocus) this.props.onFocus(e);
    if (this.props.triggerOnFocus) {
      this.getData(this.state.inputValue);
    }
  };

  AutoComplete.prototype.handleKeyEnter = function handleKeyEnter(highlightedIndex) {
    if (this.suggestionVisible() && highlightedIndex >= 0 && highlightedIndex < this.state.suggestions.length) {
      this.select(this.state.suggestions[highlightedIndex]);
    }
  };

  AutoComplete.prototype.handleClickOutside = function handleClickOutside() {
    if (this.state.isFocus) {
      this.setState({ isFocus: false });
    }
  };

  AutoComplete.prototype.select = function select(item) {
    var _this4 = this;

    this.setState({ inputValue: item.value }, function () {
      _this4.setState({ suggestions: [] });
    });

    if (this.props.onSelect) {
      this.props.onSelect(item);
    }
  };

  AutoComplete.prototype.highlight = function highlight(index) {
    if (!this.suggestionVisible() || this.state.loading) return;
    if (index < 0) index = 0;
    if (index >= this.state.suggestions.length) {
      index = this.state.suggestions.length - 1;
    }
    var reference = ReactDOM.findDOMNode(this.suggestionsNode);
    if (reference instanceof HTMLElement) {
      var suggestion = document.querySelector('.el-autocomplete-suggestion__wrap');
      var suggestionList = document.querySelectorAll('.el-autocomplete-suggestion__list li');
      if (suggestion instanceof HTMLElement && suggestionList instanceof NodeList) {
        var highlightItem = suggestionList[index];
        var scrollTop = suggestion.scrollTop;
        var offsetTop = highlightItem.offsetTop;

        if (offsetTop + highlightItem.scrollHeight > scrollTop + suggestion.clientHeight) {
          suggestion.scrollTop += highlightItem.scrollHeight;
        }

        if (offsetTop < scrollTop) {
          suggestion.scrollTop -= highlightItem.scrollHeight;
        }

        this.setState({ highlightedIndex: index });
      }
    }
  };

  /* Computed Methods */

  AutoComplete.prototype.suggestionVisible = function suggestionVisible() {
    var suggestions = this.state.suggestions;
    var isValidData = Array.isArray(suggestions) && suggestions.length > 0;

    return (isValidData || this.state.loading) && this.state.isFocus;
  };

  AutoComplete.prototype.onKeyDown = function onKeyDown(e) {
    var highlightedIndex = this.state.highlightedIndex;


    switch (e.keyCode) {
      case 13:
        this.handleKeyEnter(highlightedIndex);
        break;
      case 38:
        this.highlight(highlightedIndex - 1);
        break;
      case 40:
        this.highlight(highlightedIndex + 1);
        break;
      default:
        break;
    }
  };

  AutoComplete.prototype.render = function render() {
    var _this5 = this;

    var _props = this.props,
        disabled = _props.disabled,
        placeholder = _props.placeholder,
        name = _props.name,
        size = _props.size,
        icon = _props.icon,
        append = _props.append,
        prepend = _props.prepend,
        onIconClick = _props.onIconClick,
        popperClass = _props.popperClass;
    var _state = this.state,
        inputValue = _state.inputValue,
        suggestions = _state.suggestions;


    return React.createElement(
      'div',
      { style: this.style(), className: this.className('el-autocomplete') },
      React.createElement(Input, {
        ref: function ref(node) {
          return _this5.inputNode = node;
        },
        value: inputValue,
        disabled: disabled,
        placeholder: placeholder,
        name: name,
        size: size,
        icon: icon,
        prepend: prepend,
        append: append,
        onIconClick: onIconClick,
        onChange: this.handleChange.bind(this),
        onFocus: this.handleFocus.bind(this),
        onBlur: this.props.onBlur,
        onKeyDown: this.onKeyDown.bind(this)
      }),
      React.createElement(Suggestions, {
        ref: function ref(node) {
          return _this5.suggestionsNode = node;
        },
        className: this.classNames(popperClass),
        suggestions: suggestions
      })
    );
  };

  return AutoComplete;
}(Component);

AutoComplete.defaultProps = {
  triggerOnFocus: true
};


AutoComplete.childContextTypes = {
  component: PropTypes.any
};

export default ClickOutside(AutoComplete);