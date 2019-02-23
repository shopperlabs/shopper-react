import _typeof from 'babel-runtime/helpers/typeof';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import Node from './node';
import { getNodeKey } from './util';

var TreeStore = function () {
  function TreeStore(options) {
    var _this = this;

    _classCallCheck(this, TreeStore);

    this.currentNode = null;
    this.currentNodeKey = null;

    for (var option in options) {
      if (options.hasOwnProperty(option)) {
        this[option] = options[option];
      }
    }

    this.nodesMap = {};

    this.root = new Node({
      data: this.data,
      store: this
    });

    if (this.lazy && this.load) {
      var loadFn = this.load;
      loadFn(this.root, function (data) {
        _this.root.doCreateChildren(data);
        _this._initDefaultCheckedNodes();
      });
    } else {
      this._initDefaultCheckedNodes();
    }
  }

  TreeStore.prototype.filter = function filter(value) {
    var filterNodeMethod = this.filterNodeMethod;
    var traverse = function traverse(node) {
      var childNodes = node.root ? node.root.childNodes : node.childNodes;

      childNodes.forEach(function (child) {
        child.visible = filterNodeMethod.call(child, value, child.data, child);

        traverse(child);
      });

      if (!node.visible && childNodes.length) {
        var allHidden = true;

        childNodes.forEach(function (child) {
          if (child.visible) allHidden = false;
        });

        if (node.root) {
          node.root.visible = allHidden === false;
        } else {
          node.visible = allHidden === false;
        }
      }

      if (node.visible && !node.isLeaf) node.expand();
    };
    traverse(this);
  };

  TreeStore.prototype.setData = function setData(newVal) {
    var instanceChanged = newVal !== this.root.data;
    this.root.setData(newVal);
    if (instanceChanged) {
      this._initDefaultCheckedNodes();
    }
  };

  TreeStore.prototype.getNode = function getNode(data) {
    var key = (typeof data === 'undefined' ? 'undefined' : _typeof(data)) !== 'object' ? data : getNodeKey(this.key, data);
    return this.nodesMap[key];
  };

  TreeStore.prototype.insertBefore = function insertBefore(data, refData) {
    var refNode = this.getNode(refData);
    refNode.parent.insertBefore({ data: data }, refNode);
  };

  TreeStore.prototype.insertAfter = function insertAfter(data, refData) {
    var refNode = this.getNode(refData);
    refNode.parent.insertAfter({ data: data }, refNode);
  };

  TreeStore.prototype.remove = function remove(data) {
    var node = this.getNode(data);
    if (node) {
      node.parent.removeChild(node);
    }
  };

  TreeStore.prototype.append = function append(data, parentData) {
    var parentNode = parentData ? this.getNode(parentData) : this.root;

    if (parentNode) {
      parentNode.insertChild({ data: data });
    }
  };

  TreeStore.prototype._initDefaultCheckedNodes = function _initDefaultCheckedNodes() {
    var _this2 = this;

    var defaultCheckedKeys = this.defaultCheckedKeys || [];
    var nodesMap = this.nodesMap;

    defaultCheckedKeys.forEach(function (checkedKey) {
      var node = nodesMap[checkedKey];

      if (node) {
        node.setChecked(true, !_this2.checkStrictly);
      }
    });
  };

  TreeStore.prototype._initDefaultCheckedNode = function _initDefaultCheckedNode(node) {
    var defaultCheckedKeys = this.defaultCheckedKeys || [];

    if (defaultCheckedKeys.indexOf(node.key) !== -1) {
      node.setChecked(true, !this.checkStrictly);
    }
  };

  TreeStore.prototype.setDefaultCheckedKey = function setDefaultCheckedKey(newVal) {
    if (newVal !== this.defaultCheckedKeys) {
      this.defaultCheckedKeys = newVal;
      this._initDefaultCheckedNodes();
    }
  };

  TreeStore.prototype.registerNode = function registerNode(node) {
    var key = this.key;
    if (!key || !node || !node.data) return;

    var nodeKey = node.key;
    if (nodeKey !== undefined) this.nodesMap[node.key] = node;
  };

  TreeStore.prototype.deregisterNode = function deregisterNode(node) {
    var key = this.key;
    if (!key || !node || !node.data) return;

    delete this.nodesMap[node.key];
  };

  TreeStore.prototype.getCheckedNodes = function getCheckedNodes() {
    var leafOnly = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    var checkedNodes = [];
    var traverse = function traverse(node) {
      var childNodes = node.root ? node.root.childNodes : node.childNodes;

      childNodes.forEach(function (child) {
        if (!leafOnly && child.checked || leafOnly && child.isLeaf && child.checked) {
          checkedNodes.push(child.data);
        }

        traverse(child);
      });
    };

    traverse(this);

    return checkedNodes;
  };

  TreeStore.prototype.getCheckedKeys = function getCheckedKeys() {
    var leafOnly = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    var key = this.key;
    var allNodes = this._getAllNodes();
    var keys = [];
    allNodes.forEach(function (node) {
      if (!leafOnly || leafOnly && node.isLeaf) {
        if (node.checked) {
          keys.push((node.data || {})[key]);
        }
      }
    });
    return keys;
  };

  TreeStore.prototype._getAllNodes = function _getAllNodes() {
    var allNodes = [];
    var nodesMap = this.nodesMap;
    for (var nodeKey in nodesMap) {
      if (nodesMap.hasOwnProperty(nodeKey)) {
        allNodes.push(nodesMap[nodeKey]);
      }
    }

    return allNodes;
  };

  TreeStore.prototype._setCheckedKeys = function _setCheckedKeys(key) {
    var _this3 = this;

    var leafOnly = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var checkedKeys = arguments[2];

    var allNodes = this._getAllNodes();
    allNodes.sort(function (a, b) {
      return b.level - a.level;
    });

    var keys = Object.keys(checkedKeys);
    allNodes.forEach(function (node) {
      var checked = keys.indexOf(node.data[key] + '') > -1;

      if (!node.isLeaf) {
        if (!_this3.checkStrictly) {
          var childNodes = node.childNodes;

          var all = true;
          var none = true;

          for (var i = 0, j = childNodes.length; i < j; i++) {
            var child = childNodes[i];
            if (child.checked !== true || child.indeterminate) {
              all = false;
            }
            if (child.checked !== false || child.indeterminate) {
              none = false;
            }
          }

          if (all) {
            node.setChecked(true, !_this3.checkStrictly);
          } else if (!all && !none) {
            checked = checked ? true : 'half';
            node.setChecked(checked, !_this3.checkStrictly && checked === true);
          } else if (none) {
            node.setChecked(checked, !_this3.checkStrictly);
          }
        } else {
          node.setChecked(checked, false);
        }

        if (leafOnly) {
          node.setChecked(false, false);
          var traverse = function traverse(node) {
            var childNodes = node.childNodes;

            childNodes.forEach(function (child) {
              if (!child.isLeaf) {
                child.setChecked(false, false);
              }
              traverse(child);
            });
          };

          traverse(node);
        }
      } else {
        node.setChecked(checked, false);
      }
    });
  };

  TreeStore.prototype.setCheckedNodes = function setCheckedNodes(array) {
    var leafOnly = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var key = this.key;
    var checkedKeys = {};
    array.forEach(function (item) {
      checkedKeys[(item || {})[key]] = true;
    });

    this._setCheckedKeys(key, leafOnly, checkedKeys);
  };

  TreeStore.prototype.setCheckedKeys = function setCheckedKeys(keys) {
    var leafOnly = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    this.defaultCheckedKeys = keys;
    var key = this.key;
    var checkedKeys = {};
    keys.forEach(function (key) {
      checkedKeys[key] = true;
    });

    this._setCheckedKeys(key, leafOnly, checkedKeys);
  };

  TreeStore.prototype.setDefaultExpandedKeys = function setDefaultExpandedKeys(keys) {
    var _this4 = this;

    keys = keys || [];
    this.defaultExpandedKeys = keys;

    keys.forEach(function (key) {
      var node = _this4.getNode(key);
      if (node) node.expand(null, _this4.autoExpandParent);
    });
  };

  TreeStore.prototype.setChecked = function setChecked(data, checked, deep) {
    var node = this.getNode(data);

    if (node) {
      node.setChecked(!!checked, deep);
    }
  };

  TreeStore.prototype.getCurrentNode = function getCurrentNode() {
    return this.currentNode;
  };

  TreeStore.prototype.setCurrentNode = function setCurrentNode(node) {
    this.currentNode = node;
  };

  TreeStore.prototype.setCurrentNodeKey = function setCurrentNodeKey(key) {
    var node = this.getNode(key);
    if (node) {
      this.currentNode = node;
    }
  };

  return TreeStore;
}();

export default TreeStore;