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
  // key 是node.val value是node
  let nodes = new Map();
  // key 是node.val value表示对应值是否有父节点
  let inMap = new Map();
  for (let [parent, child, isLeft] of descriptions) {
    if (!nodes.has(parent)) {
      nodes.set(parent, new TreeNode(parent));
    }
    if (!nodes.has(child)) {
      nodes.set(child, new TreeNode(child));
    }
    let curNode = nodes.get(parent);
    if (isLeft == 1) {
      curNode.left = nodes.get(child);
    } else {
      curNode.right = nodes.get(child);
    }
    inMap.set(child, true);
  }
  for (let [key, node] of nodes) {
    if (!inMap.has(key)) return node;
  }
  return null;
};
