import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import { PropTypes, Component } from '../../libs';
import { require_condition } from '../../libs/utils';
import Node from './Node';
import Locale from '../locale';
import TreeStore from './model/tree-store';

var Tree = function (_Component) {
  _inherits(Tree, _Component);

  function Tree(props) {
    _classCallCheck(this, Tree);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    var _this$props = _this.props,
        data = _this$props.data,
        lazy = _this$props.lazy,
        options = _this$props.options,
        load = _this$props.load,
        defaultCheckedKeys = _this$props.defaultCheckedKeys,
        defaultExpandedKeys = _this$props.defaultExpandedKeys,
        currentNodeKey = _this$props.currentNodeKey,
        nodeKey = _this$props.nodeKey,
        checkStrictly = _this$props.checkStrictly,
        autoExpandParent = _this$props.autoExpandParent,
        defaultExpandAll = _this$props.defaultExpandAll,
        filterNodeMethod = _this$props.filterNodeMethod;

    _this.state = {
      store: new TreeStore({
        key: nodeKey, data: data, lazy: lazy, props: options, load: load, currentNodeKey: currentNodeKey, checkStrictly: checkStrictly,
        defaultCheckedKeys: defaultCheckedKeys, defaultExpandedKeys: defaultExpandedKeys, autoExpandParent: autoExpandParent, defaultExpandAll: defaultExpandAll, filterNodeMethod: filterNodeMethod
      }),
      currentNode: null
    };

    return _this;
  }

  Tree.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    if (nextProps.data instanceof Array && this.props.data !== nextProps.data) {
      this.root.setData(nextProps.data);
      this.setState({}); //force update
    }
  };

  Tree.prototype.filter = function filter(value) {
    if (!this.props.filterNodeMethod) throw new Error('[Tree] filterNodeMethod is required when filter');
    this.store.filter(value);
    this.refresh();
  };

  Tree.prototype.refresh = function refresh() {
    this.setState({});
  };

  Tree.prototype.getNodeKey = function getNodeKey(node, otherwise) {
    var nodeKey = this.props.nodeKey;
    if (nodeKey && node) {
      return node.data[nodeKey];
    }
    return otherwise;
  };

  Tree.prototype.getCheckedNodes = function getCheckedNodes(leafOnly) {
    return this.store.getCheckedNodes(leafOnly);
  };

  Tree.prototype.getCheckedKeys = function getCheckedKeys(leafOnly) {
    return this.store.getCheckedKeys(leafOnly);
  };

  Tree.prototype.setCheckedNodes = function setCheckedNodes(nodes, leafOnly) {
    if (!this.props.nodeKey) throw new Error('[Tree] nodeKey is required in setCheckedNodes');
    this.store.setCheckedNodes(nodes, leafOnly);
  };

  Tree.prototype.setCheckedKeys = function setCheckedKeys(keys, leafOnly) {
    if (!this.props.nodeKey) throw new Error('[Tree] nodeKey is required in setCheckedNodes');
    this.store.setCheckedKeys(keys, leafOnly);
  };

  Tree.prototype.setChecked = function setChecked(data, checked, deep) {
    this.store.setChecked(data, checked, deep);
  };

  // used by child nodes, use tree store to store this info?


  Tree.prototype.getCurrentNode = function getCurrentNode() {
    return this.state.currentNode;
  };

  Tree.prototype.setCurrentNode = function setCurrentNode(node) {
    require_condition(node != null);

    var _props = this.props,
        onCurrentChange = _props.onCurrentChange,
        onNodeClicked = _props.onNodeClicked;

    this.store.setCurrentNode(node);
    this.setState({
      currentNode: node
    }, function () {
      var nodeModel = node.props.nodeModel;
      onCurrentChange(nodeModel.data, node);
      onNodeClicked(nodeModel.data, node);
    });
  };

  Tree.prototype.closeSiblings = function closeSiblings(exclude) {
    var accordion = this.props.accordion;

    if (!accordion) return;
    if (!this.root.childNodes || !this.root.childNodes.length) return;

    this.root.childNodes.filter(function (e) {
      return e !== exclude;
    }).forEach(function (e) {
      return e.collapse();
    });
    this.refresh();
  };

  Tree.prototype.render = function render() {
    var _this2 = this;

    var _props2 = this.props,
        options = _props2.options,
        renderContent = _props2.renderContent,
        highlightCurrent = _props2.highlightCurrent,
        isShowCheckbox = _props2.isShowCheckbox,
        onCheckChange = _props2.onCheckChange,
        onNodeClicked = _props2.onNodeClicked,
        emptyText = _props2.emptyText;


    var renderEmptyText = function renderEmptyText() {
      if (!_this2.root.childNodes || _this2.root.childNodes.length === 0) {
        return React.createElement(
          'div',
          { className: 'el-tree__empty-block' },
          React.createElement(
            'span',
            { className: 'el-tree__empty-text' },
            emptyText
          )
        );
      } else return null;
    };

    return React.createElement(
      'div',
      {
        style: this.style(),
        className: this.className('el-tree', {
          'el-tree--highlight-current': highlightCurrent
        })
      },
      this.root.childNodes.map(function (e, idx) {
        return React.createElement(Node, {
          ref: 'cnode',
          key: _this2.getNodeKey(e, idx),
          nodeModel: e,
          options: options,
          renderContent: renderContent,
          treeNode: _this2,
          parent: _this2,
          isShowCheckbox: isShowCheckbox,
          onCheckChange: onCheckChange
        });
      }),
      renderEmptyText()
    );
  };

  _createClass(Tree, [{
    key: 'root',
    get: function get() {
      return this.state.store.root;
    }
  }, {
    key: 'store',
    get: function get() {
      return this.state.store;
    }
  }]);

  return Tree;
}(Component);

export default Tree;


Tree.propTypes = {
  autoExpandParent: PropTypes.bool,
  checkStrictly: PropTypes.bool,
  currentNodeKey: PropTypes.any,
  defaultCheckedKeys: PropTypes.array,
  defaultExpandedKeys: PropTypes.array,
  defaultExpandAll: PropTypes.bool,
  data: PropTypes.array,
  emptyText: PropTypes.string,
  expandOnClickNode: PropTypes.bool,
  filterNodeMethod: PropTypes.func,
  renderContent: PropTypes.func,
  isShowCheckbox: PropTypes.bool,
  accordion: PropTypes.bool,
  indent: PropTypes.number,
  nodeKey: PropTypes.string,
  options: PropTypes.shape({
    children: PropTypes.string,
    label: PropTypes.string,
    icon: PropTypes.string
  }), //equal to props in vue element
  lazy: PropTypes.bool, //todo: check this
  highlightCurrent: PropTypes.bool,
  // (f:(resolve, reject)=>Unit)=>Unit
  load: PropTypes.func,
  //
  onCheckChange: PropTypes.func,
  // todo: 这个地方需要改下， 现在是current和nodeclick一起被设置上了
  // (nodeModel.data, node)=>Unit
  onNodeClicked: PropTypes.func,
  // (nodeModel.data, node)=>Unit
  onCurrentChange: PropTypes.func,
  // (nodeModel.data, nodeModel, Node)=>Unit
  onNodeExpand: PropTypes.func,
  onNodeCollapse: PropTypes.func
};

Tree.defaultProps = {
  autoExpandParent: true,
  defaultCheckedKeys: [],
  defaultExpandedKeys: [],
  data: [],
  expandOnClickNode: true,
  emptyText: Locale.t('el.tree.emptyText'),
  indent: 16,
  options: { children: 'children', label: 'label', icon: 'icon' },
  onCheckChange: function onCheckChange() {},
  onNodeClicked: function onNodeClicked() {},
  onCurrentChange: function onCurrentChange() {},
  onNodeExpand: function onNodeExpand() {},
  onNodeCollapse: function onNodeCollapse() {}
};