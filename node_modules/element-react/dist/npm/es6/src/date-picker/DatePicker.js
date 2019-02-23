import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _createClass from 'babel-runtime/helpers/createClass';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';

import { pick } from '../../libs/utils';
import { SELECTION_MODES } from './utils';

import BasePicker from './BasePicker';
import DatePanel from './panel/DatePanel';

var DatePicker = function (_BasePicker) {
  _inherits(DatePicker, _BasePicker);

  _createClass(DatePicker, null, [{
    key: 'propTypes',
    get: function get() {
      return Object.assign({}, BasePicker.propTypes, pick(DatePanel.propTypes, ['value', 'shortcuts', 'selectionMode', 'disabledDate', 'showWeekNumber', 'firstDayOfWeek', 'isShowTime']));
    }
  }, {
    key: 'defaultProps',
    get: function get() {
      var result = Object.assign({}, BasePicker.defaultProps);
      return result;
    }
  }]);

  function DatePicker(props) {
    _classCallCheck(this, DatePicker);

    var type = 'date';
    switch (props.selectionMode) {
      case SELECTION_MODES.YEAR:
        type = 'year';break;
      case SELECTION_MODES.MONTH:
        type = 'month';break;
      case SELECTION_MODES.WEEK:
        type = 'week';break;
    }
    return _possibleConstructorReturn(this, _BasePicker.call(this, props, type, {}));
  }

  DatePicker.prototype.pickerPanel = function pickerPanel(state, props) {
    return React.createElement(DatePanel, _extends({}, props, {
      value: state.value,
      onPick: this.onPicked.bind(this)
    }));
  };

  return DatePicker;
}(BasePicker);

export default DatePicker;