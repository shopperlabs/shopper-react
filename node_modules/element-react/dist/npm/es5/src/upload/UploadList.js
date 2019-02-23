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

var _src = require('../../src');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UploadList = function (_Component) {
  (0, _inherits3.default)(UploadList, _Component);

  function UploadList(props) {
    (0, _classCallCheck3.default)(this, UploadList);
    return (0, _possibleConstructorReturn3.default)(this, (UploadList.__proto__ || Object.getPrototypeOf(UploadList)).call(this, props));
  }

  (0, _createClass3.default)(UploadList, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _context = this.context,
          onPreview = _context.onPreview,
          onRemove = _context.onRemove;
      var _props = this.props,
          listType = _props.listType,
          fileList = _props.fileList;

      var isFinished = function isFinished(status) {
        return status === 'success';
      };
      return _react2.default.createElement(
        _libs.Transition,
        {
          name: 'list'
        },
        _react2.default.createElement(
          'ul',
          {
            className: this.classNames((0, _defineProperty3.default)({
              'el-upload-list': true
            }, 'el-upload-list--' + listType, true))
          },
          fileList.map(function (file) {
            return _react2.default.createElement(
              'li',
              {
                className: _this2.classNames((0, _defineProperty3.default)({
                  'el-upload-list__item': true
                }, 'is-' + file.status, true)),
                key: file.uid
              },
              ['picture-card', 'picture'].includes(listType) && isFinished(file.status) && _react2.default.createElement('img', {
                className: 'el-upload-list__item-thumbnail',
                src: file.url,
                alt: ''
              }),
              _react2.default.createElement(
                'a',
                {
                  className: 'el-upload-list__item-name',
                  onClick: function onClick() {
                    return onPreview(file);
                  }
                },
                _react2.default.createElement('i', { className: 'el-icon-document' }),
                file.name
              ),
              _react2.default.createElement(
                'label',
                {
                  className: 'el-upload-list__item-status-label'
                },
                _react2.default.createElement('i', {
                  className: _this2.classNames({
                    'el-icon-upload-success': true,
                    'el-icon-circle-check': listType === 'text',
                    'el-icon-check': ['picture-card', 'picture'].includes(listType)
                  })
                })
              ),
              _react2.default.createElement('i', { className: 'el-icon-close', onClick: function onClick() {
                  return onRemove(file);
                } }),
              _react2.default.createElement(
                _libs.View,
                {
                  className: 'el-upload-list__item-actions',
                  show: listType === 'picture-card' && isFinished(file.status)
                },
                _react2.default.createElement(
                  'span',
                  null,
                  _react2.default.createElement(
                    'span',
                    {
                      onClick: function onClick() {
                        return onPreview(file);
                      },
                      className: 'el-upload-list__item-preview'
                    },
                    _react2.default.createElement('i', { className: 'el-icon-view' })
                  ),
                  _react2.default.createElement(
                    'span',
                    {
                      className: 'el-upload-list__item-delete',
                      onClick: function onClick() {
                        return onRemove(file);
                      }
                    },
                    _react2.default.createElement('i', { className: 'el-icon-delete2' })
                  )
                )
              ),
              file.status === 'uploading' && _react2.default.createElement(_src.Progress, {
                strokeWidth: listType === 'picture-card' ? 6 : 2,
                type: listType === 'picture-card' ? 'circle' : 'line',
                percentage: parseInt(file.percentage, 10),
                status: isFinished(file.status) && file.showProgress ? 'success' : ''
              })
            );
          })
        )
      );
    }
  }]);
  return UploadList;
}(_libs.Component);

var _default = UploadList;
exports.default = _default;


UploadList.contextTypes = {
  onPreview: _libs.PropTypes.func,
  onRemove: _libs.PropTypes.func
};

UploadList.propTypes = {
  listType: _libs.PropTypes.string,
  fileList: _libs.PropTypes.array
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(UploadList, 'UploadList', 'src/upload/UploadList.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/upload/UploadList.jsx');
}();

;