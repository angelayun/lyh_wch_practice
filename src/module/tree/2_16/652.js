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
 * @return {TreeNode[]}
 */
var findDuplicateSubtrees = function (root) {
  let map = new Map();
  let res = [];
  const dfs = (root) => {
    if (root == null) return '#';
    let left = dfs(root.left);
    let right = dfs(root.right);
    // 后序遍历的序列值
    let key = root.val + left + right;
    let freq = map.get(key) || 0;
    if (freq == 1) {
      // 如果出现过一次 就是重复的  （因为重复的我们只加1个  不需要加多个）
      res.push(root);
    }
    map.set(key, freq + 1);
    return key;
  };
  dfs(root);
  return res;
};
