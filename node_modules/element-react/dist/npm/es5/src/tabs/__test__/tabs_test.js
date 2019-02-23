'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _src = require('../../../src');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test('Basic usage', function () {
  var state = {
    name: ''
  };

  var tabs = (0, _enzyme.mount)(_react2.default.createElement(
    _src.Tabs,
    { activeName: '2', onTabClick: function onTabClick(tab) {
        return state.name = tab.props.name;
      } },
    _react2.default.createElement(
      _src.Tabs.Pane,
      { label: '\u7528\u6237\u7BA1\u7406', name: '1' },
      '\u7528\u6237\u7BA1\u7406'
    ),
    _react2.default.createElement(
      _src.Tabs.Pane,
      { label: '\u914D\u7F6E\u7BA1\u7406', name: '2' },
      '\u914D\u7F6E\u7BA1\u7406'
    ),
    _react2.default.createElement(
      _src.Tabs.Pane,
      { label: '\u89D2\u8272\u7BA1\u7406', name: '3' },
      '\u89D2\u8272\u7BA1\u7406'
    ),
    _react2.default.createElement(
      _src.Tabs.Pane,
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
  var tabs = (0, _enzyme.mount)(_react2.default.createElement(
    _src.Tabs,
    { type: 'card', value: '1' },
    _react2.default.createElement(
      _src.Tabs.Pane,
      { label: '\u7528\u6237\u7BA1\u7406', name: '1' },
      '\u7528\u6237\u7BA1\u7406'
    ),
    _react2.default.createElement(
      _src.Tabs.Pane,
      { label: '\u914D\u7F6E\u7BA1\u7406', name: '2' },
      '\u914D\u7F6E\u7BA1\u7406'
    ),
    _react2.default.createElement(
      _src.Tabs.Pane,
      { label: '\u89D2\u8272\u7BA1\u7406', name: '3' },
      '\u89D2\u8272\u7BA1\u7406'
    ),
    _react2.default.createElement(
      _src.Tabs.Pane,
      { label: '\u5B9A\u65F6\u8865\u507F\u4EFB\u52A1', name: '4' },
      '\u5B9A\u65F6\u8865\u507F\u4EFB\u52A1'
    )
  ));

  expect(tabs.find('.el-tabs').hasClass('el-tabs--card')).toBeTruthy();
});

test('Border card', function () {
  var tabs = (0, _enzyme.mount)(_react2.default.createElement(
    _src.Tabs,
    { type: 'border-card', activeName: '1' },
    _react2.default.createElement(
      _src.Tabs.Pane,
      { label: '\u7528\u6237\u7BA1\u7406', name: '1' },
      '\u7528\u6237\u7BA1\u7406'
    ),
    _react2.default.createElement(
      _src.Tabs.Pane,
      { label: '\u914D\u7F6E\u7BA1\u7406', name: '2' },
      '\u914D\u7F6E\u7BA1\u7406'
    ),
    _react2.default.createElement(
      _src.Tabs.Pane,
      { label: '\u89D2\u8272\u7BA1\u7406', name: '3' },
      '\u89D2\u8272\u7BA1\u7406'
    ),
    _react2.default.createElement(
      _src.Tabs.Pane,
      { label: '\u5B9A\u65F6\u8865\u507F\u4EFB\u52A1', name: '4' },
      '\u5B9A\u65F6\u8865\u507F\u4EFB\u52A1'
    )
  ));

  expect(tabs.find('.el-tabs').hasClass('el-tabs--border-card')).toBeTruthy();
});

test('Custom Tab', function () {
  var label = _react2.default.createElement(
    'span',
    null,
    _react2.default.createElement(_src.Icon, { name: 'date' }),
    ' \u7528\u6237\u7BA1\u7406'
  );
  var tabs = (0, _enzyme.mount)(_react2.default.createElement(
    _src.Tabs,
    { type: 'border-card', activeName: '1' },
    _react2.default.createElement(
      _src.Tabs.Pane,
      { label: label, name: '1' },
      '\u7528\u6237\u7BA1\u7406'
    ),
    _react2.default.createElement(
      _src.Tabs.Pane,
      { label: '\u914D\u7F6E\u7BA1\u7406', name: '2' },
      '\u914D\u7F6E\u7BA1\u7406'
    ),
    _react2.default.createElement(
      _src.Tabs.Pane,
      { label: '\u89D2\u8272\u7BA1\u7406', name: '3' },
      '\u89D2\u8272\u7BA1\u7406'
    ),
    _react2.default.createElement(
      _src.Tabs.Pane,
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

  var tabs = (0, _enzyme.mount)(_react2.default.createElement(
    _src.Tabs,
    { type: 'card', value: 'Tab 2', editable: true, onTabEdit: function onTabEdit(action, tab) {
        return editTab(action, tab);
      } },
    state.tabs.map(function (item, index) {
      return _react2.default.createElement(
        _src.Tabs.Pane,
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
      return _react2.default.createElement(
        _src.Tabs.Pane,
        { key: index, closable: true, label: item.title, name: item.name },
        item.content
      );
    })
  });
  expect(tabs.find('.el-tabs .el-tabs__item').length).toBe(3);

  tabs.find('.el-tabs .el-tabs__item').at(1).find('.el-icon-close').simulate('click');
  tabs.setProps({
    children: state.tabs.map(function (item, index) {
      return _react2.default.createElement(
        _src.Tabs.Pane,
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

  var button = (0, _enzyme.mount)(_react2.default.createElement(
    _src.Button,
    { size: 'small', onClick: function onClick() {
        return addTab();
      } },
    'add tab'
  ));

  var tabs = (0, _enzyme.mount)(_react2.default.createElement(
    _src.Tabs,
    { type: 'card', value: 'Tab 2', onTabRemove: function onTabRemove(tab) {
        return removeTab(tab);
      } },
    state.tabs.map(function (item, index) {
      return _react2.default.createElement(
        _src.Tabs.Pane,
        { key: index, closable: true, label: item.title, name: item.name },
        item.content
      );
    })
  ));

  button.simulate('click');
  tabs.setProps({
    children: state.tabs.map(function (item, index) {
      return _react2.default.createElement(
        _src.Tabs.Pane,
        { key: index, closable: true, label: item.title, name: item.name },
        item.content
      );
    })
  });
  expect(tabs.find('.el-tabs .el-tabs__item').length).toBe(3);

  tabs.find('.el-tabs .el-tabs__item').at(1).find('.el-icon-close').simulate('click');
  tabs.setProps({
    children: state.tabs.map(function (item, index) {
      return _react2.default.createElement(
        _src.Tabs.Pane,
        { key: index, closable: true, label: item.title, name: item.name },
        item.content
      );
    })
  });
  expect(tabs.find('.el-tabs .el-tabs__item').length).toBe(2);
});
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }
}();

;