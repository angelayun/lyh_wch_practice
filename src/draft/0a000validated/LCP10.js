/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var minimalExecTime = function (root) {
  const dfs = (root) => {
    if (root == null) return [0, 0];
    let [s1, t1] = dfs(root.left);
    let [s2, t2] = dfs(root.right);
    return [
      s1 + s2 + root.val,
      // 这里可以合成一个Math.max
      Math.max((s1 + s2) / 2, Math.max(t1, t2)) + root.val,
    ];
  };
  return dfs(root)[1];
};
