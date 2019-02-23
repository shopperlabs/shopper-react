'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scrollIntoView = scrollIntoView;
var loadStyleString = exports.loadStyleString = function loadStyleString(css) {
  var id = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  if (document.getElementById(id)) return;
  var style = document.createElement('style');
  style.type = 'text/css';
  style.id = id;
  try {
    style.appendChild(document.createTextNode(css));
  } catch (ex) {
    style.styleSheet.cssText = css;
  }
  var head = document.getElementsByTagName('head')[0];
  head.appendChild(style);
};

var isServer = false;
/* istanbul ignore next */
var on = exports.on = function () {
  if (!isServer && document.addEventListener) {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false);
      }
    };
  } else {
    return function (element, event, handler) {
      if (element && event && handler) {
        element.attachEvent('on' + event, handler);
      }
    };
  }
}();

/* istanbul ignore next */
var off = exports.off = function () {
  if (!isServer && document.removeEventListener) {
    return function (element, event, handler) {
      if (element && event) {
        element.removeEventListener(event, handler, false);
      }
    };
  } else {
    return function (element, event, handler) {
      if (element && event) {
        element.detachEvent('on' + event, handler);
      }
    };
  }
}();

function scrollIntoView(container, selected) {
  if (isServer) return;

  if (!selected) {
    container.scrollTop = 0;
    return;
  }

  var top = selected.offsetTop;
  var bottom = selected.offsetTop + selected.offsetHeight;
  var viewRectTop = container.scrollTop;
  var viewRectBottom = viewRectTop + container.clientHeight;

  if (top < viewRectTop) {
    container.scrollTop = top;
  } else if (bottom > viewRectBottom) {
    container.scrollTop = bottom - container.clientHeight;
  }
}
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(loadStyleString, 'loadStyleString', 'libs/utils/dom.js');

  __REACT_HOT_LOADER__.register(isServer, 'isServer', 'libs/utils/dom.js');

  __REACT_HOT_LOADER__.register(on, 'on', 'libs/utils/dom.js');

  __REACT_HOT_LOADER__.register(off, 'off', 'libs/utils/dom.js');

  __REACT_HOT_LOADER__.register(scrollIntoView, 'scrollIntoView', 'libs/utils/dom.js');
}();

;