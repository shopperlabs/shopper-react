import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';

import Badge from '../';
import { Button, Dropdown } from '../../';

describe('Badge Test', function () {
  it('Basic usage', function () {
    var w = mount(React.createElement(
      Badge,
      { value: 12 },
      React.createElement(
        Button,
        { size: 'small' },
        'TEST'
      )
    ));
    expect(w.find('.el-badge .el-button span').text()).toBe('TEST');
    expect(w.find('.el-badge sup.el-badge__content').text()).toBe('12');
  });

  it('with Dropdown', function () {
    var w = mount(React.createElement(
      Dropdown,
      { trigger: 'click', menu: React.createElement(
          Dropdown.Menu,
          null,
          React.createElement(
            Dropdown.Item,
            { className: 'clearfix' },
            React.createElement(
              'span',
              null,
              '\u8BC4\u8BBA'
            ),
            React.createElement(Badge, { className: 'mark', value: 12 })
          ),
          React.createElement(
            Dropdown.Item,
            { className: 'clearfix' },
            React.createElement(
              'span',
              null,
              '\u56DE\u590D'
            ),
            React.createElement(Badge, { className: 'mark', value: 3 })
          )
        )
      },
      React.createElement(
        'span',
        { className: 'el-dropdown-link' },
        '\u70B9\u6211\u67E5\u770B',
        React.createElement('i', { className: 'el-icon-caret-bottom el-icon--right' })
      )
    ));
    expect(w.find('.el-dropdown-menu').childAt(0).find('div.el-badge').hasClass('mark')).toBeTruthy();
    expect(w.find('.el-dropdown-menu').childAt(1).find('div.el-badge').hasClass('mark')).toBeTruthy();
    expect(w.find('.el-dropdown-menu').childAt(0).find('sup.el-badge__content').text()).toBe('12');
    expect(w.find('.el-dropdown-menu').childAt(1).find('sup.el-badge__content').text()).toBe('3');
  });

  it('Max value', function () {
    var w1 = shallow(React.createElement(
      Badge,
      { value: 200, max: 99 },
      React.createElement(
        Button,
        { size: 'small' },
        'TEST'
      )
    ));
    var w2 = shallow(React.createElement(
      Badge,
      { value: 99, max: 99 },
      React.createElement(
        Button,
        { size: 'small' },
        'TEST'
      )
    ));
    var w3 = shallow(React.createElement(
      Badge,
      { value: 1, max: 99 },
      React.createElement(
        Button,
        { size: 'small' },
        'TEST'
      )
    ));
    expect(w1.find('.el-badge sup.el-badge__content').text()).toBe('99+');
    expect(w2.find('.el-badge sup.el-badge__content').text()).toBe('99');
    expect(w3.find('.el-badge sup.el-badge__content').text()).toBe('1');
  });

  it('Custom content', function () {
    var w1 = shallow(React.createElement(
      Badge,
      { value: 'new' },
      React.createElement(
        Button,
        { size: 'small' },
        'TEST'
      )
    ));
    var w2 = shallow(React.createElement(
      Badge,
      { value: 'hot' },
      React.createElement(
        Button,
        { size: 'small' },
        'TEST'
      )
    ));
    expect(w1.find('.el-badge sup.el-badge__content').text()).toBe('new');
    expect(w2.find('.el-badge sup.el-badge__content').text()).toBe('hot');
  });

  it('Dot', function () {
    var w1 = shallow(React.createElement(
      Badge,
      { isDot: true },
      React.createElement(Button, { className: 'share-button', icon: 'share', type: 'primary' })
    ));
    expect(w1.find('.el-badge sup.el-badge__content').hasClass('is-dot')).toBeTruthy();
  });
});