import React from 'react';
import ReactDOM from 'react-dom';

import Toast from './Toast';

export default function Message() {
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

  var component = React.createElement(Toast, Object.assign(props, {
    willUnmount: function willUnmount() {
      ReactDOM.unmountComponentAtNode(div);
      document.body.removeChild(div);

      if (props.onClose instanceof Function) {
        props.onClose();
      }
    }
  }));

  ReactDOM.render(component, div);
}

/* eslint-disable */
['success', 'warning', 'info', 'error'].forEach(function (type) {
  Message[type] = function () {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    return Message(options, type);
  };
});
/* eslint-enable */