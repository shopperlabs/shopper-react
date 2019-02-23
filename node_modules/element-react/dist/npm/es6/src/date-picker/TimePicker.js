import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _createClass from 'babel-runtime/helpers/createClass';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import debounce from 'throttle-debounce/debounce';

import { PropTypes } from '../../libs';

import BasePicker from './BasePicker';
import TimePanel from './panel/TimePanel';

import { TYPE_VALUE_RESOLVER_MAP, DEFAULT_FORMATS } from './constants';


function converSelectRange(props) {
  var selectableRange = [];
  if (props.selectableRange) {
    var ranges = props.selectableRange;
    var parser = TYPE_VALUE_RESOLVER_MAP.datetimerange.parser;
    var format = DEFAULT_FORMATS.timerange;

    ranges = Array.isArray(ranges) ? ranges : [ranges];
    selectableRange = ranges.map(function (range) {
      return parser(range, format);
    });
  }
  return selectableRange;
}

var TimePicker = function (_BasePicker) {
  _inherits(TimePicker, _BasePicker);

  _createClass(TimePicker, null, [{
    key: 'propTypes',

    // why this is used, goto: http://exploringjs.com/es6/ch_classes.html
    get: function get() {
      var result = Object.assign({}, {
        // '18:30:00 - 20:30:00'
        // or ['09:30:00 - 12:00:00', '14:30:00 - 18:30:00']
        selectableRange: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)])
      }, BasePicker.propTypes);

      return result;
    }
  }, {
    key: 'defaultProps',
    get: function get() {
      var result = Object.assign({}, BasePicker.defaultProps);
      return result;
    }
  }]);

  function TimePicker(props) {
    _classCallCheck(this, TimePicker);

    var _this = _possibleConstructorReturn(this, _BasePicker.call(this, props, 'time', {}));

    _this._onSelectionChange = debounce(200, _this.onSelectionChange.bind(_this));
    return _this;
  }

  TimePicker.prototype.onSelectionChange = function onSelectionChange(start, end) {
    this.refs.inputRoot.refs.input.setSelectionRange(start, end);
    this.refs.inputRoot.refs.input.focus();
  };

  TimePicker.prototype.pickerPanel = function pickerPanel(state, props) {
    var _this2 = this;

    return React.createElement(TimePanel, _extends({}, props, {
      currentDate: state.value,
      onCancel: function onCancel() {
        return _this2.setState({ pickerVisible: false });
      },
      onPicked: this.onPicked.bind(this),
      onSelectRangeChange: this._onSelectionChange,
      selectableRange: converSelectRange(props)
    }));
  };

  return TimePicker;
}(BasePicker);

export default TimePicker;