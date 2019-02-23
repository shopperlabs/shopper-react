import React from 'react';

function firstChild(props) {
  var childrenArray = React.Children.toArray(props.children);
  return childrenArray[0] || null;
}

export { firstChild };