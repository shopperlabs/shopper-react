'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Bar = undefined;

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

var _util = require('./util');

var _dom = require('../../libs/utils/dom');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Bar = exports.Bar = function (_Component) {
  (0, _inherits3.default)(Bar, _Component);

  function Bar(props) {
    (0, _classCallCheck3.default)(this, Bar);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Bar.__proto__ || Object.getPrototypeOf(Bar)).call(this, props));

    _this.clickTrackHandler = _this.clickTrackHandler.bind(_this);
    _this.clickThumbHandler = _this.clickThumbHandler.bind(_this);
    _this.mouseMoveDocumentHandler = _this.mouseMoveDocumentHandler.bind(_this);
    _this.mouseUpDocumentHandler = _this.mouseUpDocumentHandler.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(Bar, [{
    key: 'clickThumbHandler',
    value: function clickThumbHandler(e) {
      this.startDrag(e);
      this[this.bar.axis] = e.currentTarget[this.bar.offset] - (e[this.bar.client] - e.currentTarget.getBoundingClientRect()[this.bar.direction]);
    }
  }, {
    key: 'clickTrackHandler',
    value: function clickTrackHandler(e) {
      var offset = Math.abs(e.target.getBoundingClientRect()[this.bar.direction] - e[this.bar.client]);
      var thumbHalf = this.thumbRef[this.bar.offset] / 2;
      var thumbPositionPercentage = (offset - thumbHalf) * 100 / this.rootRef[this.bar.offset];

      this.wrap[this.bar.scroll] = thumbPositionPercentage * this.wrap[this.bar.scrollSize] / 100;
    }
  }, {
    key: 'startDrag',
    value: function startDrag(e) {
      e.nativeEvent.stopImmediatePropagation;
      this.cursorDown = true;

      (0, _dom.on)(document, 'mousemove', this.mouseMoveDocumentHandler);
      (0, _dom.on)(document, 'mouseup', this.mouseUpDocumentHandler);
      document.onselectstart = function () {
        return false;
      };
    }
  }, {
    key: 'mouseMoveDocumentHandler',
    value: function mouseMoveDocumentHandler(e) {
      if (this.cursorDown === false) return;
      var prevPage = this[this.bar.axis];

      if (!prevPage) return;

      var offset = e[this.bar.client] - this.rootRef.getBoundingClientRect()[this.bar.direction];
      var thumbClickPosition = this.thumbRef[this.bar.offset] - prevPage;
      var thumbPositionPercentage = (offset - thumbClickPosition) * 100 / this.rootRef[this.bar.offset];

      this.wrap[this.bar.scroll] = thumbPositionPercentage * this.wrap[this.bar.scrollSize] / 100;
    }
  }, {
    key: 'mouseUpDocumentHandler',
    value: function mouseUpDocumentHandler() {
      this.cursorDown = false;
      this[this.bar.axis] = 0;
      (0, _dom.off)(document, 'mousemove', this.mouseMoveDocumentHandler);
      document.onselectstart = null;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          size = _props.size,
          move = _props.move;


      return _react2.default.createElement(
        'div',
        {
          ref: function ref(root) {
            return _this2.rootRef = root;
          },
          className: this.classNames('el-scrollbar__bar', 'is-' + this.bar.key),
          onMouseDown: this.clickTrackHandler },
        _react2.default.createElement('div', {
          ref: function ref(thumb) {
            return _this2.thumbRef = thumb;
          },
          className: 'el-scrollbar__thumb',
          onMouseDown: this.clickThumbHandler,
          style: (0, _util.renderThumbStyle)({ size: size, move: move, bar: this.bar }) })
      );
    }
  }, {
    key: 'bar',
    get: function get() {
      return _util.BAR_MAP[this.props.vertical ? 'vertical' : 'horizontal'];
    }
  }, {
    key: 'wrap',
    get: function get() {
      return this.props.getParentWrap();
    }
  }]);
  return Bar;
}(_libs.Component);

Bar.propTypes = {
  vertical: _libs.PropTypes.bool,
  size: _libs.PropTypes.string,
  move: _libs.PropTypes.number,
  getParentWrap: _libs.PropTypes.func.isRequired
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Bar, 'Bar', 'src/scrollbar/Bar.jsx');
}();

;