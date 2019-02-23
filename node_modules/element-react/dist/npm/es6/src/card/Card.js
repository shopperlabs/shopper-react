import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import { Component, PropTypes } from '../../libs';

var Card = function (_Component) {
  _inherits(Card, _Component);

  function Card() {
    _classCallCheck(this, Card);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  Card.prototype.render = function render() {
    var _props = this.props,
        header = _props.header,
        bodyStyle = _props.bodyStyle,
        children = _props.children;

    return React.createElement(
      'div',
      { style: this.style(), className: this.className('el-card') },
      header && React.createElement(
        'div',
        { className: 'el-card__header' },
        header
      ),
      React.createElement(
        'div',
        { className: 'el-card__body', style: bodyStyle },
        children
      )
    );
  };

  return Card;
}(Component);

Card.defaultProps = {
  bodyStyle: {
    padding: '20px'
  }
};
export default Card;


Card.propTypes = {
  header: PropTypes.node,
  bodyStyle: PropTypes.object
};