/**
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
var maxValue = function (root, k) {
  const dfs = (root, k) => {
    // f[i],(0≤i≤k) 表示以该节点为根，相邻的子节点为 蓝色 的个数为 i 的情况下（包括自身），节点价值总和的最大值
    const f = new Array(k + 1).fill(0);
    if (root == null) return f;
    const l = dfs(root.left, k);
    const r = dfs(root.right, k);
    f[0] = Math.max(...l) + Math.max(...r);
    // i为总数 j为左子树的个数
    for (let i = 1; i <= k; i++) {
      for (let j = 0; j < i; j++) {
        // （如果i为1的话 那左右子树为蓝色个数都是0）  所以这里-1
        f[i] = Math.max(f[i], root.val + l[j] + r[i - j - 1]);
      }
    }
    return f;
  };
  return Math.max(...dfs(root, k));
};
