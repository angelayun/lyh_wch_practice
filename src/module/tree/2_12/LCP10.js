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
      Math.max(Math.max(t1, t2), (s1 + s2) / 2 + root.val),
    ];
  };
  return dfs(root)[1];
};
