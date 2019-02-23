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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ANIMATION_DURATION = 300;

var CollapseTransition = function (_Component) {
  (0, _inherits3.default)(CollapseTransition, _Component);

  function CollapseTransition() {
    (0, _classCallCheck3.default)(this, CollapseTransition);
    return (0, _possibleConstructorReturn3.default)(this, (CollapseTransition.__proto__ || Object.getPrototypeOf(CollapseTransition)).apply(this, arguments));
  }

  (0, _createClass3.default)(CollapseTransition, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.beforeEnter();
      if (this.props.isShow) {
        this.enter();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.beforeLeave();
      this.leave();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.isShow !== nextProps.isShow) this.triggerChange(nextProps.isShow);
    }
  }, {
    key: 'triggerChange',
    value: function triggerChange(isShow) {
      clearTimeout(this.enterTimer);
      clearTimeout(this.leaveTimer);
      if (isShow) {
        this.beforeEnter();
        this.enter();
      } else {
        this.beforeLeave();
        this.leave();
      }
    }
  }, {
    key: 'beforeEnter',
    value: function beforeEnter() {
      var el = this.selfRef;
      //prepare
      el.dataset.oldPaddingTop = el.style.paddingTop;
      el.dataset.oldPaddingBottom = el.style.paddingBottom;
      el.dataset.oldOverflow = el.style.overflow;
      el.style.height = '0';
      el.style.paddingTop = 0;
      el.style.paddingBottom = 0;
    }
  }, {
    key: 'enter',
    value: function enter() {
      var _this2 = this;

      var el = this.selfRef;
      //start
      el.style.display = 'block';
      if (el.scrollHeight !== 0) {
        el.style.height = el.scrollHeight + 'px';
        el.style.paddingTop = el.dataset.oldPaddingTop;
        el.style.paddingBottom = el.dataset.oldPaddingBottom;
      } else {
        el.style.height = '';
        el.style.paddingTop = el.dataset.oldPaddingTop;
        el.style.paddingBottom = el.dataset.oldPaddingBottom;
      }

      el.style.overflow = 'hidden';

      this.enterTimer = setTimeout(function () {
        return _this2.afterEnter();
      }, ANIMATION_DURATION);
    }
  }, {
    key: 'afterEnter',
    value: function afterEnter() {
      var el = this.selfRef;
      el.style.display = 'block';
      el.style.height = '';
      el.style.overflow = el.dataset.oldOverflow;
    }
  }, {
    key: 'beforeLeave',
    value: function beforeLeave() {
      var el = this.selfRef;
      el.dataset.oldPaddingTop = el.style.paddingTop;
      el.dataset.oldPaddingBottom = el.style.paddingBottom;
      el.dataset.oldOverflow = el.style.overflow;

      el.style.display = 'block';
      if (el.scrollHeight !== 0) {
        el.style.height = el.scrollHeight + 'px';
      }
      el.style.overflow = 'hidden';
    }
  }, {
    key: 'leave',
    value: function leave() {
      var _this3 = this;

      var el = this.selfRef;
      if (el.scrollHeight !== 0) {
        el.style.height = 0;
        el.style.paddingTop = 0;
        el.style.paddingBottom = 0;
      }
      this.leaveTimer = setTimeout(function () {
        return _this3.afterLeave();
      }, ANIMATION_DURATION);
    }
  }, {
    key: 'afterLeave',
    value: function afterLeave() {
      var el = this.selfRef;
      if (!el) return;

      el.style.display = 'none';
      el.style.height = '';
      el.style.overflow = el.dataset.oldOverflow;
      el.style.paddingTop = el.dataset.oldPaddingTop;
      el.style.paddingBottom = el.dataset.oldPaddingBottom;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      return _react2.default.createElement(
        'div',
        {
          className: 'collapse-transition',
          style: { overflow: 'hidden' },
          ref: function ref(e) {
            return _this4.selfRef = e;
          }
        },
        this.props.children
      );
    }
  }]);
  return CollapseTransition;
}(_react.Component);

var _default = CollapseTransition;
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(ANIMATION_DURATION, 'ANIMATION_DURATION', 'libs/collapse/index.jsx');

  __REACT_HOT_LOADER__.register(CollapseTransition, 'CollapseTransition', 'libs/collapse/index.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'libs/collapse/index.jsx');
}();

;