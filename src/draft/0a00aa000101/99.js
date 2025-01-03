/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {void} Do not return anything, modify root in-place instead.
 */
var recoverTree = function (root) {
  let firstNode, secondNode;
  let pre;
  const dfs = (root) => {
    if (root == null) return;
    dfs(root.left);
    if (pre && root.val < pre.val) {
      if (firstNode == null) firstNode = pre;
      secondNode = root;
    }
    pre = root;
    dfs(root.right);
  };
  dfs(root);
  [firstNode.val, secondNode.val] = [secondNode.val, firstNode.val];
  return root;
};
