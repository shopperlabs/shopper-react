import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import { Component, PropTypes } from '../../libs';
import Cover from './Cover';

var IframeUpload = function (_Component) {
  _inherits(IframeUpload, _Component);

  function IframeUpload(props) {
    _classCallCheck(this, IframeUpload);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.state = {
      dragOver: false,
      file: null,
      disabled: false,
      frameName: 'frame-' + Date.now()
    };
    return _this;
  }

  IframeUpload.prototype.componentDidMount = function componentDidMount() {
    var _props = this.props,
        action = _props.action,
        onSuccess = _props.onSuccess,
        onError = _props.onError;
    var file = this.state.file;

    window.addEventListener('message', function (event) {
      var _ref = new URL(action),
          origin = _ref.origin;

      if (event.origin !== origin) return false;
      var response = event.data;
      if (response.result === 'success') {
        onSuccess(response, file);
      } else if (response.result === 'failed') {
        onError(response, file);
      }
    }, false);
  };

  IframeUpload.prototype.onload = function onload() {
    this.setState({ disabled: false });
  };

  IframeUpload.prototype.onDrop = function onDrop(e) {
    e.preventDefault();
    this.setState({ dragOver: false });
    this.uploadFiles(e.dataTransfer.files); // TODO
  };

  IframeUpload.prototype.handleChange = function handleChange(e) {
    if (e.target instanceof HTMLInputElement) {
      var file = e.target.files[0];
      if (file) {
        this.uploadFiles(file);
      }
    }
  };

  IframeUpload.prototype.uploadFiles = function uploadFiles(file) {
    if (this.state.disabled) return;
    this.setState({ disabled: false, file: file });
    this.props.onStart && this.props.onStart(file);
    var formNode = this.refs.form;
    var dataSpan = this.refs.data;
    var data = this.props.data;
    if (typeof data === 'function') {
      data = data(file);
    }
    var inputs = Object.keys(data).map(function (key) {
      return '<input name="' + key + '" value="' + data[key] + '"/>';
    });

    dataSpan.innerHTML = inputs.join('');
    formNode.submit();
    dataSpan.innerHTML = '';
  };

  IframeUpload.prototype.handleClick = function handleClick() {
    if (!this.state.disabled) {
      this.refs.input.click();
    }
  };

  IframeUpload.prototype.handleDragover = function handleDragover(e) {
    e.preventDefault();
    this.setState({ onDrop: true });
  };

  IframeUpload.prototype.handleDragleave = function handleDragleave(e) {
    e.preventDefault();
    this.setState({ onDrop: false });
  };

  IframeUpload.prototype.render = function render() {
    var _classNames,
        _this2 = this;

    var _props2 = this.props,
        drag = _props2.drag,
        action = _props2.action,
        name = _props2.name,
        accept = _props2.accept,
        listType = _props2.listType;
    var frameName = this.state.frameName;

    var classes = this.classNames((_classNames = {
      'el-upload': true
    }, _classNames['el-upload--' + listType] = true, _classNames));
    return React.createElement(
      'div',
      {
        className: classes,
        onClick: function onClick() {
          return _this2.handleClick();
        },
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
      React.createElement('iframe', { onLoad: function onLoad() {
          return _this2.onload();
        }, ref: 'iframe', name: frameName }),
      React.createElement(
        'form',
        {
          ref: 'form',
          action: action,
          target: frameName,
          encType: 'multipart/form-data',
          method: 'POST'
        },
        React.createElement('input', {
          className: 'el-upload__input',
          type: 'file',
          ref: 'input',
          name: name,
          onChange: function onChange(e) {
            return _this2.handleChange(e);
          },
          accept: accept
        }),
        React.createElement('input', { type: 'hidden', name: 'documentDomain', value: document.domain }),
        React.createElement('span', { ref: 'data' })
      ),
      drag ? React.createElement(
        Cover,
        { onFile: function onFile(file) {
            return _this2.uploadFiles(file);
          } },
        this.props.children
      ) : this.props.children
    );
  };

  return IframeUpload;
}(Component);

IframeUpload.defaultProps = {
  name: 'file'
};
export default IframeUpload;


IframeUpload.propTypes = {
  drag: PropTypes.bool,
  data: PropTypes.object,
  action: PropTypes.string.isRequired,
  name: PropTypes.string,
  accept: PropTypes.string,
  onStart: PropTypes.func,
  onSuccess: PropTypes.func,
  onError: PropTypes.func,
  listType: PropTypes.string
};