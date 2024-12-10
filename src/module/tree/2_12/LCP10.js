/**
 * @param {TreeNode} root
 * @return {number}
 */
var minimalExecTime = function (root) {
  const dfs = (root) => {
    if (root == null) return [0, 0];
    // 左子树的所有任务的时间和为 S1，进行最优并行化后执行时间为 T1
    let [s1, t1] = dfs(root.left);
    // 右子树的所有任务的时间和为 S2，进行最优并行化后执行时间为 T2
    let [s2, t2] = dfs(root.right);
    return [s1 + s2 + root.val, Math.max(t1, t2, (s1 + s2) / 2) + root.val];
  };
  return dfs(root)[1];
};
