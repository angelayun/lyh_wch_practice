/**
 * @param {TreeNode} root
 * @return {number}
 */
var sumEvenGrandparent = function (root) {
  let sum = 0;
  const dfs = (root, parent, ancestor) => {
    if (root == null) return;
    if (ancestor % 2 == 0) {
      sum += root.val;
    }
    dfs(root.left, root.val, parent);
    dfs(root.right, root.val, parent);
  };
  dfs(root, -1, -1);
  return sum;
};
