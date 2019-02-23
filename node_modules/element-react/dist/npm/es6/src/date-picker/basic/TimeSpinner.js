import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _createClass from 'babel-runtime/helpers/createClass';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import debounce from 'throttle-debounce/debounce';

import { PropTypes, Component } from '../../../libs';
import { getRangeHours } from '../utils';
import { Scrollbar } from '../../scrollbar';


function range(end) {
  var r = [];
  for (var i = 0; i < end; i++) {
    r.push(i);
  }
  return r;
}

var isNumber = function isNumber(value) {
  return typeof value === 'number';
};
var validateHour = function validateHour(value) {
  return isNumber(value) && value >= 0 && value <= 23;
};
var validateMinOrSec = function validateMinOrSec(value) {
  return isNumber(value) && value >= 0 && value <= 59;
};

function propsToState(props) {
  var hours = props.hours,
      minutes = props.minutes,
      seconds = props.seconds,
      selectableRange = props.selectableRange;

  var state = {};
  var setOnValid = function setOnValid(isValid, cb) {
    return isValid && cb(state);
  };
  setOnValid(validateHour(hours), function (state) {
    return state.hours = hours;
  });
  setOnValid(validateMinOrSec(minutes), function (state) {
    return state.minutes = minutes;
  });
  setOnValid(validateMinOrSec(seconds), function (state) {
    return state.seconds = seconds;
  });
  state.hoursList = getRangeHours(selectableRange);
  state.minutesLisit = range(60);
  state.secondsList = range(60);
  return state;
}

var SCROLL_AJUST_VALUE = 85;
var calcScrollTop = function calcScrollTop(value) {
  return Math.max(0, (value - 2.5) * 32 + SCROLL_AJUST_VALUE);
};

var TimeSpinner = function (_Component) {
  _inherits(TimeSpinner, _Component);

  _createClass(TimeSpinner, null, [{
    key: 'propTypes',
    get: function get() {
      return {
        hours: PropTypes.number,
        minutes: PropTypes.number,
        seconds: PropTypes.number,
        isShowSeconds: PropTypes.bool,
        //[[datefrom, dateend]...]
        selectableRange: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.instanceOf(Date))),
        /*
        type: one of [hours, minutes, seconds]
         onChange: ({type})=>()
        */
        onChange: PropTypes.func.isRequired,
        onSelectRangeChange: PropTypes.func
      };
    }
  }, {
    key: 'defaultProps',
    get: function get() {
      return {
        hours: 0,
        minutes: 0,
        seconds: 0,
        isShowSeconds: true,
        onSelectRangeChange: function onSelectRangeChange() {}
      };
    }
  }]);

  function TimeSpinner(props) {
    _classCallCheck(this, TimeSpinner);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.state = {
      hours: 0,
      minutes: 0,
      seconds: 0
    };

    Object.assign(_this.state, propsToState(props));
    _this.ajustScrollTop = _this._ajustScrollTop.bind(_this);
    _this.handleScroll = debounce(20, _this._handleScroll.bind(_this));
    return _this;
  }

  TimeSpinner.prototype.componentDidMount = function componentDidMount() {
    this.ajustScrollTop(this.state);
  };

  TimeSpinner.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var _this2 = this;

    this.setState(propsToState(nextProps), function () {
      _this2.ajustScrollTop(_this2.state);
    });
  };

  TimeSpinner.prototype.emitSelectRange = function emitSelectRange(type) {
    var onSelectRangeChange = this.props.onSelectRangeChange;

    if (type === 'hours') {
      onSelectRangeChange(0, 3);
    } else if (type === 'minutes') {
      onSelectRangeChange(3, 5);
    } else if (type === 'seconds') {
      onSelectRangeChange(6, 9);
    }
  };

  TimeSpinner.prototype._handleScroll = function _handleScroll(_type) {
    var value = Math.min(Math.floor((this.refs[_type].refs.wrap.scrollTop - SCROLL_AJUST_VALUE) / 32 + 3), 59);
    this.handleChange(_type, value);
  };

  // type: hours, minutes, seconds


  TimeSpinner.prototype.handleChange = function handleChange(type, value, disabled) {
    var _this3 = this;

    if (disabled) return;
    this.state[type] = value;
    var changed = {};
    changed[type] = value;
    this.setState({}, function () {
      _this3.ajustScrollTop(_this3.state);
    });
    this.props.onChange(changed);
  };

  TimeSpinner.prototype._ajustScrollTop = function _ajustScrollTop(_ref) {
    var hours = _ref.hours,
        minutes = _ref.minutes,
        seconds = _ref.seconds;

    if (hours != null) {
      this.refs.hours.refs.wrap.scrollTop = calcScrollTop(hours);
    }
    if (minutes != null) {
      this.refs.minutes.refs.wrap.scrollTop = calcScrollTop(minutes);
    }
    if (this.refs.seconds && seconds != null) {
      this.refs.seconds.refs.wrap.scrollTop = calcScrollTop(seconds);
    }
  };

  TimeSpinner.prototype.render = function render() {
    var _this4 = this;

    var _state = this.state,
        hoursList = _state.hoursList,
        minutesLisit = _state.minutesLisit,
        secondsList = _state.secondsList,
        hours = _state.hours,
        minutes = _state.minutes,
        seconds = _state.seconds;
    var isShowSeconds = this.props.isShowSeconds;


    return React.createElement(
      'div',
      {
        className: this.classNames('el-time-spinner', {
          'has-seconds': isShowSeconds
        })
      },
      React.createElement(
        Scrollbar,
        {
          onMouseEnter: function onMouseEnter() {
            return _this4.emitSelectRange('hours');
          },
          onWheel: function onWheel() {
            _this4.handleScroll('hours');
          },
          ref: 'hours',
          className: 'el-time-spinner__wrapper',
          wrapStyle: { maxHeight: 'inherit' },
          viewClass: 'el-time-spinner__list',
          viewComponent: 'ul'
        },
        hoursList.map(function (disabled, idx) {
          return React.createElement(
            'li',
            {
              key: idx,
              onClick: function onClick() {
                return _this4.handleChange('hours', idx, disabled);
              },
              className: _this4.classNames('el-time-spinner__item', {
                active: idx === hours,
                disabled: disabled
              })
            },
            idx
          );
        })
      ),
      React.createElement(
        Scrollbar,
        {
          onMouseEnter: function onMouseEnter() {
            return _this4.emitSelectRange('minutes');
          },
          onWheel: function onWheel() {
            return _this4.handleScroll('minutes');
          },
          ref: 'minutes',
          className: 'el-time-spinner__wrapper',
          wrapStyle: { maxHeight: 'inherit' },
          viewClass: 'el-time-spinner__list',
          viewComponent: 'ul'
        },
        minutesLisit.map(function (minute) {
          return React.createElement(
            'li',
            {
              key: minute,
              onClick: function onClick() {
                return _this4.handleChange('minutes', minute);
              },
              className: _this4.classNames('el-time-spinner__item', {
                active: minute === minutes
              })
            },
            minute
          );
        })
      ),
      isShowSeconds && React.createElement(
        Scrollbar,
        {
          onMouseEnter: function onMouseEnter() {
            return _this4.emitSelectRange('seconds');
          },
          onWheel: function onWheel() {
            return _this4.handleScroll('seconds');
          },
          ref: 'seconds',
          className: 'el-time-spinner__wrapper',
          wrapStyle: { maxHeight: 'inherit' },
          viewClass: 'el-time-spinner__list',
          viewComponent: 'ul'
        },
        secondsList.map(function (sec) {
          return React.createElement(
            'li',
            {
              key: sec,
              onClick: function onClick() {
                return _this4.handleChange('seconds', sec);
              },
              className: _this4.classNames('el-time-spinner__item', {
                active: sec === seconds
              })
            },
            sec
          );
        })
      )
    );
  };

  return TimeSpinner;
}(Component);

export default TimeSpinner;