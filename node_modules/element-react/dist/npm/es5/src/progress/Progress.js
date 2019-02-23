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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Progress = function (_Component) {
  (0, _inherits3.default)(Progress, _Component);

  function Progress(props) {
    (0, _classCallCheck3.default)(this, Progress);
    return (0, _possibleConstructorReturn3.default)(this, (Progress.__proto__ || Object.getPrototypeOf(Progress)).call(this, props));
  }

  (0, _createClass3.default)(Progress, [{
    key: 'relativeStrokeWidth',
    value: function relativeStrokeWidth() {
      var _props = this.props,
          strokeWidth = _props.strokeWidth,
          width = _props.width;

      return (strokeWidth / width * 100).toFixed(1);
    }
  }, {
    key: 'trackPath',
    value: function trackPath() {
      var radius = parseInt(50 - parseFloat(this.relativeStrokeWidth()) / 2, 10);
      return 'M 50 50 m 0 -' + radius + ' a ' + radius + ' ' + radius + ' 0 1 1 0 ' + radius * 2 + ' a ' + radius + ' ' + radius + ' 0 1 1 0 -' + radius * 2;
    }
  }, {
    key: 'perimeter',
    value: function perimeter() {
      var radius = 50 - parseFloat(this.relativeStrokeWidth()) / 2;
      return 2 * Math.PI * radius;
    }
  }, {
    key: 'circlePathStyle',
    value: function circlePathStyle() {
      var perimeter = this.perimeter();
      return {
        strokeDasharray: perimeter + 'px,' + perimeter + 'px',
        strokeDashoffset: (1 - this.props.percentage / 100) * perimeter + 'px',
        transition: 'stroke-dashoffset 0.6s ease 0s, stroke 0.6s ease'
      };
    }
  }, {
    key: 'stroke',
    value: function stroke() {
      var ret = void 0;
      switch (this.props.status) {
        case 'success':
          ret = '#13ce66';
          break;
        case 'exception':
          ret = '#ff4949';
          break;
        default:
          ret = '#20a0ff';
      }
      return ret;
    }
  }, {
    key: 'iconClass',
    value: function iconClass() {
      var _props2 = this.props,
          type = _props2.type,
          status = _props2.status;

      return type === 'line' ? status === 'success' ? 'el-icon-circle-check' : 'el-icon-circle-cross' : status === 'success' ? 'el-icon-check' : 'el-icon-close';
    }
  }, {
    key: 'progressTextSize',
    value: function progressTextSize() {
      var _props3 = this.props,
          type = _props3.type,
          strokeWidth = _props3.strokeWidth,
          width = _props3.width;

      return type === 'line' ? 12 + strokeWidth * 0.4 : width * 0.111111 + 2;
    }
  }, {
    key: 'render',
    value: function render() {
      var _className;

      var _props4 = this.props,
          type = _props4.type,
          percentage = _props4.percentage,
          status = _props4.status,
          strokeWidth = _props4.strokeWidth,
          textInside = _props4.textInside,
          width = _props4.width,
          showText = _props4.showText;

      var progress = void 0;
      if (type === 'line') {
        progress = _react2.default.createElement(
          'div',
          { className: 'el-progress-bar' },
          _react2.default.createElement(
            'div',
            {
              className: 'el-progress-bar__outer',
              style: { height: strokeWidth + 'px' }
            },
            _react2.default.createElement(
              'div',
              {
                className: 'el-progress-bar__inner',
                style: { width: percentage + '%' }
              },
              showText && textInside && _react2.default.createElement(
                'div',
                { className: 'el-progress-bar__innerText' },
                percentage + '%'
              )
            )
          )
        );
      } else {
        progress = _react2.default.createElement(
          'div',
          {
            className: 'el-progress-circle',
            style: { height: width + 'px', width: width + 'px' }
          },
          _react2.default.createElement(
            'svg',
            { viewBox: '0 0 100 100' },
            _react2.default.createElement('path', {
              className: 'el-progress-circle__track',
              d: this.trackPath(),
              stroke: '#e5e9f2',
              strokeWidth: this.relativeStrokeWidth(),
              fill: 'none'
            }),
            _react2.default.createElement('path', {
              className: 'el-progress-circle__path',
              d: this.trackPath(),
              strokeLinecap: 'round',
              stroke: this.stroke(),
              strokeWidth: this.relativeStrokeWidth(),
              fill: 'none',
              style: this.circlePathStyle()
            })
          )
        );
      }
      var progressInfo = showText && !textInside && _react2.default.createElement(
        'div',
        {
          className: 'el-progress__text',
          style: { fontSize: this.progressTextSize() + 'px' }
        },
        status ? _react2.default.createElement('i', { className: this.iconClass() }) : percentage + '%'
      );

      return _react2.default.createElement(
        'div',
        {
          style: this.style(),
          className: this.className('el-progress', 'el-progress--' + type, (_className = {}, (0, _defineProperty3.default)(_className, 'is-' + status, !!status), (0, _defineProperty3.default)(_className, 'el-progress--without-text', !showText), (0, _defineProperty3.default)(_className, 'el-progress--text-inside', textInside), _className))
        },
        progress,
        progressInfo
      );
    }
  }]);
  return Progress;
}(_libs.Component);

Progress.defaultProps = {
  type: 'line',
  percentage: 0,
  strokeWidth: 6,
  width: 126,
  showText: true,
  textInside: false
};
var _default = Progress;
exports.default = _default;


Progress.propTypes = {
  type: _libs.PropTypes.oneOf(['line', 'circle']),
  percentage: _libs.PropTypes.range(0, 100).isRequired,
  status: _libs.PropTypes.string,
  strokeWidth: _libs.PropTypes.number,
  width: _libs.PropTypes.number,
  textInside: _libs.PropTypes.bool,
  showText: _libs.PropTypes.bool
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Progress, 'Progress', 'src/progress/Progress.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/progress/Progress.jsx');
}();

;