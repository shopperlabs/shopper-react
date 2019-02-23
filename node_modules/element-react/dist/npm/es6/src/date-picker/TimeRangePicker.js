import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _createClass from 'babel-runtime/helpers/createClass';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import debounce from 'throttle-debounce/debounce';
import { PropTypes } from '../../libs';

import BasePicker from './BasePicker';
import TimeRangePanel from './panel/TimeRangePanel';

var TimeRangePicker = function (_BasePicker) {
  _inherits(TimeRangePicker, _BasePicker);

  _createClass(TimeRangePicker, null, [{
    key: 'propTypes',
    get: function get() {
      var result = Object.assign({}, { rangeSeparator: PropTypes.string }, BasePicker.propTypes);
      return result;
    }
  }, {
    key: 'defaultProps',
    get: function get() {
      var result = Object.assign({}, BasePicker.defaultProps);
      return result;
    }
  }]);

  function TimeRangePicker(props) {
    _classCallCheck(this, TimeRangePicker);

    var _this = _possibleConstructorReturn(this, _BasePicker.call(this, props, 'timerange', {}));

    _this._onSelectionChange = debounce(200, _this.onSelectionChange.bind(_this));
    return _this;
  }

  TimeRangePicker.prototype.onSelectionChange = function onSelectionChange(start, end) {
    this.refs.inputRoot.refs.input.setSelectionRange(start, end);
    this.refs.inputRoot.refs.input.focus();
  };

  TimeRangePicker.prototype.getFormatSeparator = function getFormatSeparator() {
    return this.props.rangeSeparator;
  };

  TimeRangePicker.prototype.pickerPanel = function pickerPanel(state, props) {
    var _this2 = this;

    return React.createElement(TimeRangePanel, _extends({}, props, {
      currentDates: state.value,
      onCancel: function onCancel() {
        return _this2.setState({ pickerVisible: false });
      },
      onPicked: this.onPicked.bind(this),
      onSelectRangeChange: this._onSelectionChange
    }));
  };

  return TimeRangePicker;
}(BasePicker);

export default TimeRangePicker;