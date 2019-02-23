import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import { Component, PropTypes } from '../../libs';

var Step = function (_Component) {
  _inherits(Step, _Component);

  function Step(props) {
    _classCallCheck(this, Step);

    return _possibleConstructorReturn(this, _Component.call(this, props));
  }

  Step.prototype.render = function render() {
    var _props = this.props,
        title = _props.title,
        icon = _props.icon,
        description = _props.description,
        status = _props.status,
        direction = _props.direction,
        style = _props.style,
        lineStyle = _props.lineStyle,
        stepNumber = _props.stepNumber;

    var directionClass = 'is-' + direction;
    var statusClass = 'is-' + status;
    var iconNode = icon ? React.createElement('i', { className: 'el-icon-' + icon }) : React.createElement(
      'div',
      null,
      stepNumber
    );

    return React.createElement(
      'div',
      {
        style: this.style(style),
        className: this.className('el-step', directionClass)
      },
      React.createElement(
        'div',
        {
          className: this.classNames('el-step__head', statusClass, {
            'is-text': !icon
          })
        },
        React.createElement(
          'div',
          {
            className: this.classNames('el-step__line', directionClass, {
              'is-icon': icon
            })
          },
          React.createElement('i', { className: 'el-step__line-inner', style: lineStyle })
        ),
        React.createElement(
          'span',
          { className: 'el-step__icon' },
          status !== 'success' && status !== 'error' ? iconNode : React.createElement('i', {
            className: 'el-icon-' + (status === 'success' ? 'check' : 'close')
          })
        )
      ),
      React.createElement(
        'div',
        { className: 'el-step__main' },
        React.createElement(
          'div',
          {
            ref: 'title',
            className: this.classNames('el-step__title', statusClass)
          },
          title
        ),
        React.createElement(
          'div',
          { className: this.classNames('el-step__description', statusClass) },
          description
        )
      )
    );
  };

  return Step;
}(Component);

Step.defaultProps = {
  status: 'wait'
};
export default Step;


Step.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.string,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  status: PropTypes.string,
  direction: PropTypes.string,
  style: PropTypes.object,
  lineStyle: PropTypes.object,
  stepNumber: PropTypes.number
};