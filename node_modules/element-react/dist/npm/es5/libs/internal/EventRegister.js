'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var windowKey = Symbol.for("er_register_map");
var registerMap = window[windowKey] = window[windowKey] || {
  ids: {}
};

var not_null = function not_null(t) {
  return t != null;
};

var hasRegistered = function hasRegistered(_ref) {
  var id = _ref.id;

  return not_null(registerMap.ids[id]);
};

var cleanRegister = function cleanRegister(props) {
  var target = props.target,
      eventName = props.eventName,
      func = props.func,
      isUseCapture = props.isUseCapture,
      id = props.id;

  if (hasRegistered(props)) {
    target.removeEventListener(eventName, func, isUseCapture);
    delete registerMap.ids[id];
  }
};

var doRegister = function doRegister(props) {
  var id = props.id,
      eventName = props.eventName,
      func = props.func,
      isUseCapture = props.isUseCapture;

  registerMap.ids[id] = id;
  document.addEventListener(eventName, func, isUseCapture);
};

/**
 * register events that hooked up react lifecycle
 */

var EventRegister = function (_Component) {
  (0, _inherits3.default)(EventRegister, _Component);

  function EventRegister() {
    (0, _classCallCheck3.default)(this, EventRegister);
    return (0, _possibleConstructorReturn3.default)(this, (EventRegister.__proto__ || Object.getPrototypeOf(EventRegister)).apply(this, arguments));
  }

  (0, _createClass3.default)(EventRegister, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _props = this.props,
          eventName = _props.eventName,
          id = _props.id;

      eventName = eventName.toLowerCase();
      eventName = /^on/.test(eventName) ? eventName.substring(2) : eventName;
      this.cached = Object.assign({}, this.props, { eventName: eventName });

      (0, _utils.require_condition)(typeof id === 'string', 'id prop is required');
      (0, _utils.require_condition)(!hasRegistered(this.cached), 'id: ' + id + ' has been registered');

      doRegister(this.cached);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      cleanRegister(this.cached);
    }
  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }]);
  return EventRegister;
}(_react.Component);

var _default = EventRegister;
exports.default = _default;


EventRegister.propTypes = {
  id: _propTypes2.default.string.isRequired,
  target: _propTypes2.default.object.isRequired,
  eventName: _propTypes2.default.string.isRequired,
  func: _propTypes2.default.func.isRequired,
  isUseCapture: _propTypes2.default.bool
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(windowKey, 'windowKey', 'libs/internal/EventRegister.jsx');

  __REACT_HOT_LOADER__.register(registerMap, 'registerMap', 'libs/internal/EventRegister.jsx');

  __REACT_HOT_LOADER__.register(not_null, 'not_null', 'libs/internal/EventRegister.jsx');

  __REACT_HOT_LOADER__.register(hasRegistered, 'hasRegistered', 'libs/internal/EventRegister.jsx');

  __REACT_HOT_LOADER__.register(cleanRegister, 'cleanRegister', 'libs/internal/EventRegister.jsx');

  __REACT_HOT_LOADER__.register(doRegister, 'doRegister', 'libs/internal/EventRegister.jsx');

  __REACT_HOT_LOADER__.register(EventRegister, 'EventRegister', 'libs/internal/EventRegister.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'libs/internal/EventRegister.jsx');
}();

;