'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _debounce = require('throttle-debounce/debounce');

var _debounce2 = _interopRequireDefault(_debounce);

var _libs = require('../../libs');

var _utils = require('../../libs/utils');

var _checkbox = require('../checkbox');

var _checkbox2 = _interopRequireDefault(_checkbox);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function NodeContent(_ref) {
  var context = _ref.context,
      renderContent = _ref.renderContent;
  var _context$props = context.props,
      nodeModel = _context$props.nodeModel,
      treeNode = _context$props.treeNode;


  if (typeof renderContent === 'function') {
    return renderContent(nodeModel, nodeModel.data, treeNode.store);
  } else {
    return _react2.default.createElement(
      'span',
      { className: 'el-tree-node__label' },
      nodeModel.label
    );
  }
}

NodeContent.propTypes = {
  renderContent: _libs.PropTypes.func,
  context: _libs.PropTypes.object.isRequired
};

var Node = function (_Component) {
  (0, _inherits3.default)(Node, _Component);

  function Node(props) {
    (0, _classCallCheck3.default)(this, Node);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Node.__proto__ || Object.getPrototypeOf(Node)).call(this, props));

    _this.state = {
      childNodeRendered: false,
      isShowCheckbox: false
    };
    _this.state.isShowCheckbox = props.treeNode.isShowCheckbox;

    _this.oldChecked = false;
    _this.oldIndeterminate = false;
    _this.idGen = new _utils.IDGenerator();
    return _this;
  }

  (0, _createClass3.default)(Node, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this,
          _watchers;

      var nodeModel = this.props.nodeModel;
      var childrenKey = this.props.options.children || 'children';

      var triggerChange = (0, _debounce2.default)(20, function () {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        if (_this2.isDeconstructed) return;
        _this2.handleSelectChange.apply(_this2, args);
      });

      this.loadHandler = this.enhanceLoad(nodeModel);
      this.watchers = (_watchers = {}, (0, _defineProperty3.default)(_watchers, this.idGen.next(), (0, _utils.watchPropertyChange)(nodeModel, 'indeterminate', function (value) {
        triggerChange(nodeModel.checked, value);
      })), (0, _defineProperty3.default)(_watchers, this.idGen.next(), (0, _utils.watchPropertyChange)(nodeModel, 'checked', function (value) {
        triggerChange(value, nodeModel.indeterminate);
      })), (0, _defineProperty3.default)(_watchers, this.idGen.next(), (0, _utils.watchPropertyChange)(nodeModel, 'loading', function () {
        _this2.setState({});
      })), _watchers);

      if (nodeModel.data != null) {
        this.watchers[this.idGen.next()] = (0, _utils.watchPropertyChange)(nodeModel.data, childrenKey, function () {
          nodeModel.updateChildren();
          _this2.setState({}); //force update view
        });
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.loadHandler();
      // clear watchs
      for (var w in this.watchers) {
        if (this.watchers[w]) {
          this.watchers[w]();
        }
      }
      this.isDeconstructed = true;
    }
  }, {
    key: 'enhanceLoad',
    value: function enhanceLoad(nodeModel) {
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
    }
  }, {
    key: 'handleSelectChange',
    value: function handleSelectChange(checked, indeterminate) {
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
    }
  }, {
    key: 'getNodeKey',
    value: function getNodeKey(node, otherwise) {
      var nodeKey = this.props.nodeKey;
      if (nodeKey && node) {
        return node.data[nodeKey];
      }
      return otherwise;
    }
  }, {
    key: 'handleClick',
    value: function handleClick(evt) {
      if (evt) evt.stopPropagation();
      var _props2 = this.props,
          nodeModel = _props2.nodeModel,
          treeNode = _props2.treeNode;


      treeNode.setCurrentNode(this);
      if (treeNode.props.expandOnClickNode) {
        this.handleExpandIconClick();
      }
    }
  }, {
    key: 'handleExpandIconClick',
    value: function handleExpandIconClick(evt) {
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
    }
  }, {
    key: 'closeSiblings',
    value: function closeSiblings(exclude) {
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
    }
  }, {
    key: 'refresh',
    value: function refresh() {
      this.setState({});
    }
  }, {
    key: 'handleUserClick',
    value: function handleUserClick() {
      var _props$treeNode = this.props.treeNode,
          nodeModel = _props$treeNode.nodeModel,
          checkStrictly = _props$treeNode.checkStrictly;

      if (nodeModel.indeterminate) {
        nodeModel.setChecked(nodeModel.checked, !checkStrictly);
      }
    }
  }, {
    key: 'handleCheckChange',
    value: function handleCheckChange(checked) {
      this.props.nodeModel.setChecked(checked, true);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this5 = this;

      var childNodeRendered = this.state.childNodeRendered;
      var _props5 = this.props,
          treeNode = _props5.treeNode,
          nodeModel = _props5.nodeModel,
          renderContent = _props5.renderContent,
          isShowCheckbox = _props5.isShowCheckbox;


      var expanded = nodeModel.expanded;

      return _react2.default.createElement(
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
        _react2.default.createElement(
          'div',
          {
            className: 'el-tree-node__content',
            style: { paddingLeft: (nodeModel.level - 1) * treeNode.props.indent + 'px' }
          },
          _react2.default.createElement('span', {
            className: this.classNames('el-tree-node__expand-icon', {
              'is-leaf': nodeModel.isLeaf,
              expanded: !nodeModel.isLeaf && expanded
            }),
            onClick: this.handleExpandIconClick.bind(this)
          }),
          isShowCheckbox && _react2.default.createElement(_checkbox2.default, {
            checked: nodeModel.checked,
            onChange: this.handleCheckChange.bind(this),
            indeterminate: nodeModel.indeterminate,
            onClick: this.handleUserClick.bind(this)
          }),
          nodeModel.loading && _react2.default.createElement(
            'span',
            { className: 'el-tree-node__loading-icon el-icon-loading' },
            ' '
          ),
          _react2.default.createElement(NodeContent, {
            nodeModel: nodeModel,
            renderContent: treeNode.props.renderContent,
            context: this
          })
        ),
        _react2.default.createElement(
          _libs.CollapseTransition,
          { isShow: expanded, ref: 'collapse' },
          _react2.default.createElement(
            'div',
            { className: 'el-tree-node__children' },
            nodeModel.childNodes.map(function (e, idx) {
              var props = Object.assign({}, _this5.props, { nodeModel: e, parent: _this5 });
              return _react2.default.createElement(Node, (0, _extends3.default)({}, props, { key: _this5.getNodeKey(e, idx) }));
            })
          )
        )
      );
    }
  }]);
  return Node;
}(_libs.Component);

var _default = Node;
exports.default = _default;


Node.propTypes = {
  nodeModel: _libs.PropTypes.object,
  options: _libs.PropTypes.object,
  treeNode: _libs.PropTypes.object.isRequired,
  isShowCheckbox: _libs.PropTypes.bool,
  onCheckChange: _libs.PropTypes.func
};

Node.defaultProps = {
  nodeModel: {},
  options: {},
  onCheckChange: function onCheckChange() {}
};
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(NodeContent, 'NodeContent', 'src/tree/Node.jsx');

  __REACT_HOT_LOADER__.register(Node, 'Node', 'src/tree/Node.jsx');

  __REACT_HOT_LOADER__.register(_default, 'default', 'src/tree/Node.jsx');
}();

;