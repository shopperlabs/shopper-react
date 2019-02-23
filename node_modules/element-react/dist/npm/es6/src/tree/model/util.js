export var NODE_KEY = '$treeNodeId';

export var markNodeData = function markNodeData(node, data) {
  if (data[NODE_KEY]) return;
  Object.defineProperty(data, NODE_KEY, {
    value: node.id,
    enumerable: false,
    configurable: false,
    writable: false
  });
};

export var getNodeKey = function getNodeKey(key, data) {
  if (!key) return data[NODE_KEY];
  return data[key];
};