import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import { PropTypes, Component } from '../../libs';
import { BAR_MAP, renderThumbStyle } from './util';
import { on, off } from '../../libs/utils/dom';

export var Bar = function (_Component) {
  _inherits(Bar, _Component);

  function Bar(props) {
    _classCallCheck(this, Bar);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.clickTrackHandler = _this.clickTrackHandler.bind(_this);
    _this.clickThumbHandler = _this.clickThumbHandler.bind(_this);
    _this.mouseMoveDocumentHandler = _this.mouseMoveDocumentHandler.bind(_this);
    _this.mouseUpDocumentHandler = _this.mouseUpDocumentHandler.bind(_this);
    return _this;
  }

  Bar.prototype.clickThumbHandler = function clickThumbHandler(e) {
    this.startDrag(e);
    this[this.bar.axis] = e.currentTarget[this.bar.offset] - (e[this.bar.client] - e.currentTarget.getBoundingClientRect()[this.bar.direction]);
  };

  Bar.prototype.clickTrackHandler = function clickTrackHandler(e) {
    var offset = Math.abs(e.target.getBoundingClientRect()[this.bar.direction] - e[this.bar.client]);
    var thumbHalf = this.thumbRef[this.bar.offset] / 2;
    var thumbPositionPercentage = (offset - thumbHalf) * 100 / this.rootRef[this.bar.offset];

    this.wrap[this.bar.scroll] = thumbPositionPercentage * this.wrap[this.bar.scrollSize] / 100;
  };

  Bar.prototype.startDrag = function startDrag(e) {
    e.nativeEvent.stopImmediatePropagation;
    this.cursorDown = true;

    on(document, 'mousemove', this.mouseMoveDocumentHandler);
    on(document, 'mouseup', this.mouseUpDocumentHandler);
    document.onselectstart = function () {
      return false;
    };
  };

  Bar.prototype.mouseMoveDocumentHandler = function mouseMoveDocumentHandler(e) {
    if (this.cursorDown === false) return;
    var prevPage = this[this.bar.axis];

    if (!prevPage) return;

    var offset = e[this.bar.client] - this.rootRef.getBoundingClientRect()[this.bar.direction];
    var thumbClickPosition = this.thumbRef[this.bar.offset] - prevPage;
    var thumbPositionPercentage = (offset - thumbClickPosition) * 100 / this.rootRef[this.bar.offset];

    this.wrap[this.bar.scroll] = thumbPositionPercentage * this.wrap[this.bar.scrollSize] / 100;
  };

  Bar.prototype.mouseUpDocumentHandler = function mouseUpDocumentHandler() {
    this.cursorDown = false;
    this[this.bar.axis] = 0;
    off(document, 'mousemove', this.mouseMoveDocumentHandler);
    document.onselectstart = null;
  };

  Bar.prototype.render = function render() {
    var _this2 = this;

    var _props = this.props,
        size = _props.size,
        move = _props.move;


    return React.createElement(
      'div',
      {
        ref: function ref(root) {
          return _this2.rootRef = root;
        },
        className: this.classNames('el-scrollbar__bar', 'is-' + this.bar.key),
        onMouseDown: this.clickTrackHandler },
      React.createElement('div', {
        ref: function ref(thumb) {
          return _this2.thumbRef = thumb;
        },
        className: 'el-scrollbar__thumb',
        onMouseDown: this.clickThumbHandler,
        style: renderThumbStyle({ size: size, move: move, bar: this.bar }) })
    );
  };

  _createClass(Bar, [{
    key: 'bar',
    get: function get() {
      return BAR_MAP[this.props.vertical ? 'vertical' : 'horizontal'];
    }
  }, {
    key: 'wrap',
    get: function get() {
      return this.props.getParentWrap();
    }
  }]);

  return Bar;
}(Component);

Bar.propTypes = {
  vertical: PropTypes.bool,
  size: PropTypes.string,
  move: PropTypes.number,
  getParentWrap: PropTypes.func.isRequired
};