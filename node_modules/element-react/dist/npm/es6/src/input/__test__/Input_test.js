import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import Input from '../';

// const delay = timeout => new Promise(resolve => setTimeout(resolve, timeout));

describe('Input test', function () {
  it('create', function () {
    var w = shallow(React.createElement(Input, { placeholder: '\u8BF7\u8F93\u5165\u5185\u5BB9' }));
    // to be tested: focus/placeholder/minlength/maxlength
    expect(w.hasClass('el-input')).toBeTruthy();
  });

  it('disabled', function () {
    var w = shallow(React.createElement(Input, { disabled: true }));
    expect(w.find('.el-input input').prop('disabled')).toBe(true);
  });

  it('icon', function () {
    var cb = sinon.spy();
    var w = shallow(React.createElement(Input, {
      icon: 'time',
      placeholder: '\u8BF7\u9009\u62E9\u65E5\u671F',
      onIconClick: cb
    }));
    expect(w.find('.el-icon-time').exists()).toBeTruthy();

    w.find('.el-icon-time').simulate('click');
    expect(cb.callCount).toBe(1);
  });

  it('size', function () {
    var w = shallow(React.createElement(Input, { size: 'large' }));
    expect(w.hasClass('el-input--large')).toBeTruthy();
  });

  it('type', function () {
    var w = shallow(React.createElement(Input, { type: 'textarea' }));
    expect(w.hasClass('el-textarea')).toBeTruthy();
  });

  it('rows', function () {
    var w = shallow(React.createElement(Input, { type: 'textarea', rows: 3 }));
    expect(w.find('.el-textarea__inner').prop('rows')).toBe(3);
  });

  it('resize', function () {
    var w = shallow(React.createElement(Input, { type: 'textarea', resize: 'both' }));
    expect(w.find('.el-textarea__inner').first().prop('style').resize).toBe('both');
  });
});