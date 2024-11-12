/**
 * @param {number} n
 * @param {number[]} cuts
 * @return {number}
 */
var minCost = function (n, cuts) {
  cuts.push(0);
  cuts.push(n);
  cuts.sort((a, b) => a - b);
  const m = cuts.length;
  const memo = Array.from({ length: m }, () => new Array(m));
  const dfs = (i, j) => {
    if (i + 1 == j) return 0;
    if (memo[i][j] != null) return memo[i][j];
    let res = Number.MAX_SAFE_INTEGER;
    for (let k = i + 1; k < j; k++) {
      res = Math.min(res, dfs(i, k) + dfs(k, j));
    }
    return (memo[i][j] = res + cuts[j] - cuts[i]);
  };
  return dfs(0, m - 1);
};

/**
 * @param {number} n
 * @param {number[]} cuts
 * @return {number}
 */
var minCost = function (n, cuts) {
  cuts.push(0);
  cuts.push(n);
  cuts.sort((a, b) => a - b);
  const m = cuts.length;
  const dp = Array.from({ length: m }, () => new Array(m).fill(0));
  for (let i = m - 3; i >= 0; i--) {
    for (let j = i + 2; j < m; j++) {
      let res = Number.MAX_SAFE_INTEGER;
      for (let k = i + 1; k < j; k++) {
        res = Math.min(res, dp[i][k] + dp[k][j]);
      }
      dp[i][j] = res + cuts[j] - cuts[i];
    }
  }
  return dp[0][m - 1];
};
