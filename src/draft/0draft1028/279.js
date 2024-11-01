const N = 101;
/* let memo = Array.from({ length: N }, () => new Array(N * N).fill(-1));
// 从前i个完全平方数中选出和为j的最小数量
const dfs = (i, j) => {
  if (i == 0) {
    return j == 0 ? 0 : Infinity;
  }
  if (memo[i][j] != -1) return memo[i][j];
  if (j < i * i) {
    return (memo[i][j] = dfs(i - 1, j));
  }
  return (memo[i][j] = Math.min(dfs(i - 1, j), dfs(i, j - i * i) + 1));
}; */
const N = 10000;

let dp = Array.from({ length: 101 }, () => new Array(N + 1).fill(Infinity));
dp[0][0] = 0;
for (let i = 1; i * i <= N; i++) {
  for (let j = 0; j <= N; j++) {
    if (j < i * i) {
      dp[i][j] = dp[i - 1][j];
    } else {
      dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - i * i] + 1);
    }
  }
}
/**
 * @param {number} n
 * @return {number}
 */
var numSquares = function (n) {
  // 返回 和为 n 的完全平方数的最少数量 。
  // return dfs(Math.floor(Math.sqrt(n)), n);
  return dp[Math.floor(Math.sqrt(n))][n];
};






const N = 10000;
let dp = new Array(N + 1).fill(Infinity);
dp[0] = 0;
for (let i = 1; i * i <= N; i++) {
  for (let j = 0; j <= N; j++) {
    if (j < i * i) {
      dp[j] = dp[j];
    } else {
      dp[j] = Math.min(dp[j], dp[j - i * i] + 1);
    }
  }
}
/**
 * @param {number} n
 * @return {number}
 */
var numSquares = function (n) {
  // 返回 和为 n 的完全平方数的最少数量 。
  // return dfs(Math.floor(Math.sqrt(n)), n);
  return dp[n];
};