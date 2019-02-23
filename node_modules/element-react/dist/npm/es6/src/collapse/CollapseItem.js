import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import { Component, PropTypes, CollapseTransition } from '../../libs';

var CollapseItem = function (_Component) {
  _inherits(CollapseItem, _Component);

  function CollapseItem(props) {
    _classCallCheck(this, CollapseItem);

    return _possibleConstructorReturn(this, _Component.call(this, props));
  }

  CollapseItem.prototype.render = function render() {
    var _props = this.props,
        title = _props.title,
        isActive = _props.isActive,
        _onClick = _props.onClick,
        name = _props.name;


    return React.createElement(
      'div',
      {
        className: this.classNames({
          'el-collapse-item': true,
          'is-active': isActive
        })
      },
      React.createElement(
        'div',
        { className: 'el-collapse-item__header', onClick: function onClick() {
            return _onClick(name);
          } },
        React.createElement('i', { className: 'el-collapse-item__header__arrow el-icon-arrow-right' }),
        title
      ),
      React.createElement(
        CollapseTransition,
        { isShow: isActive },
        React.createElement(
          'div',
          { className: 'el-collapse-item__wrap' },
          React.createElement(
            'div',
            { className: 'el-collapse-item__content' },
            this.props.children
          )
        )
      )
    );
  };

  return CollapseItem;
}(Component);

export default CollapseItem;


CollapseItem.propTypes = {
  onClick: PropTypes.func,
  isActive: PropTypes.bool,
  title: PropTypes.node,
  name: PropTypes.string
};