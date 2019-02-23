import React from 'react';
import { shallow, mount } from 'enzyme';

import Breadcrumb from '../';

describe('Breadcrumb test', function () {
  it('basic usage', function () {
    var w = shallow(React.createElement(
      Breadcrumb,
      null,
      React.createElement(
        Breadcrumb.Item,
        null,
        '\u9996\u9875'
      ),
      React.createElement(
        Breadcrumb.Item,
        null,
        '\u6D3B\u52A8\u7BA1\u7406'
      )
    ));
    expect(w.is('.el-breadcrumb')).toBe(true);
  });

  it('test children', function () {
    var w = mount(React.createElement(
      Breadcrumb,
      { separator: '' },
      React.createElement(
        Breadcrumb.Item,
        null,
        '\u9996\u9875'
      ),
      React.createElement(
        Breadcrumb.Item,
        null,
        '\u6D3B\u52A8\u7BA1\u7406'
      ),
      React.createElement(
        Breadcrumb.Item,
        null,
        '\u6D3B\u52A8\u5217\u8868'
      ),
      React.createElement(
        Breadcrumb.Item,
        null,
        '\u6D3B\u52A8\u8BE6\u60C5'
      )
    ));
    expect(w.find('.el-breadcrumb__item').length).toBe(4);
  });

  it('test separator', function () {
    var w = mount(React.createElement(
      Breadcrumb,
      { separator: '/' },
      React.createElement(
        Breadcrumb.Item,
        null,
        '\u9996\u9875'
      ),
      React.createElement(
        Breadcrumb.Item,
        null,
        '\u6D3B\u52A8\u7BA1\u7406'
      ),
      React.createElement(
        Breadcrumb.Item,
        null,
        '\u6D3B\u52A8\u5217\u8868'
      ),
      React.createElement(
        Breadcrumb.Item,
        null,
        '\u6D3B\u52A8\u8BE6\u60C5'
      )
    ));
    expect(w.find('.el-breadcrumb__separator').at(0).text()).toBe('/');
  });
});