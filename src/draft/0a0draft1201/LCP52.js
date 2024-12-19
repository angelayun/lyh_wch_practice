/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number[][]} ops
 * @return {number}
 */
var getNumber = function (root, ops) {
  let ans = 0;
  const n = ops.length;
  const check = (root) => {
    for (let i = n - 1; i >= 0; i--) {
      const [type, x, y] = ops[i];
      if (type == 1 && root.val >= x && root.val <= y) {
        ans++;
        break;
      }
      if (type == 0 && root.val >= x && root.val <= y) {
        break;
      }
    }
  };
  const dfs = (root) => {
    if (root == null) return;
    dfs(root.left);
    check(root);
    dfs(root.right);
  };
  dfs(root);
  return ans;
};
