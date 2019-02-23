'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Loading = function (_Component) {
  (0, _inherits3.default)(Loading, _Component);

  function Loading() {
    (0, _classCallCheck3.default)(this, Loading);
    return (0, _possibleConstructorReturn3.default)(this, (Loading.__proto__ || Object.getPrototypeOf(Loading)).apply(this, arguments));
  }

  (0, _createClass3.default)(Loading, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.enableScroll();
    }
  }, {
    key: 'getStyle',
    value: function getStyle() {
      if (this.props.fullscreen) {
        this.disableScroll();

        return {
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          zIndex: 99999
        };
      } else {
        this.enableScroll();

        return {
          position: 'relative'
        };
      }
    }
  }, {
    key: 'documentBody',
    value: function documentBody() {
      return document.body;
    }
  }, {
    key: 'disableScroll',
    value: function disableScroll() {
      var documentBody = this.documentBody();
      if (documentBody) {
        documentBody.style.setProperty('overflow', 'hidden');
      }
    }
  }, {
    key: 'enableScroll',
    value: function enableScroll() {
      var documentBody = this.documentBody();
      if (documentBody) {
        documentBody.style.removeProperty('overflow');
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          loading = _props.loading,
          fullscreen = _props.fullscreen,
          text = _props.text;


      return _react2.default.createElement(
        'div',
        { style: this.style(this.getStyle()), className: this.className() },
        loading && _react2.default.createElement(
          'div',
          {
            style: {
              display: 'block',
              position: 'absolute',
              zIndex: 657,
              backgroundColor: 'rgba(255, 255, 255, 0.901961)',
              margin: 0,
              top: 0,
              right: 0,
              bottom: 0,
              left: 0
            } },
          _react2.default.createElement(
            'div',
            { className: this.classNames('el-loading-spinner', {
                'is-full-screen': fullscreen
              }), style: {
                position: 'absolute',
                display: 'inline-block',
                left: 0
              } },
            _react2.default.createElement(
              'svg',
              { className: 'circular', viewBox: '25 25 50 50' },
              _react2.default.createElement('circle', { className: 'path', cx: '50', cy: '50', r: '20', fill: 'none' })
            ),
            text && _react2.default.createElement(
              'p',
              { className: 'el-loading-text' },
              text
            )
          )
        ),
        this.props.children
      );
    }
  }]);
  return Loading;
}(_libs.Component);

var _default = Loading;
exports.default = _default;


Loading.propTypes = {
  loading: _libs.PropTypes.bool,
  fullscreen: _libs.PropTypes.bool,
  text: _libs.PropTypes.string
};

Loading.defaultProps = {
  loading: true
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Loading, 'Loading', 'src/loading/Loading.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/loading/Loading.jsx');
}();

;