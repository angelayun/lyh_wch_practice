/**
 * @param {number[]} a
 * @param {number[]} b
 * @return {number}
 */
var maxScore = function (a, b) {
  const n = b.length;
  let memo = Array.from({ length: n }, () => new Array(4).fill(-Infinity));
  const dfs = (i, j) => {
    // 选完了
    if (j < 0) return 0;
    // 没选完
    if (i < 0) return -Infinity;
    if (memo[i][j] != -Infinity) {
      return memo[i][j];
    }
    return (memo[i][j] = Math.max(
      dfs(i - 1, j),
      dfs(i - 1, j - 1) + a[j] * b[i]
    ));
  };
  let ans = dfs(n - 1, 3);
  return ans;
};
