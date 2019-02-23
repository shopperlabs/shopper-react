import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import { Component, PropTypes } from '../../libs';

var Loading = function (_Component) {
  _inherits(Loading, _Component);

  function Loading() {
    _classCallCheck(this, Loading);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  Loading.prototype.componentWillUnmount = function componentWillUnmount() {
    this.enableScroll();
  };

  Loading.prototype.getStyle = function getStyle() {
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
  };

  Loading.prototype.documentBody = function documentBody() {
    return document.body;
  };

  Loading.prototype.disableScroll = function disableScroll() {
    var documentBody = this.documentBody();
    if (documentBody) {
      documentBody.style.setProperty('overflow', 'hidden');
    }
  };

  Loading.prototype.enableScroll = function enableScroll() {
    var documentBody = this.documentBody();
    if (documentBody) {
      documentBody.style.removeProperty('overflow');
    }
  };

  Loading.prototype.render = function render() {
    var _props = this.props,
        loading = _props.loading,
        fullscreen = _props.fullscreen,
        text = _props.text;


    return React.createElement(
      'div',
      { style: this.style(this.getStyle()), className: this.className() },
      loading && React.createElement(
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
        React.createElement(
          'div',
          { className: this.classNames('el-loading-spinner', {
              'is-full-screen': fullscreen
            }), style: {
              position: 'absolute',
              display: 'inline-block',
              left: 0
            } },
          React.createElement(
            'svg',
            { className: 'circular', viewBox: '25 25 50 50' },
            React.createElement('circle', { className: 'path', cx: '50', cy: '50', r: '20', fill: 'none' })
          ),
          text && React.createElement(
            'p',
            { className: 'el-loading-text' },
            text
          )
        )
      ),
      this.props.children
    );
  };

  return Loading;
}(Component);

export default Loading;


Loading.propTypes = {
  loading: PropTypes.bool,
  fullscreen: PropTypes.bool,
  text: PropTypes.string
};

Loading.defaultProps = {
  loading: true
};