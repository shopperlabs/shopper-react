import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import { Component, PropTypes, Transition, View } from '../../libs';

var Tag = function (_Component) {
  _inherits(Tag, _Component);

  function Tag(props) {
    _classCallCheck(this, Tag);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.state = {
      visible: true
    };
    return _this;
  }

  Tag.prototype.handleClose = function handleClose() {
    var _this2 = this;

    this.setState({
      visible: false
    }, function () {
      if (_this2.props.onClose) {
        _this2.props.onClose();
      }
    });
  };

  Tag.prototype.render = function render() {
    var _props = this.props,
        type = _props.type,
        hit = _props.hit,
        closable = _props.closable,
        closeTransition = _props.closeTransition,
        color = _props.color;


    return React.createElement(
      Transition,
      { name: closeTransition ? '' : 'el-zoom-in-center' },
      React.createElement(
        View,
        { key: this.state.visible, show: this.state.visible },
        React.createElement(
          'span',
          {
            style: this.style({
              backgroundColor: color
            }),
            className: this.className('el-tag', type && 'el-tag--' + type, {
              'is-hit': hit
            })
          },
          this.props.children,
          closable && React.createElement('i', { className: 'el-tag__close el-icon-close', onClick: this.handleClose.bind(this) })
        )
      )
    );
  };

  return Tag;
}(Component);

export default Tag;


Tag.propTypes = {
  closable: PropTypes.bool,
  type: PropTypes.string,
  hit: PropTypes.bool,
  color: PropTypes.string,
  closeTransition: PropTypes.bool,
  onClose: PropTypes.func
};