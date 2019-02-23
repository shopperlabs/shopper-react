'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _ = require('../');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Button test', function () {
  it('create', function () {
    var w = (0, _enzyme.shallow)(_react2.default.createElement(
      _2.default,
      { type: 'primary' },
      'TEST'
    ));
    expect(w.hasClass('el-button--primary')).toBeTruthy();
    expect(w.childAt(0).text()).toBe('TEST');
  });
  it('icon', function () {
    var w = (0, _enzyme.shallow)(_react2.default.createElement(
      _2.default,
      { icon: 'search' },
      'TEST'
    ));
    expect(w.childAt(0).hasClass('el-icon-search')).toBeTruthy();
  });
  it('nativeType', function () {
    var w = (0, _enzyme.shallow)(_react2.default.createElement(
      _2.default,
      { nativeType: 'submit' },
      'TEST'
    ));
    expect(w.prop('type')).toBe('submit');
  });
  it('loading', function () {
    var w = (0, _enzyme.shallow)(_react2.default.createElement(
      _2.default,
      { loading: true },
      'TEST'
    ));
    expect(w.hasClass('is-loading')).toBeTruthy();
    expect(w.childAt(0).hasClass('el-icon-loading')).toBeTruthy();
  });
  it('disabled', function () {
    var w = (0, _enzyme.shallow)(_react2.default.createElement(
      _2.default,
      { disabled: true },
      'TEST'
    ));
    expect(w.hasClass('is-disabled')).toBeTruthy();
  });
  it('size', function () {
    var w = (0, _enzyme.shallow)(_react2.default.createElement(
      _2.default,
      { size: 'large' },
      'TEST'
    ));
    expect(w.hasClass('el-button--large')).toBeTruthy();
  });
  it('plain', function () {
    var w = (0, _enzyme.shallow)(_react2.default.createElement(
      _2.default,
      { plain: true },
      'TEST'
    ));
    expect(w.hasClass('is-plain')).toBeTruthy();
  });
  it('click', function () {
    var fn = _sinon2.default.spy();
    var w = (0, _enzyme.shallow)(_react2.default.createElement(
      _2.default,
      { onClick: fn },
      'TEST'
    ));
    w.simulate('click');
    expect(fn.callCount).toBe(1);
  });
});
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }
}();

;