import React from 'react';
import { mount } from 'enzyme';

import { Rate } from '../../../src';

test('Basic usage', function () {
  var state1 = {
    value: 0
  };

  var testCallBack = function testCallBack(value) {
    state1.value = value;
  };
  var component1 = mount(React.createElement(Rate, { onChange: testCallBack }));

  // 模拟component1的第二个星 mouseenter事件
  var rate1 = component1.find('.el-rate .el-rate__item').at(1);
  rate1.simulate('mouseenter');
  setTimeout(function () {
    expect(rate1.find('i').at(0).hasClass('hover')).toEqual(true);
  }, 1000);

  // 模拟component1的第三个星 click事件
  var rate2 = component1.find('.el-rate .el-rate__item').at(2);
  rate2.simulate('click');
  setTimeout(function () {
    expect(rate2.find('i').at(0).prop('style').color).toBe('#F7BA2A');
    expect(state1.value).toEqual(3);
  }, 1000);

  var component2 = mount(React.createElement(Rate, { colors: ['#99A9BF', '#F7BA2A', '#FF9900'] }));

  // 模拟component2的第四个星 click事件
  var rate3 = component2.find('.el-rate .el-rate__item').at(3);
  rate3.simulate('click');
  setTimeout(function () {
    expect(rate3.find('i').at(0).prop('style').color).toEqual('#FF9900');
  }, 1000);
});

test('With text', function () {
  var component = mount(React.createElement(Rate, {
    showText: true,
    texts: ['oops', 'disappointed', 'normal', 'good', 'great']
  }));

  // 模拟component2的第四个星 click事件
  var rate = component.find('.el-rate .el-rate__item').at(3);
  rate.simulate('click');
  expect(component.find('.el-rate__text').at(0).text()).toEqual('good');
});

test('Read-only', function () {
  var component = mount(React.createElement(Rate, { disabled: true, value: 3.9, showText: true }));

  expect(component.find('.el-rate__text').at(0).text()).toEqual('3.9');

  // 模拟component的第五个星 click事件
  var rate = component.find('.el-rate .el-rate__item').at(4);
  rate.simulate('click');
  expect(rate.find('i').at(0).prop('style').color).toEqual('#EFF2F7'); // 点击后颜色不变
});