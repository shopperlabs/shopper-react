import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';

import Card from '../';

describe('Card test', function () {
  it('render header', function () {
    var w = shallow(React.createElement(Card, { header: 'HEADER' }));
    expect(w.find('.el-card__header').at(0).text()).toBe('HEADER');
  });

  it('render body', function () {
    var w = shallow(React.createElement(
      Card,
      null,
      'BODY'
    ));
    expect(w.find('.el-card__body').at(0).text()).toBe('BODY');
  });

  it('use bodyStyle', function () {
    var bodyStyle = {
      padding: '5px',
      border: '1px solid blue'
    };
    var w = shallow(React.createElement(Card, { bodyStyle: bodyStyle }));
    expect(w.find('.el-card__body').at(0).prop('style')).toEqual(bodyStyle);
  });
});