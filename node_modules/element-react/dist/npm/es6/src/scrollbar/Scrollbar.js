import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';

import React from 'react';
import ReactDOM from 'react-dom';

import { PropTypes, Component } from '../../libs';
import { addResizeListener, removeResizeListener } from '../../libs/utils/resize-event';

import { getScrollBarWidth } from './scrollbar-width';
import { Bar } from './Bar';

export var Scrollbar = function (_Component) {
  _inherits(Scrollbar, _Component);

  function Scrollbar(props) {
    _classCallCheck(this, Scrollbar);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.state = {
      sizeWidth: '0',
      sizeHeight: '0',
      moveX: 0,
      moveY: 0
    };

    _this.update = _this._update.bind(_this);
    return _this;
  }

  Scrollbar.prototype.componentDidMount = function componentDidMount() {
    if (this.native) return;
    var rafId = requestAnimationFrame(this.update);
    this.cleanRAF = function () {
      cancelAnimationFrame(rafId);
    };
  };

  Scrollbar.prototype.componentDidUpdate = function componentDidUpdate() {
    var _this2 = this;

    this.resizeDom = ReactDOM.findDOMNode(this.refs.resize);
    if (!this.props.noresize) {
      addResizeListener(this.resizeDom, this.update);
      this.cleanResize = function () {
        removeResizeListener(_this2.resizeDom, _this2.update);
      };
    }
  };

  Scrollbar.prototype.componentWillUnmount = function componentWillUnmount() {
    this.cleanRAF();
    this.cleanResize && this.cleanResize();
  };

  Scrollbar.prototype.handleScroll = function handleScroll() {
    var wrap = this.wrap;
    this.setState({
      moveY: wrap.scrollTop * 100 / wrap.clientHeight,
      moveX: wrap.scrollLeft * 100 / wrap.clientWidth
    });
  };

  Scrollbar.prototype._update = function _update() {
    var heightPercentage = void 0,
        widthPercentage = void 0;
    var wrap = this.wrap;
    if (!wrap) return;

    heightPercentage = wrap.clientHeight * 100 / wrap.scrollHeight;
    widthPercentage = wrap.clientWidth * 100 / wrap.scrollWidth;

    var sizeHeight = heightPercentage < 100 ? heightPercentage + '%' : '';
    var sizeWidth = widthPercentage < 100 ? widthPercentage + '%' : '';

    this.setState({ sizeHeight: sizeHeight, sizeWidth: sizeWidth });
  };

  Scrollbar.prototype.render = function render() {
    var _this3 = this;

    /* eslint-disable */
    var _props = this.props,
        native = _props.native,
        viewStyle = _props.viewStyle,
        wrapStyle = _props.wrapStyle,
        viewClass = _props.viewClass,
        children = _props.children,
        viewComponent = _props.viewComponent,
        wrapClass = _props.wrapClass,
        noresize = _props.noresize,
        className = _props.className,
        others = _objectWithoutProperties(_props, ['native', 'viewStyle', 'wrapStyle', 'viewClass', 'children', 'viewComponent', 'wrapClass', 'noresize', 'className']);

    var _state = this.state,
        moveX = _state.moveX,
        moveY = _state.moveY,
        sizeWidth = _state.sizeWidth,
        sizeHeight = _state.sizeHeight;
    /* eslint-enable */

    var style = wrapStyle;
    var gutter = getScrollBarWidth();
    if (gutter) {
      var gutterWith = '-' + gutter + 'px';
      if (Array.isArray(wrapStyle)) {
        style = Object.assign.apply(null, [].concat(wrapStyle, [{ marginRight: gutterWith, marginBottom: gutterWith }]));
      } else {
        style = Object.assign({}, wrapStyle, { marginRight: gutterWith, marginBottom: gutterWith });
      }
    }

    var view = React.createElement(viewComponent, {
      className: this.classNames('el-scrollbar__view', viewClass),
      style: viewStyle,
      ref: 'resize'
    }, children);

    var nodes = void 0;
    if (!native) {
      var wrap = React.createElement(
        'div',
        _extends({}, others, {
          ref: 'wrap',
          key: 0,
          style: style,
          onScroll: this.handleScroll.bind(this),
          className: this.classNames(wrapClass, 'el-scrollbar__wrap', gutter ? '' : 'el-scrollbar__wrap--hidden-default')
        }),
        view
      );
      nodes = [wrap, React.createElement(Bar, { key: 1, move: moveX, size: sizeWidth, getParentWrap: function getParentWrap() {
          return _this3.wrap;
        } }), React.createElement(Bar, { key: 2, move: moveY, size: sizeHeight, getParentWrap: function getParentWrap() {
          return _this3.wrap;
        }, vertical: true })];
    } else {
      nodes = [React.createElement(
        'div',
        _extends({}, others, {
          key: 0,
          ref: 'wrap',
          className: this.classNames(wrapClass, 'el-scrollbar__wrap'),
          style: style }),
        view
      )];
    }

    return React.createElement('div', { className: this.classNames('el-scrollbar', className) }, nodes);
  };

  _createClass(Scrollbar, [{
    key: 'wrap',
    get: function get() {
      return this.refs.wrap;
    }
  }]);

  return Scrollbar;
}(Component);

Scrollbar.propTypes = {
  native: PropTypes.bool,
  wrapStyle: PropTypes.object,
  wrapClass: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  viewClass: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  viewStyle: PropTypes.object,
  className: PropTypes.string,
  viewComponent: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  noresize: PropTypes.bool
};

Scrollbar.defaultProps = {
  viewComponent: 'div'
};