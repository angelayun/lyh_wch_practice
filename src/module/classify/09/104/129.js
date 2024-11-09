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
 * @return {number}
 */
var sumNumbers = function (root) {
  let ans = 0;
  const dfs = (root, num) => {
    if (root == null) return;
    num *= 10;
    num += root.val;
    if (root.left == root.right) {
      ans += num;
      // 这里最好写个return
      return;
    }
    dfs(root.left, num);
    dfs(root.right, num);
  };
  dfs(root, 0);
  return ans;
};

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
 * @return {number}
 */
var sumNumbers = function (root, x = 0) {
  if (root === null) {
    return 0;
  }
  x = x * 10 + root.val;
  if (root.left === root.right) {
    // root 是叶子节点
    return x;
  }
  return sumNumbers(root.left, x) + sumNumbers(root.right, x);
};
