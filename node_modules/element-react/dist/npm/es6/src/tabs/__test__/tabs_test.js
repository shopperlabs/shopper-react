import React from 'react';
import { mount } from 'enzyme';

import { Tabs, Icon, Button } from '../../../src';

test('Basic usage', function () {
  var state = {
    name: ''
  };

  var tabs = mount(React.createElement(
    Tabs,
    { activeName: '2', onTabClick: function onTabClick(tab) {
        return state.name = tab.props.name;
      } },
    React.createElement(
      Tabs.Pane,
      { label: '\u7528\u6237\u7BA1\u7406', name: '1' },
      '\u7528\u6237\u7BA1\u7406'
    ),
    React.createElement(
      Tabs.Pane,
      { label: '\u914D\u7F6E\u7BA1\u7406', name: '2' },
      '\u914D\u7F6E\u7BA1\u7406'
    ),
    React.createElement(
      Tabs.Pane,
      { label: '\u89D2\u8272\u7BA1\u7406', name: '3' },
      '\u89D2\u8272\u7BA1\u7406'
    ),
    React.createElement(
      Tabs.Pane,
      { label: '\u5B9A\u65F6\u8865\u507F\u4EFB\u52A1', name: '4' },
      '\u5B9A\u65F6\u8865\u507F\u4EFB\u52A1'
    )
  ));

  expect(tabs.find('.el-tabs .el-tabs__item').at(0).text()).toEqual('用户管理');
  expect(tabs.find('.el-tabs .el-tab-pane').at(0).text()).toEqual('用户管理');
  expect(tabs.find('.el-tabs .el-tabs__item').at(1).text()).toEqual('配置管理');
  expect(tabs.find('.el-tabs .el-tab-pane').at(1).text()).toEqual('配置管理');
  expect(tabs.find('.el-tabs .el-tabs__item').at(2).text()).toEqual('角色管理');
  expect(tabs.find('.el-tabs .el-tab-pane').at(2).text()).toEqual('角色管理');
  expect(tabs.find('.el-tabs .el-tabs__item').at(3).text()).toEqual('定时补偿任务');
  expect(tabs.find('.el-tabs .el-tab-pane').at(3).text()).toEqual('定时补偿任务');

  tabs.mount();
  expect(tabs.find('.el-tabs .el-tabs__item').at(1).hasClass('is-active')).toBeTruthy();
  expect(tabs.find('.el-tabs .el-tab-pane').at(1).prop('style').display).toEqual(undefined);

  tabs.find('.el-tabs .el-tabs__item').at(0).simulate('click');
  expect(tabs.find('.el-tabs .el-tabs__item').at(0).hasClass('is-active')).toBeTruthy();
  expect(tabs.find('.el-tabs .el-tabs__item').at(1).hasClass('is-active')).toBeFalsy();
  expect(state.name).toBe('1');
});

test('Card Style', function () {
  var tabs = mount(React.createElement(
    Tabs,
    { type: 'card', value: '1' },
    React.createElement(
      Tabs.Pane,
      { label: '\u7528\u6237\u7BA1\u7406', name: '1' },
      '\u7528\u6237\u7BA1\u7406'
    ),
    React.createElement(
      Tabs.Pane,
      { label: '\u914D\u7F6E\u7BA1\u7406', name: '2' },
      '\u914D\u7F6E\u7BA1\u7406'
    ),
    React.createElement(
      Tabs.Pane,
      { label: '\u89D2\u8272\u7BA1\u7406', name: '3' },
      '\u89D2\u8272\u7BA1\u7406'
    ),
    React.createElement(
      Tabs.Pane,
      { label: '\u5B9A\u65F6\u8865\u507F\u4EFB\u52A1', name: '4' },
      '\u5B9A\u65F6\u8865\u507F\u4EFB\u52A1'
    )
  ));

  expect(tabs.find('.el-tabs').hasClass('el-tabs--card')).toBeTruthy();
});

test('Border card', function () {
  var tabs = mount(React.createElement(
    Tabs,
    { type: 'border-card', activeName: '1' },
    React.createElement(
      Tabs.Pane,
      { label: '\u7528\u6237\u7BA1\u7406', name: '1' },
      '\u7528\u6237\u7BA1\u7406'
    ),
    React.createElement(
      Tabs.Pane,
      { label: '\u914D\u7F6E\u7BA1\u7406', name: '2' },
      '\u914D\u7F6E\u7BA1\u7406'
    ),
    React.createElement(
      Tabs.Pane,
      { label: '\u89D2\u8272\u7BA1\u7406', name: '3' },
      '\u89D2\u8272\u7BA1\u7406'
    ),
    React.createElement(
      Tabs.Pane,
      { label: '\u5B9A\u65F6\u8865\u507F\u4EFB\u52A1', name: '4' },
      '\u5B9A\u65F6\u8865\u507F\u4EFB\u52A1'
    )
  ));

  expect(tabs.find('.el-tabs').hasClass('el-tabs--border-card')).toBeTruthy();
});

test('Custom Tab', function () {
  var label = React.createElement(
    'span',
    null,
    React.createElement(Icon, { name: 'date' }),
    ' \u7528\u6237\u7BA1\u7406'
  );
  var tabs = mount(React.createElement(
    Tabs,
    { type: 'border-card', activeName: '1' },
    React.createElement(
      Tabs.Pane,
      { label: label, name: '1' },
      '\u7528\u6237\u7BA1\u7406'
    ),
    React.createElement(
      Tabs.Pane,
      { label: '\u914D\u7F6E\u7BA1\u7406', name: '2' },
      '\u914D\u7F6E\u7BA1\u7406'
    ),
    React.createElement(
      Tabs.Pane,
      { label: '\u89D2\u8272\u7BA1\u7406', name: '3' },
      '\u89D2\u8272\u7BA1\u7406'
    ),
    React.createElement(
      Tabs.Pane,
      { label: '\u5B9A\u65F6\u8865\u507F\u4EFB\u52A1', name: '4' },
      '\u5B9A\u65F6\u8865\u507F\u4EFB\u52A1'
    )
  ));

  expect(tabs.find('.el-tabs .el-tabs__header i').html()).toEqual('<i class="el-icon-date"></i>');
});

test('Add & Close tab', function () {
  var state = {
    tabs: [{
      title: 'Tab 1',
      name: 'Tab 1',
      content: 'Tab 1 content'
    }, {
      title: 'Tab 2',
      name: 'Tab 2',
      content: 'Tab 2 content'
    }],
    tabIndex: 2
  };

  var editTab = function editTab(action, tab) {
    if (action === 'add') {
      var _tabs = state.tabs,
          tabIndex = state.tabIndex;

      var index = tabIndex + 1;

      _tabs.push({
        title: 'new Tab',
        name: 'Tab ' + index,
        content: 'new Tab content'
      });
      state.tabs = _tabs;
      state.tabIndex = index;
    }

    if (action === 'remove') {
      var _tabs2 = state.tabs;


      _tabs2.splice(tab.key.replace(/^\.\$/, ''), 1);
      state.tabs = _tabs2;
    }
  };

  var tabs = mount(React.createElement(
    Tabs,
    { type: 'card', value: 'Tab 2', editable: true, onTabEdit: function onTabEdit(action, tab) {
        return editTab(action, tab);
      } },
    state.tabs.map(function (item, index) {
      return React.createElement(
        Tabs.Pane,
        { key: index, closable: true, label: item.title, name: item.name },
        item.content
      );
    })
  ));

  expect(tabs.find('.el-tabs__new-tab').length).toBe(1);
  expect(tabs.find('.el-tabs .el-tabs__item').at(0).hasClass('is-closable')).toBeTruthy();

  tabs.find('.el-tabs__new-tab').simulate('click');
  tabs.setProps({
    children: state.tabs.map(function (item, index) {
      return React.createElement(
        Tabs.Pane,
        { key: index, closable: true, label: item.title, name: item.name },
        item.content
      );
    })
  });
  expect(tabs.find('.el-tabs .el-tabs__item').length).toBe(3);

  tabs.find('.el-tabs .el-tabs__item').at(1).find('.el-icon-close').simulate('click');
  tabs.setProps({
    children: state.tabs.map(function (item, index) {
      return React.createElement(
        Tabs.Pane,
        { key: index, closable: true, label: item.title, name: item.name },
        item.content
      );
    })
  });
  expect(tabs.find('.el-tabs .el-tabs__item').length).toBe(2);
});

test('Customized trigger button of new tab', function () {
  var state = {
    tabs: [{
      title: 'Tab 1',
      name: 'Tab 1',
      content: 'Tab 1 content'
    }, {
      title: 'Tab 2',
      name: 'Tab 2',
      content: 'Tab 2 content'
    }],
    tabIndex: 2
  };

  var addTab = function addTab() {
    var tabs = state.tabs,
        tabIndex = state.tabIndex;

    var index = tabIndex + 1;

    tabs.push({
      title: 'new Tab',
      name: 'Tab ' + index,
      content: 'new Tab content'
    });
    state.tabs = tabs;
    state.tabIndex = index;
  };

  var removeTab = function removeTab(tab) {
    var tabs = state.tabs;


    tabs.splice(tab.key.replace(/^\.\$/, ''), 1);
    state.tabs = tabs;
  };

  var button = mount(React.createElement(
    Button,
    { size: 'small', onClick: function onClick() {
        return addTab();
      } },
    'add tab'
  ));

  var tabs = mount(React.createElement(
    Tabs,
    { type: 'card', value: 'Tab 2', onTabRemove: function onTabRemove(tab) {
        return removeTab(tab);
      } },
    state.tabs.map(function (item, index) {
      return React.createElement(
        Tabs.Pane,
        { key: index, closable: true, label: item.title, name: item.name },
        item.content
      );
    })
  ));

  button.simulate('click');
  tabs.setProps({
    children: state.tabs.map(function (item, index) {
      return React.createElement(
        Tabs.Pane,
        { key: index, closable: true, label: item.title, name: item.name },
        item.content
      );
    })
  });
  expect(tabs.find('.el-tabs .el-tabs__item').length).toBe(3);

  tabs.find('.el-tabs .el-tabs__item').at(1).find('.el-icon-close').simulate('click');
  tabs.setProps({
    children: state.tabs.map(function (item, index) {
      return React.createElement(
        Tabs.Pane,
        { key: index, closable: true, label: item.title, name: item.name },
        item.content
      );
    })
  });
  expect(tabs.find('.el-tabs .el-tabs__item').length).toBe(2);
});