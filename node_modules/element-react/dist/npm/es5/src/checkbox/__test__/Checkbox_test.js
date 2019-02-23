'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _ = require('../');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test('isChecked should work', function () {
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(
    _2.default,
    { checked: true },
    '\u5907\u9009\u9879'
  ));
  expect(wrapper.find('input').props().checked).toBe(true);
});

test('Turning an unchecked item to checked', function () {
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(
    _2.default,
    null,
    '\u5907\u9009\u9879'
  ));

  // 模拟change事件
  var Input = document.createElement('input');
  Input.checked = true;
  wrapper.find('input[type="checkbox"]').simulate('change', { target: Input });

  expect(wrapper.find('input[type="checkbox"]').prop('checked')).toBe(true);
});

test('isDisabled should work', function () {
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(
    _2.default,
    { disabled: true },
    '\u5907\u9009\u9879'
  ));
  expect(wrapper.find('input').props().disabled).toBe(true);
});

test('should render checked checkbox if checkboxGroup value contains the same label', function () {
  var checkList = ['复选框 A', '选中且禁用'];
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(
    _2.default.Group,
    { value: checkList },
    _react2.default.createElement(_2.default, { label: '\u590D\u9009\u6846 A' }),
    _react2.default.createElement(_2.default, { label: '\u590D\u9009\u6846 B' }),
    _react2.default.createElement(_2.default, { label: '\u590D\u9009\u6846 C' }),
    _react2.default.createElement(_2.default, { label: '\u7981\u7528', disabled: true }),
    _react2.default.createElement(_2.default, { label: '\u9009\u4E2D\u4E14\u7981\u7528', disabled: true })
  ));

  wrapper.find('.el-checkbox').forEach(function (e) {
    if (checkList.includes(e.find('.el-checkbox__label').props().children)) {
      expect(e.find('.el-checkbox__input').hasClass('is-checked')).toEqual(true);
    }
  });
});

test('should display indeterminate mark when checkbox is an indeterminate state', function () {
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_2.default, {
    indeterminate: true }));
  expect(wrapper.find('.el-checkbox__input').hasClass('is-indeterminate')).toEqual(true);
});

test('should limited to max and min value', function () {
  var cities = ['上海', '北京', '广州', '深圳'];
  var checkedCity = ['上海', '北京'];
  var wrapper = (0, _enzyme.mount)(_react2.default.createElement(
    _2.default.Group,
    {
      min: '1',
      max: '2',
      value: checkedCity },
    cities.map(function (city, index) {
      return _react2.default.createElement(_2.default, { key: index, label: city });
    })
  ));

  //test checked length
  expect(wrapper.find('.el-checkbox .el-checkbox__input.is-checked').length).toBe(2);

  var Input = document.createElement('input');

  //test max
  Input.checked = true;
  wrapper.find('input[type="checkbox"]').forEach(function (e) {
    if (!e.prop('checked')) {
      e.simulate('change', { target: Input });
      expect(wrapper.find('.el-checkbox__input.is-checked').length).toBe(2);
    }
  });

  //test min
  Input.checked = false;
  wrapper.find('input[type="checkbox"]').forEach(function (e) {
    if (e.prop('checked')) {
      e.simulate('change', { target: Input });
      expect(wrapper.find('.el-checkbox__input.is-checked').length).toBe(1);
    }
  });
});
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }
}();

;