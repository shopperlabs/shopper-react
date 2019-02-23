'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _TimeSelect = require('../TimeSelect');

var _TimeSelect2 = _interopRequireDefault(_TimeSelect);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// https://facebook.github.io/jest/docs/expect.html
// http://airbnb.io/enzyme/docs/api/ShallowWrapper/exists.html
// http://sinonjs.org/releases/v2.3.4/spies/

// render , mount , shallow :
//    https://github.com/airbnb/enzyme/issues/465
describe('TimePicker test', function () {
  var minProps = {
    start: '08:30',
    step: '00:15',
    end: '18:30',
    maxTime: '12:30',
    onChange: function onChange() {},

    value: null,
    placeholder: 'Select time'
  };

  function mountDefault() {
    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    return (0, _enzyme.mount)(_react2.default.createElement(_TimeSelect2.default, (0, _extends3.default)({}, minProps, props)));
  }
  it('should render without exploding', function () {
    var w = (0, _enzyme.shallow)(_react2.default.createElement(_TimeSelect2.default, minProps));
    expect(w.exists()).toBeTruthy();
  });

  it('should have valid state', function () {
    (0, _utils.mockRAf)();
    var onChange = _sinon2.default.spy();
    var w = (0, _enzyme.mount)(_react2.default.createElement(_TimeSelect2.default, (0, _extends3.default)({}, minProps, {
      onChange: onChange
    })));

    // test pop up
    w.find('input[type="text"]').simulate('focus');
    expect(document.querySelectorAll('.time-select-item').length > 1).toBeTruthy();
    // min
    expect(Array.from(document.querySelectorAll('.time-select-item'))[0].innerHTML).toBe('08:30');
    // max
    expect(Array.from(document.querySelectorAll('.time-select-item.disabled'))[0].innerHTML).toBe('12:30');
    //test clear icon

    // this code doesn't work anymore, since the datepicker panel is no longer belong to wrapper node
    // and I can't find a way to simulate click event that's resided outside w node with enzemy framework

    // https://github.com/Semantic-Org/Semantic-UI-React/issues/1319
    // w.find('.time-select-item').at(0).simulate('click', nativeEvent)
    // expect(onChange.args[0][0].getTime()).toBe(new Date(2017, 0, 1, 8, 30).getTime())
    // w.find('i.el-input__icon').simulate('click', nativeEvent)
    // expect(onChange.calledWith(null)).toBeTruthy()
  });

  it('isShowTrigger should work', function () {
    var w = (0, _enzyme.mount)(_react2.default.createElement(_TimeSelect2.default, (0, _extends3.default)({}, minProps, {
      isShowTrigger: false
    })));
    expect(w.find('i.el-input__icon').exists()).toBe(false);
  });

  it('isDisabled should work', function () {
    var w = (0, _enzyme.mount)(_react2.default.createElement(_TimeSelect2.default, (0, _extends3.default)({}, minProps, {
      isDisabled: true
    })));
    expect(w.find('input').props().disabled).toBe(true);
  });

  it('onFocus & onBlur should work', function () {
    var onFocus = _sinon2.default.spy();
    var onBlur = _sinon2.default.spy();
    var w = mountDefault({
      onFocus: onFocus,
      onBlur: onBlur
    });

    w.find('input').simulate('focus');
    expect(onFocus.called).toBeTruthy();
    w.find('input').simulate('blur');
    expect(onBlur.called).toBeTruthy();
  });

  describe('TimePicker:fixed range test', function () {

    it('start date change should trigger end date selectable dates', function () {
      var startDate = new Date(2017, 1, 10, 14, 30);
      var endDate = new Date(2017, 1, 10, 15, 30);

      var Ts = function Ts(_ref) {
        var startDate = _ref.startDate,
            onChange = _ref.onChange;
        return _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(_TimeSelect2.default, {
            start: '08:30',
            step: '00:15',
            end: '18:30',
            onChange: onChange,
            value: startDate,
            placeholder: '\u9009\u62E9\u65F6\u95F4'
          }),
          _react2.default.createElement(_TimeSelect2.default, {
            start: '08:30',
            step: '00:15',
            end: '18:30',
            onChange: function onChange() {},
            value: endDate,
            minTime: startDate,
            placeholder: '\u9009\u62E9\u65F6\u95F4'
          })
        );
      };

      var w = (0, _enzyme.mount)(_react2.default.createElement(Ts, { startDate: startDate, onChange: function onChange(d) {
          startDate = d;
        } }));

      expect(w).toBeTruthy();
      // todo: fix this test, find a way to trigger click outside w node, since the panel node is dynamically inserted into body node.
      // not w(wrapper) node

      // document.querySelector('input[type="text"]').focus()
      // Array.from(document.querySelectorAll('.time-select-item'))[2].click()
      // w.setProps({ startDate })
      // // w.mount() // !notice, `update` would not work here, it seems `update` method wouldnt update deep child nodes

      // w.find('input[type="text"]').at(1).simulate('focus');
      // expect(Array.from(document.querySelectorAll('.time-select-item'))[2].classList.contains('disabled')).toBe(true)
      // expect(Array.from(document.querySelectorAll('.time-select-item'))[3].classList.contains('disabled')).toBe(true)
      // // console.log('xx', w.find('.time-select-item').at(4).debug(), startDate.toLocaleString())
    });
  });
}); /* eslint react/prop-types: ["off"] */

;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }
}();

;