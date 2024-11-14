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
var minDepth = function (root) {
  let ans = Number.MAX_SAFE_INTEGER;
  const dfs = (root, depth) => {
    if (root == null) {
      return;
    }
    depth++;
    if (root.left == root.right) {
      ans = Math.min(depth, ans);
    }
    dfs(root.left, depth);
    dfs(root.right, depth);
  };
  dfs(root, 0);
  return ans == Number.MAX_SAFE_INTEGER ? 0 : ans;
};
var minDepth = function (root) {
  let ans = Number.MAX_SAFE_INTEGER;
  const dfs = (root, depth) => {
    if (root == null || ans < ++depth) {
      return;
    }
    if (root.left == root.right) {
      ans = Math.min(depth, ans);
    }
    dfs(root.left, depth);
    dfs(root.right, depth);
  };
  dfs(root, 0);
  return ans == Number.MAX_SAFE_INTEGER ? 0 : ans;
};
// 我的天  这里我错的不是一丁半点啊
/* var minDepth = function (root) {
  if (root == null) return 0;
  let leftDepth = minDepth(root.left);
  let rightDepth = minDepth(root.right);
  return Math.min(leftDepth, rightDepth) + 1;
}; */

var minDepth = function (root) {
  if (root == null) return 0;
  if (root.left == null) return minDepth(root.right) + 1;
  if (root.right == null) return minDepth(root.left) + 1;
  return Math.min(minDepth(root.left), minDepth(root.right)) + 1;
};
