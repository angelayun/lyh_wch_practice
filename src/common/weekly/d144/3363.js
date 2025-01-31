/**
 * @param {number[][]} fruits
 * @return {number}
 */
var maxCollectedFruits = function (fruits) {
  const n = fruits.length;
  let memo = Array.from({ length: n }, () => new Array(n).fill(-1));
  let ans = 0;
  // 对角线的值
  for (let i = 0; i < n; i++) {
    ans += fruits[i][i];
  }
  const dfs = (i, j) => {
    // 如果从 (0,n−1) 出发，即使每一步都往左下走，i+j 也不会低于 n−1，所以在递归的过程中要满足 j≥n−1−i
    if (j < n - 1 - i || j >= n) {
      return Number.MIN_SAFE_INTEGER;
    }
    if (i == 0) return fruits[i][j];
    if (memo[i][j] != -1) return memo[i][j];
    return (memo[i][j] =
      Math.max(dfs(i - 1, j - 1), dfs(i - 1, j), dfs(i - 1, j + 1)) +
      fruits[i][j]);
  };
  // 从右上角 (0,n−1) 出发，在不访问主对角线的情况下，走到 (n−2,n−1)，也就是右下角的上面那个格子，所能收集到的水果总数的最大值。
  ans += dfs(n - 2, n - 1);
  // 把下三角中的数据填到上三角中
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < i; j++) {
      fruits[j][i] = fruits[i][j];
    }
  }
  memo = Array.from({ length: n }, () => new Array(n).fill(-1));
  return ans + dfs(n - 2, n - 1);
};
