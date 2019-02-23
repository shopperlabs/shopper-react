import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import { Component, PropTypes } from '../../libs';

var Progress = function (_Component) {
  _inherits(Progress, _Component);

  function Progress(props) {
    _classCallCheck(this, Progress);

    return _possibleConstructorReturn(this, _Component.call(this, props));
  }

  Progress.prototype.relativeStrokeWidth = function relativeStrokeWidth() {
    var _props = this.props,
        strokeWidth = _props.strokeWidth,
        width = _props.width;

    return (strokeWidth / width * 100).toFixed(1);
  };

  Progress.prototype.trackPath = function trackPath() {
    var radius = parseInt(50 - parseFloat(this.relativeStrokeWidth()) / 2, 10);
    return 'M 50 50 m 0 -' + radius + ' a ' + radius + ' ' + radius + ' 0 1 1 0 ' + radius * 2 + ' a ' + radius + ' ' + radius + ' 0 1 1 0 -' + radius * 2;
  };

  Progress.prototype.perimeter = function perimeter() {
    var radius = 50 - parseFloat(this.relativeStrokeWidth()) / 2;
    return 2 * Math.PI * radius;
  };

  Progress.prototype.circlePathStyle = function circlePathStyle() {
    var perimeter = this.perimeter();
    return {
      strokeDasharray: perimeter + 'px,' + perimeter + 'px',
      strokeDashoffset: (1 - this.props.percentage / 100) * perimeter + 'px',
      transition: 'stroke-dashoffset 0.6s ease 0s, stroke 0.6s ease'
    };
  };

  Progress.prototype.stroke = function stroke() {
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
  };

  Progress.prototype.iconClass = function iconClass() {
    var _props2 = this.props,
        type = _props2.type,
        status = _props2.status;

    return type === 'line' ? status === 'success' ? 'el-icon-circle-check' : 'el-icon-circle-cross' : status === 'success' ? 'el-icon-check' : 'el-icon-close';
  };

  Progress.prototype.progressTextSize = function progressTextSize() {
    var _props3 = this.props,
        type = _props3.type,
        strokeWidth = _props3.strokeWidth,
        width = _props3.width;

    return type === 'line' ? 12 + strokeWidth * 0.4 : width * 0.111111 + 2;
  };

  Progress.prototype.render = function render() {
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
      progress = React.createElement(
        'div',
        { className: 'el-progress-bar' },
        React.createElement(
          'div',
          {
            className: 'el-progress-bar__outer',
            style: { height: strokeWidth + 'px' }
          },
          React.createElement(
            'div',
            {
              className: 'el-progress-bar__inner',
              style: { width: percentage + '%' }
            },
            showText && textInside && React.createElement(
              'div',
              { className: 'el-progress-bar__innerText' },
              percentage + '%'
            )
          )
        )
      );
    } else {
      progress = React.createElement(
        'div',
        {
          className: 'el-progress-circle',
          style: { height: width + 'px', width: width + 'px' }
        },
        React.createElement(
          'svg',
          { viewBox: '0 0 100 100' },
          React.createElement('path', {
            className: 'el-progress-circle__track',
            d: this.trackPath(),
            stroke: '#e5e9f2',
            strokeWidth: this.relativeStrokeWidth(),
            fill: 'none'
          }),
          React.createElement('path', {
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
    var progressInfo = showText && !textInside && React.createElement(
      'div',
      {
        className: 'el-progress__text',
        style: { fontSize: this.progressTextSize() + 'px' }
      },
      status ? React.createElement('i', { className: this.iconClass() }) : percentage + '%'
    );

    return React.createElement(
      'div',
      {
        style: this.style(),
        className: this.className('el-progress', 'el-progress--' + type, (_className = {}, _className['is-' + status] = !!status, _className['el-progress--without-text'] = !showText, _className['el-progress--text-inside'] = textInside, _className))
      },
      progress,
      progressInfo
    );
  };

  return Progress;
}(Component);

Progress.defaultProps = {
  type: 'line',
  percentage: 0,
  strokeWidth: 6,
  width: 126,
  showText: true,
  textInside: false
};
export default Progress;


Progress.propTypes = {
  type: PropTypes.oneOf(['line', 'circle']),
  percentage: PropTypes.range(0, 100).isRequired,
  status: PropTypes.string,
  strokeWidth: PropTypes.number,
  width: PropTypes.number,
  textInside: PropTypes.bool,
  showText: PropTypes.bool
};