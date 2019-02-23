import React from 'react';
import { mount, render } from 'enzyme';

import Layout from '../';

describe('Layout test', function () {
  it('Basic layout', function () {
    var w1 = mount(React.createElement(
      Layout.Row,
      null,
      React.createElement(
        Layout.Col,
        { span: '24' },
        React.createElement('div', { className: 'grid-content bg-purple-dark' })
      )
    ));
    var w2 = mount(React.createElement(
      Layout.Row,
      null,
      React.createElement(
        Layout.Col,
        { span: '12' },
        React.createElement('div', { className: 'grid-content bg-purple' })
      ),
      React.createElement(
        Layout.Col,
        { span: '12' },
        React.createElement('div', { className: 'grid-content bg-purple-light' })
      )
    ));
    var w3 = mount(React.createElement(
      Layout.Row,
      null,
      React.createElement(
        Layout.Col,
        { span: '8' },
        React.createElement('div', { className: 'grid-content bg-purple' })
      ),
      React.createElement(
        Layout.Col,
        { span: '8' },
        React.createElement('div', { className: 'grid-content bg-purple-light' })
      ),
      React.createElement(
        Layout.Col,
        { span: '8' },
        React.createElement('div', { className: 'grid-content bg-purple' })
      )
    ));
    var w4 = mount(React.createElement(
      Layout.Row,
      null,
      React.createElement(
        Layout.Col,
        { span: '6' },
        React.createElement('div', { className: 'grid-content bg-purple' })
      ),
      React.createElement(
        Layout.Col,
        { span: '6' },
        React.createElement('div', { className: 'grid-content bg-purple-light' })
      ),
      React.createElement(
        Layout.Col,
        { span: '6' },
        React.createElement('div', { className: 'grid-content bg-purple' })
      ),
      React.createElement(
        Layout.Col,
        { span: '6' },
        React.createElement('div', { className: 'grid-content bg-purple-light' })
      )
    ));
    var w5 = mount(React.createElement(
      Layout.Row,
      null,
      React.createElement(
        Layout.Col,
        { span: '4' },
        React.createElement('div', { className: 'grid-content bg-purple' })
      ),
      React.createElement(
        Layout.Col,
        { span: '4' },
        React.createElement('div', { className: 'grid-content bg-purple-light' })
      ),
      React.createElement(
        Layout.Col,
        { span: '4' },
        React.createElement('div', { className: 'grid-content bg-purple' })
      ),
      React.createElement(
        Layout.Col,
        { span: '4' },
        React.createElement('div', { className: 'grid-content bg-purple-light' })
      ),
      React.createElement(
        Layout.Col,
        { span: '4' },
        React.createElement('div', { className: 'grid-content bg-purple' })
      ),
      React.createElement(
        Layout.Col,
        { span: '4' },
        React.createElement('div', { className: 'grid-content bg-purple-light' })
      )
    ));
    var w6 = mount(React.createElement(
      Layout.Row,
      null,
      React.createElement(
        Layout.Col,
        { span: '0' },
        React.createElement('div', { className: 'grid-content bg-purple' })
      )
    ));
    expect(w1.find('.el-row .el-col-24 .grid-content').exists()).toBeTruthy();
    expect(w1.find('.el-row .el-col-24').length).toBe(1);
    expect(w2.find('.el-row .el-col-12').length).toBe(2);
    expect(w3.find('.el-row .el-col-8').length).toBe(3);
    expect(w4.find('.el-row .el-col-6').length).toBe(4);
    expect(w5.find('.el-row .el-col-4').length).toBe(6);
    expect(w6.find('.el-row .el-col-0').length).toBe(1);
  });

  it('Column spacing', function () {
    var w = mount(React.createElement(
      Layout.Row,
      { gutter: '20' },
      React.createElement(
        Layout.Col,
        { span: '6' },
        React.createElement('div', { className: 'grid-content bg-purple' })
      ),
      React.createElement(
        Layout.Col,
        { span: '6' },
        React.createElement('div', { className: 'grid-content bg-purple' })
      ),
      React.createElement(
        Layout.Col,
        { span: '6' },
        React.createElement('div', { className: 'grid-content bg-purple' })
      ),
      React.createElement(
        Layout.Col,
        { span: '6' },
        React.createElement('div', { className: 'grid-content bg-purple' })
      )
    ));
    expect(w.find('.el-row .el-col-6').length).toBe(4);
    expect(w.find('.el-row .el-col-6').at(0).prop('style').paddingLeft).toBe('10px');
    expect(w.find('.el-row .el-col-6').at(0).prop('style').paddingRight).toBe('10px');
  });

  it('Hybrid layout', function () {
    var w1 = mount(React.createElement(
      Layout.Row,
      { gutter: '20' },
      React.createElement(
        Layout.Col,
        { span: '16' },
        React.createElement('div', { className: 'grid-content bg-purple' })
      ),
      React.createElement(
        Layout.Col,
        { span: '8' },
        React.createElement('div', { className: 'grid-content bg-purple' })
      )
    ));
    var w2 = mount(React.createElement(
      Layout.Row,
      { gutter: '20' },
      React.createElement(
        Layout.Col,
        { span: '8' },
        React.createElement('div', { className: 'grid-content bg-purple' })
      ),
      React.createElement(
        Layout.Col,
        { span: '8' },
        React.createElement('div', { className: 'grid-content bg-purple' })
      ),
      React.createElement(
        Layout.Col,
        { span: '4' },
        React.createElement('div', { className: 'grid-content bg-purple' })
      ),
      React.createElement(
        Layout.Col,
        { span: '4' },
        React.createElement('div', { className: 'grid-content bg-purple' })
      )
    ));
    var w3 = mount(React.createElement(
      Layout.Row,
      { gutter: '20' },
      React.createElement(
        Layout.Col,
        { span: '4' },
        React.createElement('div', { className: 'grid-content bg-purple' })
      ),
      React.createElement(
        Layout.Col,
        { span: '16' },
        React.createElement('div', { className: 'grid-content bg-purple' })
      ),
      React.createElement(
        Layout.Col,
        { span: '4' },
        React.createElement('div', { className: 'grid-content bg-purple' })
      )
    ));
    expect(w1.find('.el-row .el-col-16').length).toBe(1);
    expect(w1.find('.el-row .el-col-8').length).toBe(1);

    expect(w2.find('.el-row .el-col-8').length).toBe(2);
    expect(w2.find('.el-row .el-col-4').length).toBe(2);

    expect(w3.find('.el-row .el-col-16').length).toBe(1);
    expect(w3.find('.el-row .el-col-4').length).toBe(2);
  });

  it('Column offset', function () {
    var w1 = mount(React.createElement(
      Layout.Row,
      { gutter: '20' },
      React.createElement(
        Layout.Col,
        { span: '6' },
        React.createElement('div', { className: 'grid-content bg-purple' })
      ),
      React.createElement(
        Layout.Col,
        { span: '6', offset: '6' },
        React.createElement('div', { className: 'grid-content bg-purple' })
      )
    ));
    var w2 = mount(React.createElement(
      Layout.Row,
      { gutter: '20' },
      React.createElement(
        Layout.Col,
        { span: '6', offset: '6' },
        React.createElement('div', { className: 'grid-content bg-purple' })
      ),
      React.createElement(
        Layout.Col,
        { span: '6', offset: '6' },
        React.createElement('div', { className: 'grid-content bg-purple' })
      )
    ));
    var w3 = mount(React.createElement(
      Layout.Row,
      { gutter: '20' },
      React.createElement(
        Layout.Col,
        { span: '12', offset: '6' },
        React.createElement('div', { className: 'grid-content bg-purple' })
      )
    ));
    expect(w1.find('.el-row .el-col-6').length).toBe(2);
    expect(w1.find('.el-row .el-col-6.el-col-offset-6').length).toBe(1);
    expect(w2.find('.el-row .el-col-6.el-col-offset-6').length).toBe(2);
    expect(w3.find('.el-row .el-col-12.el-col-offset-6').length).toBe(1);
  });

  it('Alignment', function () {
    var w1 = render(React.createElement(
      Layout.Row,
      { type: 'flex', className: 'row-bg' },
      React.createElement(
        Layout.Col,
        { span: '6' },
        React.createElement('div', { className: 'grid-content bg-purple' })
      ),
      React.createElement(
        Layout.Col,
        { span: '6' },
        React.createElement('div', { className: 'grid-content bg-purple-light' })
      ),
      React.createElement(
        Layout.Col,
        { span: '6' },
        React.createElement('div', { className: 'grid-content bg-purple' })
      )
    ));
    var w2 = render(React.createElement(
      Layout.Row,
      { type: 'flex', className: 'row-bg', justify: 'center' },
      React.createElement(
        Layout.Col,
        { span: '6' },
        React.createElement('div', { className: 'grid-content bg-purple' })
      ),
      React.createElement(
        Layout.Col,
        { span: '6' },
        React.createElement('div', { className: 'grid-content bg-purple-light' })
      ),
      React.createElement(
        Layout.Col,
        { span: '6' },
        React.createElement('div', { className: 'grid-content bg-purple' })
      )
    ));
    var w3 = render(React.createElement(
      Layout.Row,
      { type: 'flex', className: 'row-bg', justify: 'end' },
      React.createElement(
        Layout.Col,
        { span: '6' },
        React.createElement('div', { className: 'grid-content bg-purple' })
      ),
      React.createElement(
        Layout.Col,
        { span: '6' },
        React.createElement('div', { className: 'grid-content bg-purple-light' })
      ),
      React.createElement(
        Layout.Col,
        { span: '6' },
        React.createElement('div', { className: 'grid-content bg-purple' })
      )
    ));
    var w4 = render(React.createElement(
      Layout.Row,
      { type: 'flex', className: 'row-bg', justify: 'space-between' },
      React.createElement(
        Layout.Col,
        { span: '6' },
        React.createElement('div', { className: 'grid-content bg-purple' })
      ),
      React.createElement(
        Layout.Col,
        { span: '6' },
        React.createElement('div', { className: 'grid-content bg-purple-light' })
      ),
      React.createElement(
        Layout.Col,
        { span: '6' },
        React.createElement('div', { className: 'grid-content bg-purple' })
      )
    ));
    var w5 = render(React.createElement(
      Layout.Row,
      { type: 'flex', className: 'row-bg', justify: 'space-around' },
      React.createElement(
        Layout.Col,
        { span: '6' },
        React.createElement('div', { className: 'grid-content bg-purple' })
      ),
      React.createElement(
        Layout.Col,
        { span: '6' },
        React.createElement('div', { className: 'grid-content bg-purple-light' })
      ),
      React.createElement(
        Layout.Col,
        { span: 6 },
        React.createElement('div', { className: 'grid-content bg-purple' })
      )
    ));
    expect(w1.hasClass('el-row--flex')).toBeTruthy();
    expect(w2.hasClass('is-justify-center')).toBeTruthy();
    expect(w3.hasClass('is-justify-end')).toBeTruthy();
    expect(w4.hasClass('is-justify-space-between')).toBeTruthy();
    expect(w5.hasClass('is-justify-space-around')).toBeTruthy();
  });

  it('Responsive Layout', function () {
    var w = mount(React.createElement(
      Layout.Row,
      { gutter: '10' },
      React.createElement(
        Layout.Col,
        { xs: '8', sm: '6', md: '4', lg: '3' },
        React.createElement('div', { className: 'grid-content bg-purple' })
      ),
      React.createElement(
        Layout.Col,
        { xs: '4', sm: '6', md: '8', lg: '9' },
        React.createElement('div', { className: 'grid-content bg-purple-light' })
      ),
      React.createElement(
        Layout.Col,
        { xs: '4', sm: '6', md: '8', lg: '9' },
        React.createElement('div', { className: 'grid-content bg-purple' })
      ),
      React.createElement(
        Layout.Col,
        { xs: '8', sm: '6', md: '4', lg: '3' },
        React.createElement('div', { className: 'grid-content bg-purple-light' })
      )
    ));
    var w1 = mount(React.createElement(
      Layout.Row,
      { gutter: '10' },
      React.createElement(
        Layout.Col,
        { xs: '0', sm: '6', md: '4', lg: '3' },
        React.createElement('div', { className: 'grid-content bg-purple' })
      )
    ));
    expect(w.find('.el-col-24.el-col-xs-8.el-col-sm-6.el-col-md-4.el-col-lg-3').length).toBe(2);
    expect(w.find('.el-col-24.el-col-xs-4.el-col-sm-6.el-col-md-8.el-col-lg-9').length).toBe(2);
    expect(w1.find('.el-col-24.el-col-xs-0.el-col-sm-6.el-col-md-4.el-col-lg-3').length).toBe(1);
  });

  it('Row custom tag', function () {
    var w = mount(React.createElement(
      Layout.Row,
      { tag: 'section' },
      React.createElement(
        Layout.Col,
        { span: '24' },
        React.createElement('div', { className: 'grid-content bg-purple-dark' })
      )
    ));
    expect(w.find('section').length).toBe(1);
  });

  it('Column custom tag', function () {
    var w = mount(React.createElement(
      Layout.Row,
      null,
      React.createElement(
        Layout.Col,
        { tag: 'section', span: '24' },
        React.createElement('div', { className: 'grid-content bg-purple-dark' })
      )
    ));
    expect(w.find('.el-row section.el-col-24').length).toBe(1);
  });

  it('Row with align', function () {
    var w1 = render(React.createElement(
      Layout.Row,
      { type: 'flex', align: 'middle', className: 'row-bg' },
      React.createElement(
        Layout.Col,
        { span: '6' },
        React.createElement('div', { className: 'grid-content bg-purple' })
      ),
      React.createElement(
        Layout.Col,
        { span: '6' },
        React.createElement('div', { className: 'grid-content bg-purple-light' })
      ),
      React.createElement(
        Layout.Col,
        { span: '6' },
        React.createElement('div', { className: 'grid-content bg-purple' })
      )
    ));
    var w2 = render(React.createElement(
      Layout.Row,
      { type: 'flex', align: 'bottom', className: 'row-bg' },
      React.createElement(
        Layout.Col,
        { span: '6' },
        React.createElement('div', { className: 'grid-content bg-purple' })
      ),
      React.createElement(
        Layout.Col,
        { span: '6' },
        React.createElement('div', { className: 'grid-content bg-purple-light' })
      ),
      React.createElement(
        Layout.Col,
        { span: '6' },
        React.createElement('div', { className: 'grid-content bg-purple' })
      )
    ));
    expect(w1.hasClass('is-align-middle')).toBeTruthy();
    expect(w2.hasClass('is-align-bottom')).toBeTruthy();
  });

  it('Column with push', function () {
    var w = mount(React.createElement(
      Layout.Row,
      { gutter: '20' },
      React.createElement(
        Layout.Col,
        { span: '12', push: '12' },
        React.createElement('div', { className: 'grid-content bg-purple' })
      )
    ));
    expect(w.find('.el-col-12').hasClass('el-col-push-12')).toBeTruthy();
  });

  it('Column with pull', function () {
    var w = mount(React.createElement(
      Layout.Row,
      { gutter: '20' },
      React.createElement(
        Layout.Col,
        { span: '12', pull: 12 },
        React.createElement('div', { className: 'grid-content bg-purple' })
      )
    ));
    expect(w.find('.el-col-12').hasClass('el-col-pull-12')).toBeTruthy();
  });
});