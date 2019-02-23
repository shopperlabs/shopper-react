import React from 'react';
import ReactDOM from 'react-dom';

import Notification from './Notification';

var className = '.el-notification';

export default function NotificationCenter() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var type = arguments[1];

  var div = document.createElement('div');

  document.body.appendChild(div);

  if (typeof props === 'string' || React.isValidElement(props)) {
    props = {
      message: props
    };
  }

  if (type) {
    props.type = type;
  }

  if (!props.offset) {
    props.offset = 0;
  }

  var instances = document.querySelectorAll(className);

  var lastInstance = instances[instances.length - 1];

  props.top = (lastInstance ? parseInt(lastInstance.style.top) + lastInstance.offsetHeight : props.offset) + 16;

  var element = React.createElement(Notification, Object.assign({}, props, {
    willUnmount: function willUnmount(height, top) {
      setTimeout(function () {
        return document.body.removeChild(div);
      });
      requestAnimationFrame(function () {
        var instances = document.querySelectorAll(className);
        var len = instances.length;
        for (var i = 0; i < len; i++) {
          var _element = instances[i];
          var elementTop = parseInt(_element.style.top);
          if (elementTop > top) {
            _element.style.top = elementTop - height - 16 + 'px';
          }
        }
      });
    }
  }));

  ReactDOM.render(element, div);
}

/* eslint-disable */
['success', 'warning', 'info', 'error'].forEach(function (type) {
  NotificationCenter[type] = function () {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    return NotificationCenter(options, type);
  };
});
/* eslint-enable */