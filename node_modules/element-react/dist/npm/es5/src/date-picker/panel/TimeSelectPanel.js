'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _libs = require('../../../libs');

var _dom = require('../../../libs/utils/dom');

var _scrollbar = require('../../scrollbar');

var _PopperBase2 = require('./PopperBase');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TimeSelectPanel = function (_PopperBase) {
  (0, _inherits3.default)(TimeSelectPanel, _PopperBase);
  (0, _createClass3.default)(TimeSelectPanel, null, [{
    key: 'propTypes',
    get: function get() {
      return Object.assign({
        start: _libs.PropTypes.string,
        end: _libs.PropTypes.string,
        step: _libs.PropTypes.string,
        minTime: _libs.PropTypes.string,
        maxTime: _libs.PropTypes.string,
        value: _libs.PropTypes.string,
        onPicked: _libs.PropTypes.func,
        //(string)=>date
        dateParser: _libs.PropTypes.func.isRequired,
        //()=>HtmlElement
        getPopperRefElement: _libs.PropTypes.func,
        popperMixinOption: _libs.PropTypes.object
      }, _PopperBase2.PopperBase.propTypes);
    }
  }]);

  function TimeSelectPanel(props) {
    (0, _classCallCheck3.default)(this, TimeSelectPanel);
    return (0, _possibleConstructorReturn3.default)(this, (TimeSelectPanel.__proto__ || Object.getPrototypeOf(TimeSelectPanel)).call(this, props));
  }

  (0, _createClass3.default)(TimeSelectPanel, [{
    key: 'handleClick',
    value: function handleClick(item) {
      var _props = this.props,
          onPicked = _props.onPicked,
          dateParser = _props.dateParser;

      if (!item.disabled) {
        onPicked(dateParser(item.value));
      }
    }
  }, {
    key: 'items',
    value: function items() {
      return TimeSelectPanel.items(this.props);
    }
  }, {
    key: 'scrollToOption',
    value: function scrollToOption() {
      var className = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'selected';

      var menu = this.refs.root.querySelector('.el-picker-panel__content');
      (0, _dom.scrollIntoView)(menu, menu.getElementsByClassName(className)[0]);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.scrollToOption();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _this2 = this;

      clearTimeout(this._timer);
      if (nextProps.value !== this.props.value) {
        this._timer = setTimeout(function () {
          return _this2.scrollToOption();
        }, 0);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var value = this.props.value;


      return _react2.default.createElement(
        'div',
        {
          ref: 'root',
          className: 'el-picker-panel time-select' },
        _react2.default.createElement(
          _scrollbar.Scrollbar,
          { wrapClass: 'el-picker-panel__content', noresize: true },
          this.items().map(function (item, idx) {
            return _react2.default.createElement(
              'div',
              { key: idx,
                className: _this3.classNames('time-select-item', { selected: value === item.value, disabled: item.disabled }),
                disabled: item.disabled,
                onClick: function onClick() {
                  return _this3.handleClick(item);
                } },
              item.value
            );
          })
        )
      );
    }
  }]);
  return TimeSelectPanel;
}(_PopperBase2.PopperBase);

var _default = TimeSelectPanel;
exports.default = _default;


TimeSelectPanel.isValid = function (value, _ref) {
  var start = _ref.start,
      end = _ref.end,
      step = _ref.step,
      minTime = _ref.minTime,
      maxTime = _ref.maxTime;

  var items = TimeSelectPanel.items({ start: start, end: end, step: step, minTime: minTime, maxTime: maxTime });
  return !!items.filter(function (e) {
    return !e.disabled;
  }).find(function (e) {
    return e.value === value;
  });
};

TimeSelectPanel.items = function (_ref2) {
  var start = _ref2.start,
      end = _ref2.end,
      step = _ref2.step,
      minTime = _ref2.minTime,
      maxTime = _ref2.maxTime;

  var result = [];

  if (start && end && step) {
    var current = start;
    while (compareTime(current, end) <= 0) {
      result.push({
        value: current,
        disabled: compareTime(current, minTime || '-1:-1') <= 0 || compareTime(current, maxTime || '100:100') >= 0
      });
      current = nextTime(current, step);
    }
  }
  return result;
};

TimeSelectPanel.defaultProps = {
  start: '09:00',
  end: '18:00',
  step: '00:30',
  minTime: '',
  onPicked: function onPicked() {},

  popperMixinOption: {}
};

var parseTime = function parseTime(time) {
  var values = (time || '').split(':');
  if (values.length >= 2) {
    var hours = parseInt(values[0], 10);
    var minutes = parseInt(values[1], 10);

    return {
      hours: hours,
      minutes: minutes
    };
  }
  /* istanbul ignore next */
  return null;
};

var compareTime = function compareTime(time1, time2) {
  var value1 = parseTime(time1);
  var value2 = parseTime(time2);

  var minutes1 = value1.minutes + value1.hours * 60;
  var minutes2 = value2.minutes + value2.hours * 60;

  if (minutes1 === minutes2) {
    return 0;
  }

  return minutes1 > minutes2 ? 1 : -1;
};

var formatTime = function formatTime(time) {
  return (time.hours < 10 ? '0' + time.hours : time.hours) + ':' + (time.minutes < 10 ? '0' + time.minutes : time.minutes);
};

var nextTime = function nextTime(time, step) {
  var timeValue = parseTime(time);
  var stepValue = parseTime(step);

  var next = {
    hours: timeValue.hours,
    minutes: timeValue.minutes
  };

  next.minutes += stepValue.minutes;
  next.hours += stepValue.hours;

  next.hours += Math.floor(next.minutes / 60);
  next.minutes = next.minutes % 60;

  return formatTime(next);
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(TimeSelectPanel, 'TimeSelectPanel', 'src/date-picker/panel/TimeSelectPanel.jsx');

  __REACT_HOT_LOADER__.register(parseTime, 'parseTime', 'src/date-picker/panel/TimeSelectPanel.jsx');

  __REACT_HOT_LOADER__.register(compareTime, 'compareTime', 'src/date-picker/panel/TimeSelectPanel.jsx');

  __REACT_HOT_LOADER__.register(formatTime, 'formatTime', 'src/date-picker/panel/TimeSelectPanel.jsx');

  __REACT_HOT_LOADER__.register(nextTime, 'nextTime', 'src/date-picker/panel/TimeSelectPanel.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/date-picker/panel/TimeSelectPanel.jsx');
}();

;