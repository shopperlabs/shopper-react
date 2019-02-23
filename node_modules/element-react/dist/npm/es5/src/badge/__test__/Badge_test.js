'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _ = require('../');

var _2 = _interopRequireDefault(_);

var _3 = require('../../');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Badge Test', function () {
  it('Basic usage', function () {
    var w = (0, _enzyme.mount)(_react2.default.createElement(
      _2.default,
      { value: 12 },
      _react2.default.createElement(
        _3.Button,
        { size: 'small' },
        'TEST'
      )
    ));
    expect(w.find('.el-badge .el-button span').text()).toBe('TEST');
    expect(w.find('.el-badge sup.el-badge__content').text()).toBe('12');
  });

  it('with Dropdown', function () {
    var w = (0, _enzyme.mount)(_react2.default.createElement(
      _3.Dropdown,
      { trigger: 'click', menu: _react2.default.createElement(
          _3.Dropdown.Menu,
          null,
          _react2.default.createElement(
            _3.Dropdown.Item,
            { className: 'clearfix' },
            _react2.default.createElement(
              'span',
              null,
              '\u8BC4\u8BBA'
            ),
            _react2.default.createElement(_2.default, { className: 'mark', value: 12 })
          ),
          _react2.default.createElement(
            _3.Dropdown.Item,
            { className: 'clearfix' },
            _react2.default.createElement(
              'span',
              null,
              '\u56DE\u590D'
            ),
            _react2.default.createElement(_2.default, { className: 'mark', value: 3 })
          )
        )
      },
      _react2.default.createElement(
        'span',
        { className: 'el-dropdown-link' },
        '\u70B9\u6211\u67E5\u770B',
        _react2.default.createElement('i', { className: 'el-icon-caret-bottom el-icon--right' })
      )
    ));
    expect(w.find('.el-dropdown-menu').childAt(0).find('div.el-badge').hasClass('mark')).toBeTruthy();
    expect(w.find('.el-dropdown-menu').childAt(1).find('div.el-badge').hasClass('mark')).toBeTruthy();
    expect(w.find('.el-dropdown-menu').childAt(0).find('sup.el-badge__content').text()).toBe('12');
    expect(w.find('.el-dropdown-menu').childAt(1).find('sup.el-badge__content').text()).toBe('3');
  });

  it('Max value', function () {
    var w1 = (0, _enzyme.shallow)(_react2.default.createElement(
      _2.default,
      { value: 200, max: 99 },
      _react2.default.createElement(
        _3.Button,
        { size: 'small' },
        'TEST'
      )
    ));
    var w2 = (0, _enzyme.shallow)(_react2.default.createElement(
      _2.default,
      { value: 99, max: 99 },
      _react2.default.createElement(
        _3.Button,
        { size: 'small' },
        'TEST'
      )
    ));
    var w3 = (0, _enzyme.shallow)(_react2.default.createElement(
      _2.default,
      { value: 1, max: 99 },
      _react2.default.createElement(
        _3.Button,
        { size: 'small' },
        'TEST'
      )
    ));
    expect(w1.find('.el-badge sup.el-badge__content').text()).toBe('99+');
    expect(w2.find('.el-badge sup.el-badge__content').text()).toBe('99');
    expect(w3.find('.el-badge sup.el-badge__content').text()).toBe('1');
  });

  it('Custom content', function () {
    var w1 = (0, _enzyme.shallow)(_react2.default.createElement(
      _2.default,
      { value: 'new' },
      _react2.default.createElement(
        _3.Button,
        { size: 'small' },
        'TEST'
      )
    ));
    var w2 = (0, _enzyme.shallow)(_react2.default.createElement(
      _2.default,
      { value: 'hot' },
      _react2.default.createElement(
        _3.Button,
        { size: 'small' },
        'TEST'
      )
    ));
    expect(w1.find('.el-badge sup.el-badge__content').text()).toBe('new');
    expect(w2.find('.el-badge sup.el-badge__content').text()).toBe('hot');
  });

  it('Dot', function () {
    var w1 = (0, _enzyme.shallow)(_react2.default.createElement(
      _2.default,
      { isDot: true },
      _react2.default.createElement(_3.Button, { className: 'share-button', icon: 'share', type: 'primary' })
    ));
    expect(w1.find('.el-badge sup.el-badge__content').hasClass('is-dot')).toBeTruthy();
  });
});
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }
}();

;