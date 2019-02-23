import React from 'react';
import { mount, render } from 'enzyme';
import { Switch, Tooltip } from '../../../src';

test('Basic usage', function () {
  var switch1 = mount(React.createElement(Switch, {
    value: true,
    onText: '',
    offText: '' }));

  expect(switch1.find('label.el-switch .el-switch__label').at(0).text()).toEqual('');
  expect(switch1.find('label.el-switch .el-switch__label').at(1).text()).toEqual('');
  expect(switch1.find('label.el-switch').hasClass('is-checked')).toEqual(true);

  // switch off
  switch1.find('input').simulate('change', { target: { value: false } });

  expect(switch1.find('label.el-switch .el-switch__label').at(0).text()).toEqual('');
  expect(switch1.find('label.el-switch .el-switch__label').at(1).text()).toEqual('');
  expect(switch1.find('label.el-switch').at(0).hasClass('is-checked')).toEqual(false);

  var switch2 = mount(React.createElement(Switch, {
    value: true,
    onColor: '#13ce66',
    offColor: '#ff4949' }));

  expect(switch2.find('label.el-switch').at(0).hasClass('is-checked')).toEqual(true);
  expect(switch2.find('label.el-switch .el-switch__label').at(0).text()).toEqual('ON');
  expect(switch2.find('label.el-switch .el-switch__label').at(1).text()).toEqual('OFF');
  expect(switch2.find('label.el-switch .el-switch__label').at(0).prop('style').display).toEqual(undefined);
  expect(switch2.find('label.el-switch .el-switch__label').at(1).prop('style').display).toEqual('none');

  // switch off
  switch2.find('input[type="checkbox"]').simulate('change', { target: { value: false } });

  expect(switch2.find('label.el-switch').at(0).hasClass('is-checked')).toEqual(false);
  expect(switch2.find('label.el-switch .el-switch__label').at(0).text()).toEqual('ON');
  expect(switch2.find('label.el-switch .el-switch__label').at(1).text()).toEqual('OFF');
  expect(switch2.find('label.el-switch .el-switch__label').at(0).prop('style').display).toEqual('none');
  expect(switch2.find('label.el-switch .el-switch__label').at(1).prop('style').display).toEqual(undefined);
});

test('Extended value types', function () {
  var state = {
    value: 100
  };

  var testCallBack = function testCallBack(value) {
    state.value = value;
  };

  var component = mount(React.createElement(
    'div',
    null,
    React.createElement(
      Tooltip,
      {
        placement: 'top',
        content: React.createElement(
          'div',
          null,
          'Switch value: ',
          state.value
        ) },
      React.createElement(Switch, {
        value: state.value,
        onColor: '#13ce66',
        offColor: '#ff4949',
        onValue: 100,
        offValue: 0,
        onChange: testCallBack })
    )
  ));

  expect(component.find('label.el-switch.el-switch--wide').at(0).hasClass('is-checked')).toEqual(true);
  expect(component.find('div .el-switch__label').at(0).text()).toEqual('ON');
  expect(component.find('div .el-switch__label').at(1).text()).toEqual('OFF');
  expect(component.find('div .el-switch__label').at(0).prop('style').display).toEqual(undefined);
  expect(component.find('div .el-switch__label').at(1).prop('style').display).toEqual('none');
  expect(state.value).toBe(100);

  // switch off
  component.find('input[type="checkbox"]').simulate('change', { target: { value: false } });

  expect(component.find('label.el-switch.el-switch--wide').at(0).hasClass('is-checked')).toEqual(false);
  expect(component.find('div .el-switch__label').at(0).text()).toEqual('ON');
  expect(component.find('div .el-switch__label').at(1).text()).toEqual('OFF');
  expect(component.find('div .el-switch__label').at(0).prop('style').display).toEqual('none');
  expect(component.find('div .el-switch__label').at(1).prop('style').display).toEqual(undefined);
  expect(state.value).toBe(0);
});

test('Disabled', function () {
  var switch1 = mount(React.createElement(Switch, {
    value: true,
    onText: '',
    offText: '',
    disabled: true }));

  expect(switch1.find('label.el-switch').at(0).hasClass('is-disabled')).toEqual(true);
  expect(switch1.find('input[type="checkbox"]').at(0).prop('disabled')).toEqual(true);

  var switch2 = mount(React.createElement(Switch, {
    value: true,
    disabled: true }));

  expect(switch2.find('label.el-switch').at(0).hasClass('is-disabled')).toEqual(true);
  expect(switch2.find('input[type="checkbox"]').at(0).prop('disabled')).toEqual(true);
});

test('Focus', function () {
  var focusFn = jest.fn();
  var blurFn = jest.fn();
  var switch1 = mount(React.createElement(Switch, {
    allowFocus: true,
    onFocus: focusFn,
    onBlur: blurFn
  }));

  expect(focusFn.mock.calls.length).toBe(0);
  expect(blurFn.mock.calls.length).toBe(0);

  switch1.find('input').simulate('focus');
  expect(focusFn.mock.calls.length).toBe(1);
  switch1.find('input').simulate('blur');
  expect(blurFn.mock.calls.length).toBe(1);
});