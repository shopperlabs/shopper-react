'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _src = require('../../../src');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test('Basic Usage', function () {
  var tooltip = (0, _enzyme.shallow)(_react2.default.createElement(
    _src.Tooltip,
    { effect: 'dark', content: 'Top Left prompts info', placement: 'top-start' },
    _react2.default.createElement(
      _src.Button,
      null,
      'top-start'
    )
  ));

  expect(tooltip.find('.el-tooltip__rel').exists()).toEqual(true);
  expect(tooltip.find('.el-tooltip__rel').contains(_react2.default.createElement(
    _src.Button,
    null,
    'top-start'
  ))).toEqual(true);

  expect(tooltip.find('.el-tooltip__popper').exists()).toEqual(true);
  expect(tooltip.find('.el-tooltip__popper').at(0).hasClass('is-dark')).toEqual(true);
  expect(tooltip.find('.el-tooltip__popper').text()).toEqual('Top Left prompts info');
});

test('Theme', function () {
  var tooltip1 = (0, _enzyme.shallow)(_react2.default.createElement(
    _src.Tooltip,
    { content: 'Top center', placement: 'top' },
    _react2.default.createElement(
      _src.Button,
      null,
      'Dark'
    )
  ));

  expect(tooltip1.find('div .el-tooltip__popper').at(0).hasClass('is-dark')).toEqual(true);

  var tooltip2 = (0, _enzyme.mount)(_react2.default.createElement(
    'div',
    null,
    _react2.default.createElement(
      _src.Tooltip,
      { content: 'Bottom center', placement: 'bottom', effect: 'light' },
      _react2.default.createElement(
        _src.Button,
        null,
        'Light'
      )
    )
  ));

  expect(tooltip2.find('div .el-tooltip__popper').at(0).hasClass('is-light')).toEqual(true);
});

test('More Content', function () {
  var tooltip = (0, _enzyme.mount)(_react2.default.createElement(
    _src.Tooltip,
    { placement: 'top', content: _react2.default.createElement(
        'div',
        null,
        'multiple lines',
        _react2.default.createElement('br', null),
        'second line'
      ) },
    _react2.default.createElement(
      _src.Button,
      null,
      'Top center'
    )
  ));

  expect(tooltip.contains(_react2.default.createElement(
    'div',
    null,
    'multiple lines',
    _react2.default.createElement('br', null),
    'second line'
  ))).toBe(true);
});

test('Advanced usage', function () {
  var state = {
    disabled: false
  };

  var tooltip = (0, _enzyme.mount)(_react2.default.createElement(
    _src.Tooltip,
    { disabled: state.disabled, content: 'click to close tooltip function', placement: 'bottom', effect: 'light' },
    _react2.default.createElement(
      _src.Button,
      { onClick: function onClick() {
          state.disabled = true;
        } },
      'click to ' + (state.disabled ? 'active' : 'close') + ' tooltip function'
    )
  ));

  expect(state.disabled).toBe(false);

  tooltip.find('Button').simulate('click');

  expect(state.disabled).toBe(true);
});
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }
}();

;