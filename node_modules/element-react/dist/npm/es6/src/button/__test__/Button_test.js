import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';

import Button from '../';

describe('Button test', function () {
  it('create', function () {
    var w = shallow(React.createElement(
      Button,
      { type: 'primary' },
      'TEST'
    ));
    expect(w.hasClass('el-button--primary')).toBeTruthy();
    expect(w.childAt(0).text()).toBe('TEST');
  });
  it('icon', function () {
    var w = shallow(React.createElement(
      Button,
      { icon: 'search' },
      'TEST'
    ));
    expect(w.childAt(0).hasClass('el-icon-search')).toBeTruthy();
  });
  it('nativeType', function () {
    var w = shallow(React.createElement(
      Button,
      { nativeType: 'submit' },
      'TEST'
    ));
    expect(w.prop('type')).toBe('submit');
  });
  it('loading', function () {
    var w = shallow(React.createElement(
      Button,
      { loading: true },
      'TEST'
    ));
    expect(w.hasClass('is-loading')).toBeTruthy();
    expect(w.childAt(0).hasClass('el-icon-loading')).toBeTruthy();
  });
  it('disabled', function () {
    var w = shallow(React.createElement(
      Button,
      { disabled: true },
      'TEST'
    ));
    expect(w.hasClass('is-disabled')).toBeTruthy();
  });
  it('size', function () {
    var w = shallow(React.createElement(
      Button,
      { size: 'large' },
      'TEST'
    ));
    expect(w.hasClass('el-button--large')).toBeTruthy();
  });
  it('plain', function () {
    var w = shallow(React.createElement(
      Button,
      { plain: true },
      'TEST'
    ));
    expect(w.hasClass('is-plain')).toBeTruthy();
  });
  it('click', function () {
    var fn = sinon.spy();
    var w = shallow(React.createElement(
      Button,
      { onClick: fn },
      'TEST'
    ));
    w.simulate('click');
    expect(fn.callCount).toBe(1);
  });
});