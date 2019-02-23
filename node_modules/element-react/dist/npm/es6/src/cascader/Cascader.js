import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import ReactDOM from 'react-dom';
import ClickOutside from 'react-click-outside';
import debounce from 'throttle-debounce/debounce';
import Popper from 'popper.js';
import { Component, PropTypes, View } from '../../libs';

import CascaderMenu from './Menu';
import Input from '../input';
import i18n from '../locale';

var Cascader = function (_Component) {
  _inherits(Cascader, _Component);

  function Cascader(props) {
    _classCallCheck(this, Cascader);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.state = {
      currentValue: props.value,
      menu: null,
      menuVisible: false,
      inputHover: false,
      inputValue: '',
      flatOptions: _this.flattenOptions(props.options)
    };

    _this.debouncedInputChange = debounce(props.debounce, function () {
      var value = _this.state.inputValue;
      var before = _this.props.beforeFilter(value);

      if (before && before.then) {
        _this.state.menu.setState({
          options: [{
            __IS__FLAT__OPTIONS: true,
            label: i18n.t('el.cascader.loading'),
            value: '',
            disabled: true
          }]
        });

        before.then(function () {
          _this.handleInputChange(value);
        });
      } else {
        _this.handleInputChange(value);
      }
    });
    return _this;
  }

  Cascader.prototype.getChildContext = function getChildContext() {
    return {
      component: this
    };
  };

  Cascader.prototype.componentDidMount = function componentDidMount() {
    this.input = ReactDOM.findDOMNode(this.refs.input);
  };

  Cascader.prototype.componentWillReceiveProps = function componentWillReceiveProps(props) {
    this.setState({
      currentValue: props.value,
      flatOptions: this.flattenOptions(props.options)
    });

    this.state.menu.setState({
      options: props.options
    });
  };

  Cascader.prototype.componentDidUpdate = function componentDidUpdate(props, state) {
    var menuVisible = this.state.menuVisible;


    if (menuVisible !== state.menuVisible) {
      if (menuVisible) {
        this.showMenu();

        if (this.popperJS) {
          this.popperJS.update();
        } else {
          this.popperJS = new Popper(this.input, ReactDOM.findDOMNode(this.refs.menu), {
            placement: 'bottom-start',
            modifiers: {
              computeStyle: {
                gpuAcceleration: false
              }
            }
          });
        }
      } else {
        this.hideMenu();

        if (this.popperJS) {
          this.popperJS.destroy();
        }

        delete this.popperJS;
      }
    }
  };

  Cascader.prototype.componentWillUnmount = function componentWillUnmount() {
    if (this.popperJS) {
      this.popperJS.destroy();
    }
  };

  Cascader.prototype.placeholder = function placeholder() {
    return this.props.placeholder || i18n.t('el.cascader.placeholder');
  };

  Cascader.prototype.updatePopper = function updatePopper() {
    if (this.popperJS) {
      this.popperJS.update();
    }
  };

  Cascader.prototype.initMenu = function initMenu(menu) {
    this.state.menu = menu;
  };

  Cascader.prototype.showMenu = function showMenu() {
    this.state.menu.setState({
      value: this.state.currentValue.slice(0),
      visible: true,
      options: this.props.options,
      inputWidth: this.input.offsetWidth - 2
    });
  };

  Cascader.prototype.hideMenu = function hideMenu() {
    this.setState({ inputValue: '' });

    if (this.state.menu) {
      this.state.menu.setState({ visible: false });
    }
  };

  Cascader.prototype.handleActiveItemChange = function handleActiveItemChange(value) {
    this.updatePopper();

    if (this.props.activeItemChange) {
      this.props.activeItemChange(value);
    }
  };

  Cascader.prototype.handlePick = function handlePick(value) {
    var close = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

    this.setState({
      currentValue: value
    });

    if (close) {
      this.setState({ menuVisible: false });
    }

    if (this.props.onChange) {
      this.props.onChange(value);
    }
  };

  Cascader.prototype.handleInputChange = function handleInputChange(value) {
    var _this2 = this;

    if (!this.state.menuVisible) return;

    var flatOptions = this.state.flatOptions;

    if (!value) {
      this.state.menu.setState({
        options: this.props.options
      });
      return;
    }

    var filteredFlatOptions = flatOptions.filter(function (optionsStack) {
      return optionsStack.some(function (option) {
        return new RegExp(value, 'i').test(option[_this2.labelKey()]);
      });
    });

    if (filteredFlatOptions.length > 0) {
      filteredFlatOptions = filteredFlatOptions.map(function (optionStack) {
        return {
          __IS__FLAT__OPTIONS: true,
          value: optionStack.map(function (item) {
            return item[_this2.valueKey()];
          }),
          label: _this2.renderFilteredOptionLabel(value, optionStack)
        };
      });
    } else {
      filteredFlatOptions = [{
        __IS__FLAT__OPTIONS: true,
        label: i18n.t('el.cascader.noMatch'),
        value: '',
        disabled: true
      }];
    }

    this.state.menu.setState({
      options: filteredFlatOptions
    });
  };

  Cascader.prototype.renderFilteredOptionLabel = function renderFilteredOptionLabel(inputValue, optionsStack) {
    var _this3 = this;

    return optionsStack.map(function (option, index) {
      var label = option[_this3.labelKey()];
      var keywordIndex = label.toLowerCase().indexOf(inputValue.toLowerCase());
      var labelPart = label.slice(keywordIndex, inputValue.length + keywordIndex);
      var node = keywordIndex > -1 ? _this3.highlightKeyword(label, labelPart) : label;
      return index === 0 ? node : [' / ', node];
    });
  };

  Cascader.prototype.highlightKeyword = function highlightKeyword(label, keyword) {
    return label.split(keyword).map(function (node, index) {
      return index === 0 ? node : [React.createElement(
        'span',
        { className: 'el-cascader-menu__item__keyword' },
        keyword
      ), node];
    });
  };

  Cascader.prototype.flattenOptions = function flattenOptions(options) {
    var _this4 = this;

    var ancestor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    var flatOptions = [];

    options.forEach(function (option) {
      var optionsStack = ancestor.concat(option);
      if (!option[_this4.childrenKey()]) {
        flatOptions.push(optionsStack);
      } else {
        if (_this4.changeOnSelect) {
          flatOptions.push(optionsStack);
        }
        flatOptions = flatOptions.concat(_this4.flattenOptions(option[_this4.childrenKey()], optionsStack));
      }
    });

    return flatOptions;
  };

  Cascader.prototype.clearValue = function clearValue(e) {
    e.stopPropagation();

    this.handlePick([], true);
  };

  Cascader.prototype.handleClickOutside = function handleClickOutside() {
    if (this.state.menuVisible) {
      this.setState({ menuVisible: false });
    }
  };

  Cascader.prototype.handleClick = function handleClick() {
    if (this.props.disabled) return;

    if (this.filterable) {
      this.setState({
        menuVisible: true
      });
      return;
    }

    this.setState({
      menuVisible: !this.state.menuVisible
    });
  };

  /* Computed Methods */

  Cascader.prototype.labelKey = function labelKey() {
    return this.props.props.label || 'label';
  };

  Cascader.prototype.valueKey = function valueKey() {
    return this.props.props.value || 'value';
  };

  Cascader.prototype.childrenKey = function childrenKey() {
    return this.props.props.children || 'children';
  };

  Cascader.prototype.currentLabels = function currentLabels() {
    var _this5 = this;

    var options = this.props.options;
    var labels = [];

    this.state.currentValue.forEach(function (value) {
      var targetOption = options && options.filter(function (option) {
        return option[_this5.valueKey()] === value;
      })[0];

      if (targetOption) {
        labels.push(targetOption[_this5.labelKey()]);
        options = targetOption[_this5.childrenKey()];
      }
    });

    return labels;
  };

  Cascader.prototype.render = function render() {
    var _this6 = this;

    var _props = this.props,
        size = _props.size,
        disabled = _props.disabled,
        filterable = _props.filterable,
        clearable = _props.clearable,
        showAllLevels = _props.showAllLevels;
    var _state = this.state,
        menuVisible = _state.menuVisible,
        inputHover = _state.inputHover,
        inputValue = _state.inputValue;

    var currentLabels = this.currentLabels();

    return React.createElement(
      'span',
      { ref: 'reference', className: this.className('el-cascader', size ? 'el-cascader--' + size : '', {
          'is-opened': menuVisible,
          'is-disabled': disabled
        }) },
      React.createElement(
        'span',
        {
          onClick: this.handleClick.bind(this),
          onMouseEnter: function onMouseEnter() {
            _this6.setState({ inputHover: true });
          },
          onMouseLeave: function onMouseLeave() {
            _this6.setState({ inputHover: false });
          }
        },
        React.createElement(Input, {
          ref: 'input',
          readOnly: !filterable,
          placeholder: currentLabels.length ? undefined : this.placeholder(),
          value: inputValue,
          onChange: function onChange(value) {
            _this6.setState({ inputValue: value });
          },
          onKeyUp: this.debouncedInputChange.bind(this),
          size: size,
          disabled: disabled,
          icon: clearable && inputHover && currentLabels.length ? React.createElement('i', {
            className: 'el-input__icon el-icon-circle-close el-cascader__clearIcon',
            onClick: this.clearValue.bind(this)
          }) : React.createElement('i', {
            className: this.classNames('el-input__icon el-icon-caret-bottom', {
              'is-reverse': menuVisible
            })
          })
        }),
        React.createElement(
          View,
          { show: currentLabels.length },
          React.createElement(
            'span',
            { className: 'el-cascader__label' },
            showAllLevels ? currentLabels.map(function (label, index) {
              return React.createElement(
                'label',
                { key: index },
                label,
                index < currentLabels.length - 1 && React.createElement(
                  'span',
                  null,
                  ' / '
                )
              );
            }) : currentLabels[currentLabels.length - 1]
          )
        )
      ),
      React.createElement(CascaderMenu, { ref: 'menu' })
    );
  };

  return Cascader;
}(Component);

Cascader.childContextTypes = {
  component: PropTypes.any
};

Cascader.propTypes = {
  options: PropTypes.array.isRequired,
  props: PropTypes.object,
  value: PropTypes.array,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  clearable: PropTypes.bool,
  changeOnSelect: PropTypes.bool,
  popperClass: PropTypes.string,
  expandTrigger: PropTypes.string,
  filterable: PropTypes.bool,
  size: PropTypes.string,
  showAllLevels: PropTypes.bool,
  debounce: PropTypes.number,
  activeItemChange: PropTypes.func,
  beforeFilter: PropTypes.func,
  onChange: PropTypes.func
};

Cascader.defaultProps = {
  value: [],
  clearable: false,
  expandTrigger: 'click',
  showAllLevels: true,
  debounce: 300,
  props: {
    children: 'children',
    label: 'label',
    value: 'value',
    disabled: 'disabled'
  },
  beforeFilter: function beforeFilter() {
    return function () {};
  }
};

export default ClickOutside(Cascader);