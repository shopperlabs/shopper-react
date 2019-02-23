import React from 'react';
import ReactDOM from 'react-dom';

import Toast from './Toast';

export default function Message() {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var type = arguments[1];

  var div = document.createElement('div');
  var messageBox = document.getElementsByClassName('el-message-content')[0];
  if (messageBox) {
    messageBox.appendChild(div);
    document.body.appendChild(messageBox);
  } else {
    var _messageBox = document.createElement('div');
    _messageBox.className = "el-message-content";
    _messageBox.appendChild(div);
    document.body.appendChild(_messageBox);
  }

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
      var messageBox = document.getElementsByClassName('el-message-content')[0];
      ReactDOM.unmountComponentAtNode(div);
      messageBox.removeChild(div);

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