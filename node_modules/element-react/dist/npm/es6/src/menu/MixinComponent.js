import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import { Component, PropTypes } from '../../libs';

var MixinComponent = function (_Component) {
  _inherits(MixinComponent, _Component);

  function MixinComponent() {
    _classCallCheck(this, MixinComponent);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  MixinComponent.prototype.parent = function parent() {
    return this.context.component;
  };

  MixinComponent.prototype.indexPath = function indexPath() {
    var path = [this.props.index];
    var parent = this.parent();

    while (parent.instanceType !== 'Menu') {
      if (parent.props.index) {
        path.unshift(parent.props.index);
      }

      parent = parent.parent();
    }

    return path;
  };

  MixinComponent.prototype.rootMenu = function rootMenu() {
    var parent = this.parent();

    while (parent.instanceType !== 'Menu') {
      parent = parent.parent();
    }

    return parent;
  };

  return MixinComponent;
}(Component);

export default MixinComponent;


MixinComponent.contextTypes = {
  component: PropTypes.any
};