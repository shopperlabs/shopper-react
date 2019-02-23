import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import PropTypes from 'prop-types';
import { Component } from 'react';
import { require_condition } from '../utils';

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
  _inherits(EventRegister, _Component);

  function EventRegister() {
    _classCallCheck(this, EventRegister);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  EventRegister.prototype.componentDidMount = function componentDidMount() {
    var _props = this.props,
        eventName = _props.eventName,
        id = _props.id;

    eventName = eventName.toLowerCase();
    eventName = /^on/.test(eventName) ? eventName.substring(2) : eventName;
    this.cached = Object.assign({}, this.props, { eventName: eventName });

    require_condition(typeof id === 'string', 'id prop is required');
    require_condition(!hasRegistered(this.cached), 'id: ' + id + ' has been registered');

    doRegister(this.cached);
  };

  EventRegister.prototype.componentWillUnmount = function componentWillUnmount() {
    cleanRegister(this.cached);
  };

  EventRegister.prototype.render = function render() {
    return null;
  };

  return EventRegister;
}(Component);

export default EventRegister;


EventRegister.propTypes = {
  id: PropTypes.string.isRequired,
  target: PropTypes.object.isRequired,
  eventName: PropTypes.string.isRequired,
  func: PropTypes.func.isRequired,
  isUseCapture: PropTypes.bool
};