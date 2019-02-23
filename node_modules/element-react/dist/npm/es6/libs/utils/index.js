import { require_condition } from './assert';
import * as ReactUtils from './react';
import * as Errors from './errors';

export { require_condition, ReactUtils, Errors };

export function watchPropertyChange(target, property, cb) {
  require_condition(target != null && typeof property === 'string' && typeof cb === 'function', 'invalid arguments');

  var cache = null;
  if (!target.__watch_cache) {
    target.__watch_cache = {};
  }
  cache = target.__watch_cache;

  require_condition(cache[property] == null, 'duplicated watch on ' + target + ' \'s ' + property);
  cache[property] = cb;

  var origin = target[property];

  Object.defineProperty(target, property, {
    configurable: true,

    get: function get() {
      return origin;
    },
    set: function set(value) {
      origin = value;
      if (cache[property]) {
        cache[property](origin);
      }
    }
  });

  return function () {
    if (target.__watch_cache && target.__watch_cache[property]) {
      delete target.__watch_cache[property];
      delete target[property];
      target[property] = origin;
    }
  };
}

export function createPropType(validate) {
  // Chainable isRequired
  function checkType(isRequired, props, propName, componentName) {
    componentName = componentName || '<<anonymous>>';
    if (props[propName] == null) {
      if (isRequired) {
        return new Error("Required `" + propName + "` was not specified in " + ("`" + componentName + "`."));
      }
      return null;
    } else {
      return validate(props, propName, componentName);
    }
  }

  var chainedCheckType = checkType.bind(null, false);
  chainedCheckType.isRequired = checkType.bind(null, true);

  return chainedCheckType;
}

// take from :  http://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
export function hashCode(str) {
  if (str == null || str.length === 0) return 0;
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    var char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
}

export function pick(obj, keys) {
  require_condition(obj != null && Array.isArray(keys));

  var r = {};
  keys.forEach(function (e) {
    return r[e] = obj[e];
  });
  return r;
}

export function range(start, stop, step) {
  if (stop == null) {
    stop = start || 0;
    start = 0;
  }
  if (!step) {
    step = stop < start ? -1 : 1;
  }

  var length = Math.max(Math.ceil((stop - start) / step), 0);
  var range = Array(length);

  for (var idx = 0; idx < length; idx++, start += step) {
    range[idx] = start;
  }

  return range;
}

export { default as DateUtils } from './date';
export * from './popper-mixins';
export { IDGenerator } from './IDGenerator';