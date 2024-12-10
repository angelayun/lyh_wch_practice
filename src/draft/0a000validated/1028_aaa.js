/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {string} traversal
 * @return {TreeNode}
 */
var recoverFromPreorder = function (traversal) {
  let map = new Map();
  map.set(-1, new TreeNode(-1));
  const addTree = (depth, v) => {
    map.set(depth, new TreeNode(v));
    let rootNode = map.get(depth - 1);
    if (rootNode.left == null) {
      rootNode.left = map.get(depth);
    } else {
      rootNode.right = map.get(depth);
    }
  };
  let depth = 0,
    val = '';
  for (let c of traversal) {
    if (c != '#') {
      val += c;
    } else if (val) {
      addTree(depth, val);
      val = '';
      depth = 1;
    } else {
      depth++;
    }
  }
  addTree(depth, val);
  return map.get(0);
};
