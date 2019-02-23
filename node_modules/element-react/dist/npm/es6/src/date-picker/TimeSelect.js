import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _createClass from 'babel-runtime/helpers/createClass';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';

import { PropTypes } from '../../libs';
import BasePicker from './BasePicker';

import TimeSelectPanel from './panel/TimeSelectPanel';

var TimeSelect = function (_BasePicker) {
  _inherits(TimeSelect, _BasePicker);

  _createClass(TimeSelect, null, [{
    key: 'propTypes',
    get: function get() {
      var result = Object.assign({}, {
        start: PropTypes.string,
        end: PropTypes.string,
        step: PropTypes.string,
        minTime: PropTypes.instanceOf(Date)
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

  function TimeSelect(props) {
    _classCallCheck(this, TimeSelect);

    // props, type, state
    return _possibleConstructorReturn(this, _BasePicker.call(this, props, 'timeselect', {}));
  }

  TimeSelect.prototype.isDateValid = function isDateValid(value) {
    return _BasePicker.prototype.isDateValid.call(this, value) && TimeSelectPanel.isValid(this.dateToStr(value), this.panelProps());
  };

  TimeSelect.prototype.panelProps = function panelProps(props) {
    var ps = props || this.props;
    var minTime = this.dateToStr(this.props.minTime);
    return _extends({}, ps, { minTime: minTime });
  };

  TimeSelect.prototype.pickerPanel = function pickerPanel(state, props) {
    var _this2 = this;

    var value = this.dateToStr(state.value);
    return React.createElement(TimeSelectPanel, _extends({}, this.panelProps(props), {
      value: value,
      onPicked: this.onPicked.bind(this),
      dateParser: function dateParser(str) {
        var r = _this2.parseDate(str);
        return r;
      }
    }));
  };

  return TimeSelect;
}(BasePicker);

export default TimeSelect;