import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import SvPanel from './SvPanel';
import HueSlider from './HueSlider';
import AlphaSlider from './AlphaSlider';
import { Component, PropTypes, Transition, View } from '../../../libs';
import Locale from '../../locale';

var PickerDropdown = function (_Component) {
  _inherits(PickerDropdown, _Component);

  function PickerDropdown(props) {
    _classCallCheck(this, PickerDropdown);

    return _possibleConstructorReturn(this, _Component.call(this, props));
  }

  PickerDropdown.prototype.render = function render() {
    var _this2 = this;

    var _props = this.props,
        color = _props.color,
        showAlpha = _props.showAlpha,
        onPick = _props.onPick,
        onClear = _props.onClear,
        showPicker = _props.showPicker;

    var currentColor = color.value;
    return React.createElement(
      Transition,
      { name: 'el-zoom-in-top' },
      React.createElement(
        View,
        { show: showPicker },
        React.createElement(
          'div',
          { className: 'el-color-dropdown el-color-picker__panel' },
          React.createElement(
            'div',
            { className: 'el-color-dropdown__main-wrapper' },
            React.createElement(HueSlider, {
              ref: 'hue',
              color: color,
              vertical: true,
              onChange: function onChange(color) {
                return _this2.props.onChange(color);
              }
            }),
            React.createElement(SvPanel, {
              ref: 'sl',
              color: color,
              onChange: function onChange(color) {
                return _this2.props.onChange(color);
              }
            })
          ),
          showAlpha && React.createElement(AlphaSlider, { ref: 'alpha', color: color }),
          React.createElement(
            'div',
            { className: 'el-color-dropdown__btns' },
            React.createElement(
              'span',
              { className: 'el-color-dropdown__value' },
              currentColor
            ),
            React.createElement(
              'a',
              {
                href: 'JavaScript:',
                className: 'el-color-dropdown__link-btn',
                onClick: function onClick() {
                  return onClear();
                }
              },
              Locale.t('el.colorpicker.clear')
            ),
            React.createElement(
              'button',
              {
                className: 'el-color-dropdown__btn',
                onClick: function onClick() {
                  return onPick();
                }
              },
              Locale.t('el.colorpicker.confirm')
            )
          )
        )
      )
    );
  };

  return PickerDropdown;
}(Component);

export default PickerDropdown;


PickerDropdown.propTypes = {
  color: PropTypes.object.isRequired,
  showPicker: PropTypes.bool,
  showAlpha: PropTypes.bool,
  onPick: PropTypes.func,
  onClear: PropTypes.func,
  onChange: PropTypes.func
};

PickerDropdown.defaultProps = {
  onPick: function onPick() {},
  onClear: function onClear() {},
  onChange: function onChange() {}
};