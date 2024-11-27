/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
var isSameTree = function (p, q) {
  if (p == null || q == null) return p == q;
  if (p.val != q.val) return false;
  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
};
/**
 * @param {TreeNode} root
 * @param {TreeNode} subRoot
 * @return {boolean}
 */
var isSubtree = function (root, subRoot) {
  let ans = false;
  const dfs = (root) => {
    if (root == null || ans) return;
    if (isSameTree(root, subRoot)) {
      ans = true;
      return;
    }
    dfs(root.left);
    dfs(root.right);
  };
  dfs(root);
  return ans;
};

var isSubtree = function (root, subRoot) {
  if (root == null) return false;
  return (
    isSameTree(root, subRoot) ||
    isSubtree(root.left, subRoot) ||
    isSubtree(root.right, subRoot)
  );
};
