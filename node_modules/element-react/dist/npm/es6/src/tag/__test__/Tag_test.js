import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';

import Tag from '../';

describe('Tag test', function () {
  it('type', function () {
    var w = mount(React.createElement(
      Tag,
      { type: 'primary' },
      'TEST'
    ));
    expect(w.find('.el-tag--primary')).toHaveLength(1);
    expect(w.find('.el-tag--primary').text()).toBe('TEST');
  });

  it('closable', function () {
    var w = shallow(React.createElement(
      Tag,
      { type: 'primary', closable: true },
      'TEST'
    ));
    expect(w.find('i.el-tag__close').exists()).toBe(true);
  });

  // it('closeTransition', () => {
  //   const w = shallow(
  //     <Tag closable={true} closeTransition={false}>TEST</Tag>
  //   );
  //   expect(w.find('[name="el-zoom-in-center"]').exists()).toBe(true);
  // });

  it('hit', function () {
    var w = mount(React.createElement(
      Tag,
      { hit: true },
      'TEST'
    ));
    expect(w.find('.el-tag').first().hasClass('is-hit')).toBeTruthy();
  });

  it('onClose', function () {
    var onClose = sinon.spy();
    var w = shallow(React.createElement(
      Tag,
      { type: 'primary', closable: true, onClose: onClose },
      'TEST'
    ));

    w.find('i.el-tag__close').simulate('click');

    expect(onClose.calledOnce).toBe(true);
  });
});