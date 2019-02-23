'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _ = require('../');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Breadcrumb test', function () {
  it('basic usage', function () {
    var w = (0, _enzyme.shallow)(_react2.default.createElement(
      _2.default,
      null,
      _react2.default.createElement(
        _2.default.Item,
        null,
        '\u9996\u9875'
      ),
      _react2.default.createElement(
        _2.default.Item,
        null,
        '\u6D3B\u52A8\u7BA1\u7406'
      )
    ));
    expect(w.is('.el-breadcrumb')).toBe(true);
  });

  it('test children', function () {
    var w = (0, _enzyme.mount)(_react2.default.createElement(
      _2.default,
      { separator: '' },
      _react2.default.createElement(
        _2.default.Item,
        null,
        '\u9996\u9875'
      ),
      _react2.default.createElement(
        _2.default.Item,
        null,
        '\u6D3B\u52A8\u7BA1\u7406'
      ),
      _react2.default.createElement(
        _2.default.Item,
        null,
        '\u6D3B\u52A8\u5217\u8868'
      ),
      _react2.default.createElement(
        _2.default.Item,
        null,
        '\u6D3B\u52A8\u8BE6\u60C5'
      )
    ));
    expect(w.find('.el-breadcrumb__item').length).toBe(4);
  });

  it('test separator', function () {
    var w = (0, _enzyme.mount)(_react2.default.createElement(
      _2.default,
      { separator: '/' },
      _react2.default.createElement(
        _2.default.Item,
        null,
        '\u9996\u9875'
      ),
      _react2.default.createElement(
        _2.default.Item,
        null,
        '\u6D3B\u52A8\u7BA1\u7406'
      ),
      _react2.default.createElement(
        _2.default.Item,
        null,
        '\u6D3B\u52A8\u5217\u8868'
      ),
      _react2.default.createElement(
        _2.default.Item,
        null,
        '\u6D3B\u52A8\u8BE6\u60C5'
      )
    ));
    expect(w.find('.el-breadcrumb__separator').at(0).text()).toBe('/');
  });
});
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }
}();

;