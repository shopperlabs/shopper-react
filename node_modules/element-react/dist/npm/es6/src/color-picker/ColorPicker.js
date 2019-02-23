import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import ClickOutside from 'react-click-outside';
import { Component, PropTypes } from '../../libs';
import PickerDropdown from './components/PickerDropdown';
import Color from './color';

var ColorPicker = function (_Component) {
  _inherits(ColorPicker, _Component);

  function ColorPicker(props) {
    _classCallCheck(this, ColorPicker);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    var color = new Color({
      enableAlpha: _this.props.showAlpha,
      format: _this.props.colorFormat
    });

    _this.state = {
      value: _this.props.value,
      color: color,
      showPicker: false,
      showPanelColor: false
    };
    return _this;
  }

  ColorPicker.prototype.componentDidMount = function componentDidMount() {
    var _state = this.state,
        value = _state.value,
        color = _state.color;

    if (value) {
      color.fromString(value);
      this.setState({ color: color });
    }
    this.popperElm = this.refs.dropdown;
  };

  ColorPicker.prototype.getChildContext = function getChildContext() {
    return {
      onChange: this.handleChange.bind(this)
    };
  };

  ColorPicker.prototype.handleChange = function handleChange(color) {
    this.setState({ value: color.value, color: color });
  };

  ColorPicker.prototype.confirmValue = function confirmValue() {
    var value = this.state.value;
    var onChange = this.props.onChange;

    this.setState({ showPicker: false }, function () {
      return onChange(value);
    });
  };

  ColorPicker.prototype.clearValue = function clearValue() {
    var _this2 = this;

    this.setState({
      showPicker: false,
      showPanelColor: false,
      value: null
    }, function () {
      _this2.props.onChange(null);
      _this2.resetColor();
    });
  };

  ColorPicker.prototype.hide = function hide() {
    var _this3 = this;

    this.setState({
      showPicker: false
    }, function () {
      return _this3.resetColor();
    });
  };

  ColorPicker.prototype.resetColor = function resetColor() {
    var _state2 = this.state,
        value = _state2.value,
        color = _state2.color;

    if (value) {
      color.fromString(value);
      this.setState({ color: color });
    }
  };

  ColorPicker.prototype.handleClickOutside = function handleClickOutside() {
    this.setState({ showPicker: false });
  };

  ColorPicker.prototype.render = function render() {
    var _this4 = this;

    var showAlpha = this.props.showAlpha;
    var _state3 = this.state,
        value = _state3.value,
        color = _state3.color,
        showPicker = _state3.showPicker,
        showPanelColor = _state3.showPanelColor;


    var displayedColor = void 0;
    if (!value && !showPanelColor) {
      displayedColor = 'transparent';
    } else {
      var _color$toRgb = color.toRgb(),
          r = _color$toRgb.r,
          g = _color$toRgb.g,
          b = _color$toRgb.b;

      var alpha = color.get('alpha');
      if (typeof alpha === 'number') {
        displayedColor = showAlpha ? 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha / 100 + ')' : 'rgb(' + r + ', ' + g + ', ' + b + ')';
      }
    }
    return React.createElement(
      'div',
      { className: 'el-color-picker' },
      React.createElement(
        'div',
        {
          className: 'el-color-picker__trigger',
          onClick: function onClick() {
            return _this4.setState({ showPicker: !showPicker });
          }
        },
        React.createElement(
          'span',
          {
            className: this.classNames({
              'el-color-picker__color': true,
              'is-alpha': showAlpha
            })
          },
          React.createElement('span', {
            className: 'el-color-picker__color-inner',
            style: { backgroundColor: displayedColor }
          }),
          !value && !showPanelColor && React.createElement('span', { className: 'el-color-picker__empty el-icon-close' })
        ),
        React.createElement('span', { className: 'el-color-picker__icon el-icon-caret-bottom' })
      ),
      React.createElement(PickerDropdown, {
        ref: 'dropdown',
        showPicker: showPicker,
        color: color,
        onPick: function onPick() {
          return _this4.confirmValue();
        },
        onClear: function onClear() {
          return _this4.clearValue();
        },
        showAlpha: showAlpha
      })
    );
  };

  return ColorPicker;
}(Component);

ColorPicker.defaultProps = {
  onChange: function onChange() {}
};


ColorPicker.childContextTypes = {
  onChange: PropTypes.func
};

ColorPicker.propTypes = {
  value: PropTypes.string,
  showAlpha: PropTypes.bool,
  colorFormat: PropTypes.string,
  onChange: PropTypes.func
};

export default ClickOutside(ColorPicker);