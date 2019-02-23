import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import { Component, PropTypes } from '../../libs';

var Collapse = function (_Component) {
  _inherits(Collapse, _Component);

  function Collapse(props) {
    _classCallCheck(this, Collapse);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.state = {
      activeNames: [].concat(_this.props.value)
    };
    return _this;
  }

  Collapse.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    this.setActiveNames(nextProps.value);
  };

  Collapse.prototype.setActiveNames = function setActiveNames(activeNames) {
    var _this2 = this;

    activeNames = [].concat(activeNames);
    this.setState({ activeNames: activeNames }, function () {
      return _this2.props.onChange(activeNames);
    });
  };

  Collapse.prototype.handleItemClick = function handleItemClick(name) {
    var activeNames = this.state.activeNames;


    if (this.props.accordion) {
      this.setActiveNames(activeNames[0] && activeNames[0] === name ? '' : name);
    } else {
      if (activeNames.includes(name)) {
        this.setActiveNames(activeNames.filter(function (item) {
          return item !== name;
        }));
      } else {
        this.setActiveNames(activeNames.concat(name));
      }
    }
  };

  Collapse.prototype.render = function render() {
    var _this3 = this;

    var content = React.Children.map(this.props.children, function (child, idx) {
      var name = child.props.name || idx.toString();
      return React.cloneElement(child, {
        isActive: _this3.state.activeNames.includes(name),
        key: idx,
        name: name,
        onClick: function onClick(item) {
          return _this3.handleItemClick(item);
        }
      });
    });
    return React.createElement(
      'div',
      { className: 'el-collapse' },
      content
    );
  };

  return Collapse;
}(Component);

Collapse.defaultProps = {
  value: [],
  onChange: function onChange() {}
};
export default Collapse;


Collapse.propTypes = {
  accordion: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  onChange: PropTypes.func
};