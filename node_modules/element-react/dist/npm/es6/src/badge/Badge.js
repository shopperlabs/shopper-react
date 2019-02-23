import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import { Component, PropTypes } from '../../libs';

var Badge = function (_Component) {
  _inherits(Badge, _Component);

  function Badge() {
    _classCallCheck(this, Badge);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  Badge.prototype.render = function render() {
    var _props = this.props,
        children = _props.children,
        value = _props.value,
        max = _props.max,
        isDot = _props.isDot;

    var className = this.classNames({
      'el-badge__content': true,
      'is-fixed': !!children,
      'is-dot': !!isDot
    });
    var content = void 0;

    if (isDot) {
      content = null;
    } else {
      if (typeof value === 'number' && typeof max === 'number') {
        content = max < value ? max + '+' : value;
      } else {
        content = value;
      }
    }

    return React.createElement(
      'div',
      { style: this.style(), className: this.className('el-badge') },
      children,
      React.createElement(
        'sup',
        { className: className },
        content
      )
    );
  };

  return Badge;
}(Component);

export default Badge;


Badge.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  max: PropTypes.number,
  isDot: PropTypes.bool
};

Badge.defaultProps = {
  isDot: false
};