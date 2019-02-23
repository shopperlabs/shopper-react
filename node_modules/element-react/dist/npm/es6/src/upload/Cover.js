import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import { Component, PropTypes } from '../../libs';

var Cover = function (_Component) {
  _inherits(Cover, _Component);

  function Cover(props) {
    _classCallCheck(this, Cover);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.state = {
      dragOver: false
    };
    return _this;
  }

  Cover.prototype.handleDragover = function handleDragover(e) {
    e.preventDefault();
    if (!this.props.disabled) {
      this.setState({ dragOver: true });
    }
  };

  Cover.prototype.handleDragleave = function handleDragleave(e) {
    e.preventDefault();
    this.setState({ dragOver: false });
  };

  Cover.prototype.onDrop = function onDrop(e) {
    if (this.props.disabled) return;
    e.preventDefault();
    this.setState({ dragOver: false });
    this.props.onFile(e.dataTransfer.files);
  };

  Cover.prototype.render = function render() {
    var _this2 = this;

    var dragOver = this.state.dragOver;

    return React.createElement(
      'div',
      {
        className: this.classNames({
          'el-upload-dragger': true,
          'is-dragover': dragOver
        }),
        onDrop: function onDrop(e) {
          return _this2.onDrop(e);
        },
        onDragOver: function onDragOver(e) {
          return _this2.handleDragover(e);
        },
        onDragLeave: function onDragLeave(e) {
          return _this2.handleDragleave(e);
        }
      },
      this.props.children
    );
  };

  return Cover;
}(Component);

Cover.defaultProps = {
  onFile: Function
};
export default Cover;


Cover.propTypes = {
  onFile: PropTypes.func,
  disabled: PropTypes.bool
};