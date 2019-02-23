import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

var View = function (_Component) {
  _inherits(View, _Component);

  function View() {
    _classCallCheck(this, View);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  View.prototype.render = function render() {
    var style = this.props.hasOwnProperty('show') && !this.props.show && {
      display: 'none'
    };

    return React.cloneElement(React.Children.only(this.props.children), {
      style: Object.assign({}, this.props.children.props.style, style)
    });
  };

  return View;
}(Component);

/* eslint-disable */


export default View;
View.propTypes = {
  show: PropTypes.any
};
/* eslint-enable */

View._typeName = 'View';