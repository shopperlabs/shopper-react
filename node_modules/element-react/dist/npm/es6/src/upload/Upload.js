import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import { Component, PropTypes } from '../../libs';
import UploadList from './UploadList';
import iFrameUpload from './iFrameUpload';
import AjaxUpload from './AjaxUpload';

var Upload = function (_Component) {
  _inherits(Upload, _Component);

  function Upload(props) {
    _classCallCheck(this, Upload);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.state = {
      fileList: [],
      tempIndex: 1
    };
    return _this;
  }

  Upload.prototype.componentWillMount = function componentWillMount() {
    this.init(this.props);
  };

  Upload.prototype.init = function init(props) {
    var tempIndex = this.state.tempIndex;
    var fileList = props.fileList;

    var uploadFiles = fileList.map(function (file) {
      file.uid = file.uid || Date.now() + tempIndex++;
      file.status = 'success';
      return file;
    });
    this.setState({ fileList: uploadFiles });
  };

  Upload.prototype.getChildContext = function getChildContext() {
    return {
      onPreview: this.handlePreview.bind(this),
      onRemove: this.handleRemove.bind(this)
    };
  };

  Upload.prototype.getFile = function getFile(file) {
    if (file) {
      return this.state.fileList.find(function (item) {
        return item.uid === file.uid;
      });
    }

    return null;
  };

  Upload.prototype.handleStart = function handleStart(file) {
    var _state = this.state,
        tempIndex = _state.tempIndex,
        fileList = _state.fileList;


    file.uid = Date.now() + tempIndex++;

    var _file = {
      status: 'ready',
      name: file.name,
      size: file.size,
      percentage: 0,
      uid: file.uid,
      raw: file
    };

    try {
      _file.url = URL.createObjectURL(file);
    } catch (err) {
      return;
    }

    fileList.push(_file);
    this.setState({
      fileList: fileList,
      tempIndex: tempIndex
    });
  };

  Upload.prototype.handleProgress = function handleProgress(e, file) {
    var fileList = this.state.fileList;

    var _file = this.getFile(file);
    if (_file) {
      _file.percentage = e.percent || 0;
      _file.status = 'uploading';
      this.props.onProgress(e, _file, fileList);
      this.setState({ fileList: fileList });
    }
  };

  Upload.prototype.handleSuccess = function handleSuccess(res, file) {
    var _this2 = this;

    var fileList = this.state.fileList;

    var _file = this.getFile(file);
    if (_file) {
      _file.status = 'success';
      _file.response = res;

      setTimeout(function () {
        _this2.setState({ fileList: fileList }, function () {
          _this2.props.onSuccess(res, _file, fileList);
          _this2.props.onChange(_file, fileList);
        });
      }, 1000);
    }
  };

  Upload.prototype.handleError = function handleError(err, file) {
    var _this3 = this;

    var fileList = this.state.fileList;

    var _file = this.getFile(file);
    if (_file) {
      _file.status = 'fail';
      fileList.splice(fileList.indexOf(_file), 1);
      this.setState({ fileList: fileList }, function () {
        _this3.props.onError(err, _file, fileList);
        _this3.props.onChange(_file, fileList);
      });
    }
  };

  Upload.prototype.handleRemove = function handleRemove(file) {
    var _this4 = this;

    var fileList = this.state.fileList;

    var _file = this.getFile(file);
    if (_file) {
      fileList.splice(fileList.indexOf(_file), 1);
      this.setState({ fileList: fileList }, function () {
        return _this4.props.onRemove(file, fileList);
      });
    }
  };

  Upload.prototype.handlePreview = function handlePreview(file) {
    if (file.status === 'success') {
      this.props.onPreview(file);
    }
  };

  Upload.prototype.clearFiles = function clearFiles() {
    this.setState({
      fileList: []
    });
  };

  Upload.prototype.submit = function submit() {
    var _this5 = this;

    this.state.fileList.filter(function (file) {
      return file.status === 'ready';
    }).forEach(function (file) {
      _this5.refs['upload-inner'].upload(file.raw, file);
    });
  };

  Upload.prototype.showCover = function showCover() {
    var fileList = this.state.fileList;

    var file = fileList[fileList.length - 1];
    return file && file.status !== 'fail';
  };

  Upload.prototype.render = function render() {
    var fileList = this.state.fileList;
    var _props = this.props,
        showFileList = _props.showFileList,
        autoUpload = _props.autoUpload,
        drag = _props.drag,
        tip = _props.tip,
        action = _props.action,
        multiple = _props.multiple,
        beforeUpload = _props.beforeUpload,
        withCredentials = _props.withCredentials,
        headers = _props.headers,
        name = _props.name,
        data = _props.data,
        accept = _props.accept,
        listType = _props.listType,
        className = _props.className,
        limit = _props.limit,
        disabled = _props.disabled,
        onExceed = _props.onExceed,
        httpRequest = _props.httpRequest;

    var uploadList = void 0;
    if (showFileList && fileList.length) {
      uploadList = React.createElement(UploadList, { listType: listType, fileList: fileList });
    }
    var restProps = {
      autoUpload: autoUpload,
      drag: drag,
      action: action,
      multiple: multiple,
      beforeUpload: beforeUpload,
      withCredentials: withCredentials,
      headers: headers,
      name: name,
      data: data,
      accept: accept,
      listType: listType,
      fileList: fileList,
      limit: limit,
      disabled: disabled,
      onExceed: onExceed,
      httpRequest: httpRequest,
      onStart: this.handleStart.bind(this),
      onProgress: this.handleProgress.bind(this),
      onSuccess: this.handleSuccess.bind(this),
      onError: this.handleError.bind(this),
      onPreview: this.handlePreview.bind(this),
      onRemove: this.handleRemove.bind(this),
      showCover: this.showCover(),
      ref: 'upload-inner'
    };
    var trigger = this.props.trigger || this.props.children;
    var uploadComponent = typeof FormData !== 'undefined' ? React.createElement(
      AjaxUpload,
      _extends({ key: 'AjaxUpload' }, restProps),
      trigger
    ) : React.createElement(
      'iFrameUpload',
      _extends({ key: 'iFrameUpload' }, restProps),
      trigger
    );
    return React.createElement(
      'div',
      { className: className },
      listType === 'picture-card' ? uploadList : '',
      this.props.trigger ? [uploadComponent, this.props.children] : uploadComponent,
      tip,
      listType !== 'picture-card' ? uploadList : ''
    );
  };

  return Upload;
}(Component);

Upload.defaultProps = {
  headers: {},
  name: 'file',
  type: 'select',
  listType: 'text',
  fileList: [],
  showFileList: true,
  autoUpload: true,
  disabled: false,
  onRemove: function onRemove() {},
  onPreview: function onPreview() {},
  onProgress: function onProgress() {},
  onSuccess: function onSuccess() {},
  onError: function onError() {},
  onChange: function onChange() {}
};
export default Upload;


Upload.childContextTypes = {
  onPreview: PropTypes.func,
  onRemove: PropTypes.func
};

Upload.propTypes = {
  action: PropTypes.string.isRequired,
  headers: PropTypes.object,
  data: PropTypes.object,
  multiple: PropTypes.bool,
  name: PropTypes.string,
  withCredentials: PropTypes.bool,
  showFileList: PropTypes.bool,
  fileList: PropTypes.array,
  autoUpload: PropTypes.bool,
  accept: PropTypes.string,
  drag: PropTypes.bool,
  listType: PropTypes.oneOf(['text', 'picture', 'picture-card']),
  tip: PropTypes.node,
  trigger: PropTypes.node,
  beforeUpload: PropTypes.func,
  onRemove: PropTypes.func,
  onPreview: PropTypes.func,
  onProgress: PropTypes.func,
  onSuccess: PropTypes.func,
  onError: PropTypes.func,
  onChange: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  limit: PropTypes.number,
  onExceed: PropTypes.func,
  httpRequest: PropTypes.func
};