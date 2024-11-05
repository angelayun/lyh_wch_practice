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
    if (root == null) return;
    depth++;
    if (root.left == root.right) {
      // 到达叶子节点
      ans = Math.min(ans, depth);
    }
    dfs(root.left, depth);
    dfs(root.right, depth);
  };
  dfs(root, 0);
  return ans == Number.MAX_SAFE_INTEGER ? 0 : ans;
};

// 这是在方法一的基础上进行的优化
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
    // 最优性剪枝  这个优化很棒
    if (root == null || ++depth >= ans) return;
    if (root.left == root.right) {
      // 到达叶子节点
      ans = Math.min(ans, depth);
    }
    dfs(root.left, depth);
    dfs(root.right, depth);
  };
  dfs(root, 0);
  return ans == Number.MAX_SAFE_INTEGER ? 0 : ans;
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
var minDepth = function (root) {
  // 这是至底向上的一种实现方式  很棒
  if (root == null) return 0;
  if (root.right == null) return minDepth(root.left) + 1;
  if (root.left == null) return minDepth(root.right) + 1;
  return Math.min(minDepth(root.left), minDepth(root.right)) + 1;
};
