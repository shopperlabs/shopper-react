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

var Steps = function (_Component) {
  (0, _inherits3.default)(Steps, _Component);

  function Steps() {
    (0, _classCallCheck3.default)(this, Steps);
    return (0, _possibleConstructorReturn3.default)(this, (Steps.__proto__ || Object.getPrototypeOf(Steps)).apply(this, arguments));
  }

  (0, _createClass3.default)(Steps, [{
    key: 'calcProgress',
    value: function calcProgress(status, index) {
      var step = 100;
      var style = {};
      style.transitionDelay = 150 * index + 'ms';

      var nextStatus = this.calStatus(index + 1);
      // 前后状态不一致时，并且当前status为完成，statusLine的长度才为50%
      if (nextStatus !== status) {
        if (status === this.props.finishStatus) {
          step = 50;
        } else if (status === 'wait') {
          step = 0;
          style.transitionDelay = -150 * index + 'ms';
        }
      }

      this.props.direction === 'vertical' ? style.height = step + '%' : style.width = step + '%';
      return style;
    }
  }, {
    key: 'calStatus',
    value: function calStatus(index) {
      var _props = this.props,
          active = _props.active,
          finishStatus = _props.finishStatus,
          processStatus = _props.processStatus;

      var status = 'wait';

      if (active > index) {
        status = finishStatus;
      } else if (active === index) {
        status = processStatus;
      }

      return status;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props2 = this.props,
          children = _props2.children,
          space = _props2.space,
          direction = _props2.direction;


      return _react2.default.createElement(
        'div',
        { style: this.style(), className: this.className('el-steps') },
        _react2.default.Children.map(children, function (child, index) {
          var computedSpace = space ? space + 'px' : 100 / children.length + '%';
          var style = direction === 'horizontal' ? { width: computedSpace } : {
            height: index === children.length - 1 ? 'auto' : computedSpace
          };
          var status = _this2.calStatus(index);
          var lineStyle = _this2.calcProgress(status, index);
          return _react2.default.cloneElement(child, {
            style: style,
            lineStyle: lineStyle,
            direction: direction,
            status: status,
            stepNumber: index + 1
          });
        })
      );
    }
  }]);
  return Steps;
}(_libs.Component);

Steps.defaultProps = {
  direction: 'horizontal',
  finishStatus: 'finish',
  processStatus: 'process',
  active: 0
};
var _default = Steps;
exports.default = _default;


var statusMap = ['wait', 'process', 'finish', 'error', 'success'];

Steps.propTypes = {
  space: _libs.PropTypes.number,
  active: _libs.PropTypes.number,
  direction: _libs.PropTypes.oneOf(['vertical', 'horizontal']),
  finishStatus: _libs.PropTypes.oneOf(statusMap),
  processStatus: _libs.PropTypes.oneOf(statusMap)
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Steps, 'Steps', 'src/steps/Steps.jsx');

  __REACT_HOT_LOADER__.register(statusMap, 'statusMap', 'src/steps/Steps.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/steps/Steps.jsx');
}();

;