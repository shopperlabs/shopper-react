import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

var Component = function (_React$Component) {
  _inherits(Component, _React$Component);

  function Component() {
    _classCallCheck(this, Component);

    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
  }

  Component.prototype.classNames = function classNames() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return classnames(args);
  };

  Component.prototype.className = function className() {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return this.classNames.apply(this, args.concat([this.props.className]));
  };

  Component.prototype.style = function style(args) {
    return Object.assign({}, args, this.props.style);
  };

  return Component;
}(React.Component);

export default Component;


Component.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object
};