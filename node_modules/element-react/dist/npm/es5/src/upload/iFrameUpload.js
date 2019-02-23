'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _libs = require('../../libs');

var _Cover = require('./Cover');

var _Cover2 = _interopRequireDefault(_Cover);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var IframeUpload = function (_Component) {
  (0, _inherits3.default)(IframeUpload, _Component);

  function IframeUpload(props) {
    (0, _classCallCheck3.default)(this, IframeUpload);

    var _this = (0, _possibleConstructorReturn3.default)(this, (IframeUpload.__proto__ || Object.getPrototypeOf(IframeUpload)).call(this, props));

    _this.state = {
      dragOver: false,
      file: null,
      disabled: false,
      frameName: 'frame-' + Date.now()
    };
    return _this;
  }

  (0, _createClass3.default)(IframeUpload, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
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
    }
  }, {
    key: 'onload',
    value: function onload() {
      this.setState({ disabled: false });
    }
  }, {
    key: 'onDrop',
    value: function onDrop(e) {
      e.preventDefault();
      this.setState({ dragOver: false });
      this.uploadFiles(e.dataTransfer.files); // TODO
    }
  }, {
    key: 'handleChange',
    value: function handleChange(e) {
      if (e.target instanceof HTMLInputElement) {
        var file = e.target.files[0];
        if (file) {
          this.uploadFiles(file);
        }
      }
    }
  }, {
    key: 'uploadFiles',
    value: function uploadFiles(file) {
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
    }
  }, {
    key: 'handleClick',
    value: function handleClick() {
      if (!this.state.disabled) {
        this.refs.input.click();
      }
    }
  }, {
    key: 'handleDragover',
    value: function handleDragover(e) {
      e.preventDefault();
      this.setState({ onDrop: true });
    }
  }, {
    key: 'handleDragleave',
    value: function handleDragleave(e) {
      e.preventDefault();
      this.setState({ onDrop: false });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props2 = this.props,
          drag = _props2.drag,
          action = _props2.action,
          name = _props2.name,
          accept = _props2.accept,
          listType = _props2.listType;
      var frameName = this.state.frameName;

      var classes = this.classNames((0, _defineProperty3.default)({
        'el-upload': true
      }, 'el-upload--' + listType, true));
      return _react2.default.createElement(
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
        _react2.default.createElement('iframe', { onLoad: function onLoad() {
            return _this2.onload();
          }, ref: 'iframe', name: frameName }),
        _react2.default.createElement(
          'form',
          {
            ref: 'form',
            action: action,
            target: frameName,
            encType: 'multipart/form-data',
            method: 'POST'
          },
          _react2.default.createElement('input', {
            className: 'el-upload__input',
            type: 'file',
            ref: 'input',
            name: name,
            onChange: function onChange(e) {
              return _this2.handleChange(e);
            },
            accept: accept
          }),
          _react2.default.createElement('input', { type: 'hidden', name: 'documentDomain', value: document.domain }),
          _react2.default.createElement('span', { ref: 'data' })
        ),
        drag ? _react2.default.createElement(
          _Cover2.default,
          { onFile: function onFile(file) {
              return _this2.uploadFiles(file);
            } },
          this.props.children
        ) : this.props.children
      );
    }
  }]);
  return IframeUpload;
}(_libs.Component);

IframeUpload.defaultProps = {
  name: 'file'
};
var _default = IframeUpload;
exports.default = _default;


IframeUpload.propTypes = {
  drag: _libs.PropTypes.bool,
  data: _libs.PropTypes.object,
  action: _libs.PropTypes.string.isRequired,
  name: _libs.PropTypes.string,
  accept: _libs.PropTypes.string,
  onStart: _libs.PropTypes.func,
  onSuccess: _libs.PropTypes.func,
  onError: _libs.PropTypes.func,
  listType: _libs.PropTypes.string
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(IframeUpload, 'IframeUpload', 'src/upload/iFrameUpload.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/upload/iFrameUpload.jsx');
}();

;