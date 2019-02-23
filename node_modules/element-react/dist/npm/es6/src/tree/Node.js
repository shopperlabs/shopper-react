import _extends from 'babel-runtime/helpers/extends';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import debounce from 'throttle-debounce/debounce';

import { PropTypes, Component, CollapseTransition } from '../../libs';
import { watchPropertyChange, IDGenerator } from '../../libs/utils';
import Checkbox from '../checkbox';

function NodeContent(_ref) {
  var context = _ref.context,
      renderContent = _ref.renderContent;
  var _context$props = context.props,
      nodeModel = _context$props.nodeModel,
      treeNode = _context$props.treeNode;


  if (typeof renderContent === 'function') {
    return renderContent(nodeModel, nodeModel.data, treeNode.store);
  } else {
    return React.createElement(
      'span',
      { className: 'el-tree-node__label' },
      nodeModel.label
    );
  }
}

NodeContent.propTypes = {
  renderContent: PropTypes.func,
  context: PropTypes.object.isRequired
};

var Node = function (_Component) {
  _inherits(Node, _Component);

  function Node(props) {
    _classCallCheck(this, Node);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.state = {
      childNodeRendered: false,
      isShowCheckbox: false
    };
    _this.state.isShowCheckbox = props.treeNode.isShowCheckbox;

    _this.oldChecked = false;
    _this.oldIndeterminate = false;
    _this.idGen = new IDGenerator();
    return _this;
  }

  Node.prototype.componentDidMount = function componentDidMount() {
    var _this2 = this,
        _watchers;

    var nodeModel = this.props.nodeModel;
    var childrenKey = this.props.options.children || 'children';

    var triggerChange = debounce(20, function () {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      if (_this2.isDeconstructed) return;
      _this2.handleSelectChange.apply(_this2, args);
    });

    this.loadHandler = this.enhanceLoad(nodeModel);
    this.watchers = (_watchers = {}, _watchers[this.idGen.next()] = watchPropertyChange(nodeModel, 'indeterminate', function (value) {
      triggerChange(nodeModel.checked, value);
    }), _watchers[this.idGen.next()] = watchPropertyChange(nodeModel, 'checked', function (value) {
      triggerChange(value, nodeModel.indeterminate);
    }), _watchers[this.idGen.next()] = watchPropertyChange(nodeModel, 'loading', function () {
      _this2.setState({});
    }), _watchers);

    if (nodeModel.data != null) {
      this.watchers[this.idGen.next()] = watchPropertyChange(nodeModel.data, childrenKey, function () {
        nodeModel.updateChildren();
        _this2.setState({}); //force update view
      });
    }
  };

  Node.prototype.componentWillUnmount = function componentWillUnmount() {
    this.loadHandler();
    // clear watchs
    for (var w in this.watchers) {
      if (this.watchers[w]) {
        this.watchers[w]();
      }
    }
    this.isDeconstructed = true;
  };

  Node.prototype.enhanceLoad = function enhanceLoad(nodeModel) {
    var _this3 = this;

    var load = nodeModel.load;
    var enhanced = function enhanced() {
      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      load.apply(null, args);
      _this3.setState({});
    };
    nodeModel.load = enhanced;
    return function () {
      nodeModel.load = load;
    };
  };

  Node.prototype.handleSelectChange = function handleSelectChange(checked, indeterminate) {
    var _props = this.props,
        onCheckChange = _props.onCheckChange,
        nodeModel = _props.nodeModel;

    // !NOTE: 原码是 && 的关系，感觉有bug

    if (this.oldChecked !== checked || this.oldIndeterminate !== indeterminate) {
      onCheckChange(nodeModel.data, checked, indeterminate);
      this.setState({}); //force update
    }

    this.oldChecked = checked;
    this.oldIndeterminate = indeterminate;
  };

  Node.prototype.getNodeKey = function getNodeKey(node, otherwise) {
    var nodeKey = this.props.nodeKey;
    if (nodeKey && node) {
      return node.data[nodeKey];
    }
    return otherwise;
  };

  Node.prototype.handleClick = function handleClick(evt) {
    if (evt) evt.stopPropagation();
    var _props2 = this.props,
        nodeModel = _props2.nodeModel,
        treeNode = _props2.treeNode;


    treeNode.setCurrentNode(this);
    if (treeNode.props.expandOnClickNode) {
      this.handleExpandIconClick();
    }
  };

  Node.prototype.handleExpandIconClick = function handleExpandIconClick(evt) {
    var _this4 = this;

    if (evt) evt.stopPropagation();

    var _props3 = this.props,
        nodeModel = _props3.nodeModel,
        parent = _props3.parent;
    var _props$treeNode$props = this.props.treeNode.props,
        onNodeCollapse = _props$treeNode$props.onNodeCollapse,
        onNodeExpand = _props$treeNode$props.onNodeExpand;


    if (nodeModel.isLeaf) return;

    if (nodeModel.expanded) {
      nodeModel.collapse();
      this.refresh();
      onNodeCollapse(nodeModel.data, nodeModel, this);
    } else {
      nodeModel.expand(function () {
        _this4.setState({ childNodeRendered: true }, function () {
          onNodeExpand(nodeModel.data, nodeModel, _this4);
        });
        parent.closeSiblings(nodeModel);
      });
    }
  };

  Node.prototype.closeSiblings = function closeSiblings(exclude) {
    var _props4 = this.props,
        treeNode = _props4.treeNode,
        nodeModel = _props4.nodeModel;

    if (!treeNode.props.accordion) return;
    if (nodeModel.isLeaf || !nodeModel.childNodes || !nodeModel.childNodes.length) return;

    nodeModel.childNodes.filter(function (e) {
      return e !== exclude;
    }).forEach(function (e) {
      return e.collapse();
    });
    this.refresh();
  };

  Node.prototype.refresh = function refresh() {
    this.setState({});
  };

  Node.prototype.handleUserClick = function handleUserClick() {
    var _props$treeNode = this.props.treeNode,
        nodeModel = _props$treeNode.nodeModel,
        checkStrictly = _props$treeNode.checkStrictly;

    if (nodeModel.indeterminate) {
      nodeModel.setChecked(nodeModel.checked, !checkStrictly);
    }
  };

  Node.prototype.handleCheckChange = function handleCheckChange(checked) {
    this.props.nodeModel.setChecked(checked, true);
  };

  Node.prototype.render = function render() {
    var _this5 = this;

    var childNodeRendered = this.state.childNodeRendered;
    var _props5 = this.props,
        treeNode = _props5.treeNode,
        nodeModel = _props5.nodeModel,
        renderContent = _props5.renderContent,
        isShowCheckbox = _props5.isShowCheckbox;


    var expanded = nodeModel.expanded;

    return React.createElement(
      'div',
      {
        onClick: this.handleClick.bind(this),
        className: this.classNames('el-tree-node', {
          expanded: childNodeRendered && expanded,
          'is-current': treeNode.getCurrentNode() === this,
          'is-hidden': !nodeModel.visible
        }),
        style: { display: nodeModel.visible ? '' : 'none' }
      },
      React.createElement(
        'div',
        {
          className: 'el-tree-node__content',
          style: { paddingLeft: (nodeModel.level - 1) * treeNode.props.indent + 'px' }
        },
        React.createElement('span', {
          className: this.classNames('el-tree-node__expand-icon', {
            'is-leaf': nodeModel.isLeaf,
            expanded: !nodeModel.isLeaf && expanded
          }),
          onClick: this.handleExpandIconClick.bind(this)
        }),
        isShowCheckbox && React.createElement(Checkbox, {
          checked: nodeModel.checked,
          onChange: this.handleCheckChange.bind(this),
          indeterminate: nodeModel.indeterminate,
          onClick: this.handleUserClick.bind(this)
        }),
        nodeModel.loading && React.createElement(
          'span',
          { className: 'el-tree-node__loading-icon el-icon-loading' },
          ' '
        ),
        React.createElement(NodeContent, {
          nodeModel: nodeModel,
          renderContent: treeNode.props.renderContent,
          context: this
        })
      ),
      React.createElement(
        CollapseTransition,
        { isShow: expanded, ref: 'collapse' },
        React.createElement(
          'div',
          { className: 'el-tree-node__children' },
          nodeModel.childNodes.map(function (e, idx) {
            var props = Object.assign({}, _this5.props, { nodeModel: e, parent: _this5 });
            return React.createElement(Node, _extends({}, props, { key: _this5.getNodeKey(e, idx) }));
          })
        )
      )
    );
  };

  return Node;
}(Component);

export default Node;


Node.propTypes = {
  nodeModel: PropTypes.object,
  options: PropTypes.object,
  treeNode: PropTypes.object.isRequired,
  isShowCheckbox: PropTypes.bool,
  onCheckChange: PropTypes.func
};

Node.defaultProps = {
  nodeModel: {},
  options: {},
  onCheckChange: function onCheckChange() {}
};