'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _ = require('../');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const delay = timeout => new Promise(resolve => setTimeout(resolve, timeout));

describe('Input test', function () {
  it('create', function () {
    var w = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { placeholder: '\u8BF7\u8F93\u5165\u5185\u5BB9' }));
    // to be tested: focus/placeholder/minlength/maxlength
    expect(w.hasClass('el-input')).toBeTruthy();
  });

  it('disabled', function () {
    var w = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { disabled: true }));
    expect(w.find('.el-input input').prop('disabled')).toBe(true);
  });

  it('icon', function () {
    var cb = _sinon2.default.spy();
    var w = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, {
      icon: 'time',
      placeholder: '\u8BF7\u9009\u62E9\u65E5\u671F',
      onIconClick: cb
    }));
    expect(w.find('.el-icon-time').exists()).toBeTruthy();

    w.find('.el-icon-time').simulate('click');
    expect(cb.callCount).toBe(1);
  });

  it('size', function () {
    var w = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { size: 'large' }));
    expect(w.hasClass('el-input--large')).toBeTruthy();
  });

  it('type', function () {
    var w = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { type: 'textarea' }));
    expect(w.hasClass('el-textarea')).toBeTruthy();
  });

  it('rows', function () {
    var w = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { type: 'textarea', rows: 3 }));
    expect(w.find('.el-textarea__inner').prop('rows')).toBe(3);
  });

  it('resize', function () {
    var w = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { type: 'textarea', resize: 'both' }));
    expect(w.find('.el-textarea__inner').first().prop('style').resize).toBe('both');
  });
});
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }
}();

;