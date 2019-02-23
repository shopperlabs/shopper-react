import React from 'react';
import { mount, shallow } from 'enzyme';
import { Button, Tooltip } from '../../../src';

test('Basic Usage', function () {
  var tooltip = shallow(React.createElement(
    Tooltip,
    { effect: 'dark', content: 'Top Left prompts info', placement: 'top-start' },
    React.createElement(
      Button,
      null,
      'top-start'
    )
  ));

  expect(tooltip.find('.el-tooltip__rel').exists()).toEqual(true);
  expect(tooltip.find('.el-tooltip__rel').contains(React.createElement(
    Button,
    null,
    'top-start'
  ))).toEqual(true);

  expect(tooltip.find('.el-tooltip__popper').exists()).toEqual(true);
  expect(tooltip.find('.el-tooltip__popper').at(0).hasClass('is-dark')).toEqual(true);
  expect(tooltip.find('.el-tooltip__popper').text()).toEqual('Top Left prompts info');
});

test('Theme', function () {
  var tooltip1 = shallow(React.createElement(
    Tooltip,
    { content: 'Top center', placement: 'top' },
    React.createElement(
      Button,
      null,
      'Dark'
    )
  ));

  expect(tooltip1.find('div .el-tooltip__popper').at(0).hasClass('is-dark')).toEqual(true);

  var tooltip2 = mount(React.createElement(
    'div',
    null,
    React.createElement(
      Tooltip,
      { content: 'Bottom center', placement: 'bottom', effect: 'light' },
      React.createElement(
        Button,
        null,
        'Light'
      )
    )
  ));

  expect(tooltip2.find('div .el-tooltip__popper').at(0).hasClass('is-light')).toEqual(true);
});

test('More Content', function () {
  var tooltip = mount(React.createElement(
    Tooltip,
    { placement: 'top', content: React.createElement(
        'div',
        null,
        'multiple lines',
        React.createElement('br', null),
        'second line'
      ) },
    React.createElement(
      Button,
      null,
      'Top center'
    )
  ));

  expect(tooltip.contains(React.createElement(
    'div',
    null,
    'multiple lines',
    React.createElement('br', null),
    'second line'
  ))).toBe(true);
});

test('Advanced usage', function () {
  var state = {
    disabled: false
  };

  var tooltip = mount(React.createElement(
    Tooltip,
    { disabled: state.disabled, content: 'click to close tooltip function', placement: 'bottom', effect: 'light' },
    React.createElement(
      Button,
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