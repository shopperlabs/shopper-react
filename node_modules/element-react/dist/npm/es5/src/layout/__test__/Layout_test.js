'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _ = require('../');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Layout test', function () {
  it('Basic layout', function () {
    var w1 = (0, _enzyme.mount)(_react2.default.createElement(
      _2.default.Row,
      null,
      _react2.default.createElement(
        _2.default.Col,
        { span: '24' },
        _react2.default.createElement('div', { className: 'grid-content bg-purple-dark' })
      )
    ));
    var w2 = (0, _enzyme.mount)(_react2.default.createElement(
      _2.default.Row,
      null,
      _react2.default.createElement(
        _2.default.Col,
        { span: '12' },
        _react2.default.createElement('div', { className: 'grid-content bg-purple' })
      ),
      _react2.default.createElement(
        _2.default.Col,
        { span: '12' },
        _react2.default.createElement('div', { className: 'grid-content bg-purple-light' })
      )
    ));
    var w3 = (0, _enzyme.mount)(_react2.default.createElement(
      _2.default.Row,
      null,
      _react2.default.createElement(
        _2.default.Col,
        { span: '8' },
        _react2.default.createElement('div', { className: 'grid-content bg-purple' })
      ),
      _react2.default.createElement(
        _2.default.Col,
        { span: '8' },
        _react2.default.createElement('div', { className: 'grid-content bg-purple-light' })
      ),
      _react2.default.createElement(
        _2.default.Col,
        { span: '8' },
        _react2.default.createElement('div', { className: 'grid-content bg-purple' })
      )
    ));
    var w4 = (0, _enzyme.mount)(_react2.default.createElement(
      _2.default.Row,
      null,
      _react2.default.createElement(
        _2.default.Col,
        { span: '6' },
        _react2.default.createElement('div', { className: 'grid-content bg-purple' })
      ),
      _react2.default.createElement(
        _2.default.Col,
        { span: '6' },
        _react2.default.createElement('div', { className: 'grid-content bg-purple-light' })
      ),
      _react2.default.createElement(
        _2.default.Col,
        { span: '6' },
        _react2.default.createElement('div', { className: 'grid-content bg-purple' })
      ),
      _react2.default.createElement(
        _2.default.Col,
        { span: '6' },
        _react2.default.createElement('div', { className: 'grid-content bg-purple-light' })
      )
    ));
    var w5 = (0, _enzyme.mount)(_react2.default.createElement(
      _2.default.Row,
      null,
      _react2.default.createElement(
        _2.default.Col,
        { span: '4' },
        _react2.default.createElement('div', { className: 'grid-content bg-purple' })
      ),
      _react2.default.createElement(
        _2.default.Col,
        { span: '4' },
        _react2.default.createElement('div', { className: 'grid-content bg-purple-light' })
      ),
      _react2.default.createElement(
        _2.default.Col,
        { span: '4' },
        _react2.default.createElement('div', { className: 'grid-content bg-purple' })
      ),
      _react2.default.createElement(
        _2.default.Col,
        { span: '4' },
        _react2.default.createElement('div', { className: 'grid-content bg-purple-light' })
      ),
      _react2.default.createElement(
        _2.default.Col,
        { span: '4' },
        _react2.default.createElement('div', { className: 'grid-content bg-purple' })
      ),
      _react2.default.createElement(
        _2.default.Col,
        { span: '4' },
        _react2.default.createElement('div', { className: 'grid-content bg-purple-light' })
      )
    ));
    var w6 = (0, _enzyme.mount)(_react2.default.createElement(
      _2.default.Row,
      null,
      _react2.default.createElement(
        _2.default.Col,
        { span: '0' },
        _react2.default.createElement('div', { className: 'grid-content bg-purple' })
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
    var w = (0, _enzyme.mount)(_react2.default.createElement(
      _2.default.Row,
      { gutter: '20' },
      _react2.default.createElement(
        _2.default.Col,
        { span: '6' },
        _react2.default.createElement('div', { className: 'grid-content bg-purple' })
      ),
      _react2.default.createElement(
        _2.default.Col,
        { span: '6' },
        _react2.default.createElement('div', { className: 'grid-content bg-purple' })
      ),
      _react2.default.createElement(
        _2.default.Col,
        { span: '6' },
        _react2.default.createElement('div', { className: 'grid-content bg-purple' })
      ),
      _react2.default.createElement(
        _2.default.Col,
        { span: '6' },
        _react2.default.createElement('div', { className: 'grid-content bg-purple' })
      )
    ));
    expect(w.find('.el-row .el-col-6').length).toBe(4);
    expect(w.find('.el-row .el-col-6').at(0).prop('style').paddingLeft).toBe('10px');
    expect(w.find('.el-row .el-col-6').at(0).prop('style').paddingRight).toBe('10px');
  });

  it('Hybrid layout', function () {
    var w1 = (0, _enzyme.mount)(_react2.default.createElement(
      _2.default.Row,
      { gutter: '20' },
      _react2.default.createElement(
        _2.default.Col,
        { span: '16' },
        _react2.default.createElement('div', { className: 'grid-content bg-purple' })
      ),
      _react2.default.createElement(
        _2.default.Col,
        { span: '8' },
        _react2.default.createElement('div', { className: 'grid-content bg-purple' })
      )
    ));
    var w2 = (0, _enzyme.mount)(_react2.default.createElement(
      _2.default.Row,
      { gutter: '20' },
      _react2.default.createElement(
        _2.default.Col,
        { span: '8' },
        _react2.default.createElement('div', { className: 'grid-content bg-purple' })
      ),
      _react2.default.createElement(
        _2.default.Col,
        { span: '8' },
        _react2.default.createElement('div', { className: 'grid-content bg-purple' })
      ),
      _react2.default.createElement(
        _2.default.Col,
        { span: '4' },
        _react2.default.createElement('div', { className: 'grid-content bg-purple' })
      ),
      _react2.default.createElement(
        _2.default.Col,
        { span: '4' },
        _react2.default.createElement('div', { className: 'grid-content bg-purple' })
      )
    ));
    var w3 = (0, _enzyme.mount)(_react2.default.createElement(
      _2.default.Row,
      { gutter: '20' },
      _react2.default.createElement(
        _2.default.Col,
        { span: '4' },
        _react2.default.createElement('div', { className: 'grid-content bg-purple' })
      ),
      _react2.default.createElement(
        _2.default.Col,
        { span: '16' },
        _react2.default.createElement('div', { className: 'grid-content bg-purple' })
      ),
      _react2.default.createElement(
        _2.default.Col,
        { span: '4' },
        _react2.default.createElement('div', { className: 'grid-content bg-purple' })
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
    var w1 = (0, _enzyme.mount)(_react2.default.createElement(
      _2.default.Row,
      { gutter: '20' },
      _react2.default.createElement(
        _2.default.Col,
        { span: '6' },
        _react2.default.createElement('div', { className: 'grid-content bg-purple' })
      ),
      _react2.default.createElement(
        _2.default.Col,
        { span: '6', offset: '6' },
        _react2.default.createElement('div', { className: 'grid-content bg-purple' })
      )
    ));
    var w2 = (0, _enzyme.mount)(_react2.default.createElement(
      _2.default.Row,
      { gutter: '20' },
      _react2.default.createElement(
        _2.default.Col,
        { span: '6', offset: '6' },
        _react2.default.createElement('div', { className: 'grid-content bg-purple' })
      ),
      _react2.default.createElement(
        _2.default.Col,
        { span: '6', offset: '6' },
        _react2.default.createElement('div', { className: 'grid-content bg-purple' })
      )
    ));
    var w3 = (0, _enzyme.mount)(_react2.default.createElement(
      _2.default.Row,
      { gutter: '20' },
      _react2.default.createElement(
        _2.default.Col,
        { span: '12', offset: '6' },
        _react2.default.createElement('div', { className: 'grid-content bg-purple' })
      )
    ));
    expect(w1.find('.el-row .el-col-6').length).toBe(2);
    expect(w1.find('.el-row .el-col-6.el-col-offset-6').length).toBe(1);
    expect(w2.find('.el-row .el-col-6.el-col-offset-6').length).toBe(2);
    expect(w3.find('.el-row .el-col-12.el-col-offset-6').length).toBe(1);
  });

  it('Alignment', function () {
    var w1 = (0, _enzyme.render)(_react2.default.createElement(
      _2.default.Row,
      { type: 'flex', className: 'row-bg' },
      _react2.default.createElement(
        _2.default.Col,
        { span: '6' },
        _react2.default.createElement('div', { className: 'grid-content bg-purple' })
      ),
      _react2.default.createElement(
        _2.default.Col,
        { span: '6' },
        _react2.default.createElement('div', { className: 'grid-content bg-purple-light' })
      ),
      _react2.default.createElement(
        _2.default.Col,
        { span: '6' },
        _react2.default.createElement('div', { className: 'grid-content bg-purple' })
      )
    ));
    var w2 = (0, _enzyme.render)(_react2.default.createElement(
      _2.default.Row,
      { type: 'flex', className: 'row-bg', justify: 'center' },
      _react2.default.createElement(
        _2.default.Col,
        { span: '6' },
        _react2.default.createElement('div', { className: 'grid-content bg-purple' })
      ),
      _react2.default.createElement(
        _2.default.Col,
        { span: '6' },
        _react2.default.createElement('div', { className: 'grid-content bg-purple-light' })
      ),
      _react2.default.createElement(
        _2.default.Col,
        { span: '6' },
        _react2.default.createElement('div', { className: 'grid-content bg-purple' })
      )
    ));
    var w3 = (0, _enzyme.render)(_react2.default.createElement(
      _2.default.Row,
      { type: 'flex', className: 'row-bg', justify: 'end' },
      _react2.default.createElement(
        _2.default.Col,
        { span: '6' },
        _react2.default.createElement('div', { className: 'grid-content bg-purple' })
      ),
      _react2.default.createElement(
        _2.default.Col,
        { span: '6' },
        _react2.default.createElement('div', { className: 'grid-content bg-purple-light' })
      ),
      _react2.default.createElement(
        _2.default.Col,
        { span: '6' },
        _react2.default.createElement('div', { className: 'grid-content bg-purple' })
      )
    ));
    var w4 = (0, _enzyme.render)(_react2.default.createElement(
      _2.default.Row,
      { type: 'flex', className: 'row-bg', justify: 'space-between' },
      _react2.default.createElement(
        _2.default.Col,
        { span: '6' },
        _react2.default.createElement('div', { className: 'grid-content bg-purple' })
      ),
      _react2.default.createElement(
        _2.default.Col,
        { span: '6' },
        _react2.default.createElement('div', { className: 'grid-content bg-purple-light' })
      ),
      _react2.default.createElement(
        _2.default.Col,
        { span: '6' },
        _react2.default.createElement('div', { className: 'grid-content bg-purple' })
      )
    ));
    var w5 = (0, _enzyme.render)(_react2.default.createElement(
      _2.default.Row,
      { type: 'flex', className: 'row-bg', justify: 'space-around' },
      _react2.default.createElement(
        _2.default.Col,
        { span: '6' },
        _react2.default.createElement('div', { className: 'grid-content bg-purple' })
      ),
      _react2.default.createElement(
        _2.default.Col,
        { span: '6' },
        _react2.default.createElement('div', { className: 'grid-content bg-purple-light' })
      ),
      _react2.default.createElement(
        _2.default.Col,
        { span: 6 },
        _react2.default.createElement('div', { className: 'grid-content bg-purple' })
      )
    ));
    expect(w1.hasClass('el-row--flex')).toBeTruthy();
    expect(w2.hasClass('is-justify-center')).toBeTruthy();
    expect(w3.hasClass('is-justify-end')).toBeTruthy();
    expect(w4.hasClass('is-justify-space-between')).toBeTruthy();
    expect(w5.hasClass('is-justify-space-around')).toBeTruthy();
  });

  it('Responsive Layout', function () {
    var w = (0, _enzyme.mount)(_react2.default.createElement(
      _2.default.Row,
      { gutter: '10' },
      _react2.default.createElement(
        _2.default.Col,
        { xs: '8', sm: '6', md: '4', lg: '3' },
        _react2.default.createElement('div', { className: 'grid-content bg-purple' })
      ),
      _react2.default.createElement(
        _2.default.Col,
        { xs: '4', sm: '6', md: '8', lg: '9' },
        _react2.default.createElement('div', { className: 'grid-content bg-purple-light' })
      ),
      _react2.default.createElement(
        _2.default.Col,
        { xs: '4', sm: '6', md: '8', lg: '9' },
        _react2.default.createElement('div', { className: 'grid-content bg-purple' })
      ),
      _react2.default.createElement(
        _2.default.Col,
        { xs: '8', sm: '6', md: '4', lg: '3' },
        _react2.default.createElement('div', { className: 'grid-content bg-purple-light' })
      )
    ));
    var w1 = (0, _enzyme.mount)(_react2.default.createElement(
      _2.default.Row,
      { gutter: '10' },
      _react2.default.createElement(
        _2.default.Col,
        { xs: '0', sm: '6', md: '4', lg: '3' },
        _react2.default.createElement('div', { className: 'grid-content bg-purple' })
      )
    ));
    expect(w.find('.el-col-24.el-col-xs-8.el-col-sm-6.el-col-md-4.el-col-lg-3').length).toBe(2);
    expect(w.find('.el-col-24.el-col-xs-4.el-col-sm-6.el-col-md-8.el-col-lg-9').length).toBe(2);
    expect(w1.find('.el-col-24.el-col-xs-0.el-col-sm-6.el-col-md-4.el-col-lg-3').length).toBe(1);
  });

  it('Row custom tag', function () {
    var w = (0, _enzyme.mount)(_react2.default.createElement(
      _2.default.Row,
      { tag: 'section' },
      _react2.default.createElement(
        _2.default.Col,
        { span: '24' },
        _react2.default.createElement('div', { className: 'grid-content bg-purple-dark' })
      )
    ));
    expect(w.find('section').length).toBe(1);
  });

  it('Column custom tag', function () {
    var w = (0, _enzyme.mount)(_react2.default.createElement(
      _2.default.Row,
      null,
      _react2.default.createElement(
        _2.default.Col,
        { tag: 'section', span: '24' },
        _react2.default.createElement('div', { className: 'grid-content bg-purple-dark' })
      )
    ));
    expect(w.find('.el-row section.el-col-24').length).toBe(1);
  });

  it('Row with align', function () {
    var w1 = (0, _enzyme.render)(_react2.default.createElement(
      _2.default.Row,
      { type: 'flex', align: 'middle', className: 'row-bg' },
      _react2.default.createElement(
        _2.default.Col,
        { span: '6' },
        _react2.default.createElement('div', { className: 'grid-content bg-purple' })
      ),
      _react2.default.createElement(
        _2.default.Col,
        { span: '6' },
        _react2.default.createElement('div', { className: 'grid-content bg-purple-light' })
      ),
      _react2.default.createElement(
        _2.default.Col,
        { span: '6' },
        _react2.default.createElement('div', { className: 'grid-content bg-purple' })
      )
    ));
    var w2 = (0, _enzyme.render)(_react2.default.createElement(
      _2.default.Row,
      { type: 'flex', align: 'bottom', className: 'row-bg' },
      _react2.default.createElement(
        _2.default.Col,
        { span: '6' },
        _react2.default.createElement('div', { className: 'grid-content bg-purple' })
      ),
      _react2.default.createElement(
        _2.default.Col,
        { span: '6' },
        _react2.default.createElement('div', { className: 'grid-content bg-purple-light' })
      ),
      _react2.default.createElement(
        _2.default.Col,
        { span: '6' },
        _react2.default.createElement('div', { className: 'grid-content bg-purple' })
      )
    ));
    expect(w1.hasClass('is-align-middle')).toBeTruthy();
    expect(w2.hasClass('is-align-bottom')).toBeTruthy();
  });

  it('Column with push', function () {
    var w = (0, _enzyme.mount)(_react2.default.createElement(
      _2.default.Row,
      { gutter: '20' },
      _react2.default.createElement(
        _2.default.Col,
        { span: '12', push: '12' },
        _react2.default.createElement('div', { className: 'grid-content bg-purple' })
      )
    ));
    expect(w.find('.el-col-12').hasClass('el-col-push-12')).toBeTruthy();
  });

  it('Column with pull', function () {
    var w = (0, _enzyme.mount)(_react2.default.createElement(
      _2.default.Row,
      { gutter: '20' },
      _react2.default.createElement(
        _2.default.Col,
        { span: '12', pull: 12 },
        _react2.default.createElement('div', { className: 'grid-content bg-purple' })
      )
    ));
    expect(w.find('.el-col-12').hasClass('el-col-pull-12')).toBeTruthy();
  });
});
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }
}();

;