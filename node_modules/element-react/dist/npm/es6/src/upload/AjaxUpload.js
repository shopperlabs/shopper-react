import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import { Component, PropTypes } from '../../libs';
import ajax from './ajax';
import Cover from './Cover';

var AjaxUpload = function (_Component) {
  _inherits(AjaxUpload, _Component);

  function AjaxUpload(props) {
    _classCallCheck(this, AjaxUpload);

    return _possibleConstructorReturn(this, _Component.call(this, props));
  }

  AjaxUpload.prototype.isImage = function isImage(str) {
    return str.indexOf('image') !== -1;
  };

  AjaxUpload.prototype.handleChange = function handleChange(e) {
    if (e.target instanceof HTMLInputElement) {
      var files = e.target.files;
      if (!files) {
        return;
      }
      this.uploadFiles(files);
      this.refs.input.value = null;
    }
  };

  AjaxUpload.prototype.uploadFiles = function uploadFiles(files) {
    var _this2 = this;

    var _props = this.props,
        multiple = _props.multiple,
        limit = _props.limit,
        onExceed = _props.onExceed,
        fileList = _props.fileList;

    if (limit && fileList.length + files.length > limit) {
      onExceed && onExceed(files, fileList);
      return;
    }
    var postFiles = Array.prototype.slice.call(files);
    if (postFiles.length === 0) {
      return;
    }
    if (!multiple) {
      postFiles = postFiles.slice(0, 1);
    }
    postFiles.forEach(function (file) {
      _this2.props.onStart(file);
      if (_this2.props.autoUpload) _this2.upload(file);
    });
  };

  AjaxUpload.prototype.upload = function upload(rawFile, file) {
    var _this3 = this;

    var beforeUpload = this.props.beforeUpload;

    if (!beforeUpload) {
      return this.post(rawFile);
    }
    var before = beforeUpload(rawFile);
    if (before && before.then) {
      before.then(function (processedFile) {
        if (Object.prototype.toString.call(processedFile) === '[object File]') {
          _this3.post(processedFile);
        } else {
          _this3.post(rawFile);
        }
      }, function () {
        if (file && typeof _this3.props.onRemove === 'function') _this3.props.onRemove(file);
      });
    } else if (before !== false) {
      this.post(rawFile);
    } else {
      if (file && typeof this.props.onRemove === 'function') this.props.onRemove(file);
    }
  };

  AjaxUpload.prototype.post = function post(file) {
    var _props2 = this.props,
        filename = _props2.name,
        headers = _props2.headers,
        withCredentials = _props2.withCredentials,
        data = _props2.data,
        action = _props2.action,
        _onProgress = _props2.onProgress,
        _onSuccess = _props2.onSuccess,
        _onError = _props2.onError;
    var _props$httpRequest = this.props.httpRequest,
        httpRequest = _props$httpRequest === undefined ? ajax : _props$httpRequest;

    var req = httpRequest({
      headers: headers,
      withCredentials: withCredentials,
      file: file,
      data: data,
      filename: filename,
      action: action,
      onProgress: function onProgress(e) {
        return _onProgress(e, file);
      },
      onSuccess: function onSuccess(res) {
        return _onSuccess(res, file);
      },
      onError: function onError(err) {
        return _onError(err, file);
      }
    });
    if (req && req.then) {
      req.then(_onSuccess, _onError);
    }
  };

  AjaxUpload.prototype.handleClick = function handleClick() {
    if (!this.props.disabled) {
      this.refs.input.click();
    }
  };

  AjaxUpload.prototype.render = function render() {
    var _classNames,
        _this4 = this;

    var _props3 = this.props,
        drag = _props3.drag,
        multiple = _props3.multiple,
        accept = _props3.accept,
        listType = _props3.listType,
        disabled = _props3.disabled;

    return React.createElement(
      'div',
      {
        className: this.classNames((_classNames = {
          'el-upload': true
        }, _classNames['el-upload--' + listType] = true, _classNames)),
        onClick: function onClick() {
          return _this4.handleClick();
        }
      },
      drag ? React.createElement(
        Cover,
        { disabled: disabled, onFile: function onFile(file) {
            return _this4.uploadFiles(file);
          } },
        this.props.children
      ) : this.props.children,
      React.createElement('input', {
        className: 'el-upload__input',
        type: 'file',
        ref: 'input',
        onChange: function onChange(e) {
          return _this4.handleChange(e);
        },
        multiple: multiple,
        accept: accept
      })
    );
  };

  return AjaxUpload;
}(Component);

AjaxUpload.defaultProps = {
  name: 'file'
};
export default AjaxUpload;


AjaxUpload.propTypes = {
  drag: PropTypes.bool,
  data: PropTypes.object,
  action: PropTypes.string.isRequired,
  name: PropTypes.string,
  accept: PropTypes.string,
  headers: PropTypes.object,
  withCredentials: PropTypes.bool,
  multiple: PropTypes.bool,
  onStart: PropTypes.func,
  onProgress: PropTypes.func,
  onSuccess: PropTypes.func,
  onError: PropTypes.func,
  beforeUpload: PropTypes.func,
  autoUpload: PropTypes.bool,
  listType: PropTypes.string,
  fileList: PropTypes.array,
  disabled: PropTypes.bool,
  limit: PropTypes.number,
  onExceed: PropTypes.func,
  httpRequest: PropTypes.func
};