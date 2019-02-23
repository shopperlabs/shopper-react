import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _createClass from 'babel-runtime/helpers/createClass';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';

import { pick } from '../../libs/utils';
import { PropTypes } from '../../libs';

import BasePicker from './BasePicker';
import DateRangePanel from './panel/DateRangePanel';

var DateRangePicker = function (_BasePicker) {
  _inherits(DateRangePicker, _BasePicker);

  _createClass(DateRangePicker, null, [{
    key: 'propTypes',
    get: function get() {
      return Object.assign({}, { rangeSeparator: PropTypes.string }, BasePicker.propTypes,
      // default value is been defined in ./constants file
      pick(DateRangePanel.propTypes, ['value', 'isShowTime', 'shortcuts', 'firstDayOfWeek']));
    }
  }, {
    key: 'defaultProps',
    get: function get() {
      var result = Object.assign({}, BasePicker.defaultProps);
      return result;
    }
  }]);

  function DateRangePicker(props) {
    _classCallCheck(this, DateRangePicker);

    return _possibleConstructorReturn(this, _BasePicker.call(this, props, 'daterange', {}));
  }

  DateRangePicker.prototype.getFormatSeparator = function getFormatSeparator() {
    return this.props.rangeSeparator;
  };

  DateRangePicker.prototype.pickerPanel = function pickerPanel(state, props) {
    var value = state.value;
    if (value instanceof Date) {
      value = [value, null];
    }
    return React.createElement(DateRangePanel, _extends({}, props, {
      value: value,
      onPick: this.onPicked.bind(this)
    }));
  };

  return DateRangePicker;
}(BasePicker);

export default DateRangePicker;