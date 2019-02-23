import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import { Component, PropTypes } from '../../libs';

var Steps = function (_Component) {
  _inherits(Steps, _Component);

  function Steps() {
    _classCallCheck(this, Steps);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  Steps.prototype.calcProgress = function calcProgress(status, index) {
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
  };

  Steps.prototype.calStatus = function calStatus(index) {
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
  };

  Steps.prototype.render = function render() {
    var _this2 = this;

    var _props2 = this.props,
        children = _props2.children,
        space = _props2.space,
        direction = _props2.direction;


    return React.createElement(
      'div',
      { style: this.style(), className: this.className('el-steps') },
      React.Children.map(children, function (child, index) {
        var computedSpace = space ? space + 'px' : 100 / children.length + '%';
        var style = direction === 'horizontal' ? { width: computedSpace } : {
          height: index === children.length - 1 ? 'auto' : computedSpace
        };
        var status = _this2.calStatus(index);
        var lineStyle = _this2.calcProgress(status, index);
        return React.cloneElement(child, {
          style: style,
          lineStyle: lineStyle,
          direction: direction,
          status: status,
          stepNumber: index + 1
        });
      })
    );
  };

  return Steps;
}(Component);

Steps.defaultProps = {
  direction: 'horizontal',
  finishStatus: 'finish',
  processStatus: 'process',
  active: 0
};
export default Steps;


var statusMap = ['wait', 'process', 'finish', 'error', 'success'];

Steps.propTypes = {
  space: PropTypes.number,
  active: PropTypes.number,
  direction: PropTypes.oneOf(['vertical', 'horizontal']),
  finishStatus: PropTypes.oneOf(statusMap),
  processStatus: PropTypes.oneOf(statusMap)
};