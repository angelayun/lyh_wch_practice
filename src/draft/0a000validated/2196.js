/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[][]} descriptions
 * @return {TreeNode}
 */
var createBinaryTree = function (descriptions) {
  let nodes = new Map();
  let inMap = new Map();
  for (let [parent, child, isLeft] of descriptions) {
    if (!nodes.has(parent)) {
      nodes.set(parent, new TreeNode(parent));
    }
    if (!nodes.has(child)) {
      nodes.set(child, new TreeNode(child));
    }
    let parentNode = nodes.get(parent);
    if (isLeft) {
      parentNode.left = nodes.get(child);
    } else {
      parentNode.right = nodes.get(child);
    }
    inMap.set(child, true);
  }
  for (let key of nodes.keys()) {
    if (!inMap.has(key)) {
      return nodes.get(key);
    }
  }
};
