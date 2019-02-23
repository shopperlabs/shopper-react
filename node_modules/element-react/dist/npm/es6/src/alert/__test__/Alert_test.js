import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';

import Alert from '../';

describe('Alert test', function () {
  it('type', function () {
    var w = mount(React.createElement(Alert, { title: 'TEST', type: 'success' }));
    expect(w.find('div.el-alert--success')).toBeTruthy();
    expect(w.find('span.el-alert__title').exists()).toBeTruthy();
    expect(w.find('span.el-alert__title').text()).toBe('TEST');
  });

  it('default closable', function () {
    var w = mount(React.createElement(Alert, { title: 'TEST', closable: true }));
    expect(w.find('i.el-alert__closebtn').prop('style')).toEqual({});
  });

  it('disable close', function () {
    var w = mount(React.createElement(Alert, { title: 'TEST', closable: false }));
    expect(w.find('i.el-alert__closebtn').prop('style').display).toBe('none');
  });

  it('closeText', function () {
    var w = mount(React.createElement(Alert, { title: 'TEST', closeText: 'testCloseText' }));
    expect(w.find('i.is-customed').text()).toBe('testCloseText');
  });

  it('onClose', function () {
    var onClose = sinon.spy();
    var w = mount(React.createElement(Alert, { title: 'TEST', onClose: onClose }));
    w.find('i.el-alert__closebtn').simulate('click');
    setTimeout(function () {
      expect(onClose.calledOnce).toBe(true);
    }, 1000);
  });

  it('showIcon', function () {
    var w = mount(React.createElement(Alert, { title: 'TEST', showIcon: true }));
    expect(w.find('i.el-alert__icon').exists()).toBeTruthy();
  });

  it('description', function () {
    var w = mount(React.createElement(Alert, {
      title: 'TEST',
      description: 'testDescription' }));
    expect(w.find('p.el-alert__description').text()).toBe('testDescription');
  });

  it('showIcon and description', function () {
    var w = mount(React.createElement(Alert, {
      title: 'TEST',
      showIcon: true,
      description: 'testDescription' }));
    expect(w.find('i.el-alert__icon').exists()).toBeTruthy();
    expect(w.find('p.el-alert__description').text()).toBe('testDescription');
  });
});