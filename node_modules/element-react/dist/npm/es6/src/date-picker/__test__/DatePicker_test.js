import _extends from 'babel-runtime/helpers/extends';
/* eslint react/prop-types: ["off"] */

import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';

import { DatePicker, DateRangePicker } from '../';
import { mockRAf, nativeEvent } from './utils';

describe('DatePicker tests', function () {

  describe('DatePicker test', function () {
    var minProps = {
      value: null,
      placeholder: '',
      onChange: function onChange() {}
    };

    function mountDefault() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return mount(React.createElement(DatePicker, _extends({}, minProps, props)));
    }

    function shallowDefault() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return shallow(React.createElement(DatePicker, _extends({}, minProps, props)));
    }

    it('should render without exploding', function () {
      var w = shallow(React.createElement(DatePicker, minProps));
      expect(w.exists()).toBeTruthy();
    });

    it('should unmount without exploding', function () {
      var w = mount(React.createElement(DatePicker, minProps));
      w.unmount();
      expect(true).toBeTruthy();
    });

    it('disabledDate should work', function () {
      mockRAf();
      var date = new Date(2017, 1, 2);
      var w = mountDefault({
        value: date,
        disabledDate: function disabledDate(d) {
          return d.getTime() < new Date(2017, 1, 2);
        }
      });

      w.find('input').simulate('focus');

      var condition = Array.from(document.querySelectorAll('.el-date-table td.normal.disabled')).map(function (node) {
        return node.innerHTML;
      }).some(function (t) {
        return t == 1;
      });
      expect(condition).toBeTruthy();
    });

    // it('onChange should work', () => {
    //   mockRAf()
    //   let date = new Date(2017, 1, 2)
    //   let onChange = sinon.spy()
    //   let w = mountDefault({
    //     value: date,
    //     onChange
    //   })
    //   w.find('input').simulate('focus');
    //   w.find('input').simulate('change', {target: {value: ''}})
    //   document.querySelectorAll('.el-date-table td.available')[0].click()
    //   expect(onChange.called).toBeTruthy()
    //   expect(onChange.args[0][0] instanceof Date).toBeTruthy()
    // })

    it('isShowTrigger should work', function () {
      var w = shallowDefault({
        isShowTrigger: false
      });
      expect(w.find('i.el-input__icon').exists()).toBe(false);
    });

    it('format should work', function () {
      var w = shallowDefault({
        value: new Date(2017, 0, 1),
        format: 'yy-MM-dd'
      });
      expect(w.find('Input').props().value).toBe('17-01-01'); //shallow, cant use find('input'), 
    });

    it('onFocus & onBlur should work', function () {
      var onFocus = sinon.spy();
      var onBlur = sinon.spy();
      var w = mountDefault({
        onFocus: onFocus,
        onBlur: onBlur
      });

      w.find('input').simulate('focus');
      expect(onFocus.called).toBeTruthy();
      w.find('input').simulate('blur');
      expect(onBlur.called).toBeTruthy();
    });
  });

  describe('DateRangePicker test', function () {
    var minProps = {
      value: [],
      onChange: function onChange() {}
    };
    function mountDefault() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      return mount(React.createElement(DateRangePicker, _extends({}, minProps, props)));
    }

    it('should render without exploding', function () {
      var w = mountDefault();
      expect(w.exists()).toBeTruthy();
    });
  });
});