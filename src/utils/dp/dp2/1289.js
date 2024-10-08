/**
 * @param {number[][]} grid
 * @return {number}
 */
var minFallingPathSum = function (grid) {
  /* const m = grid.length, n = grid[0].length
  const dp = Array.from({ length: m }, () => new Array(n).fill(Number.MAX_SAFE_INTEGER))
  for (let j = 0; j < n; j++) {
    dp[0][j] = grid[0][j]
  }
  for (let i = 1; i < m; i++) {
    for (let j = 0; j < n; j++) {
      for (let k = 0; k < n; k++) {
        if (k == j) continue
        dp[i][j] = Math.min(dp[i - 1][k] + grid[i][j], dp[i][j])
      }
      // 不要放在里面求ans 因为如果只有一行的情况就不对了
    }
  }
  return Math.min(...dp[m - 1]) */

  const m = grid.length, n = grid[0].length
  const dp = Array.from({ length: 2 }, () => new Array(n).fill(Number.MAX_SAFE_INTEGER))
  for (let j = 0; j < n; j++) {
    dp[0][j] = grid[0][j]
  }
  for (let i = 1; i < m; i++) {
    for (let j = 0; j < n; j++) {
      for (let k = 0; k < n; k++) {
        if (k == j) continue
        dp[i % 2][j] = Math.min(dp[(i - 1) % 2][k] + grid[i][j], dp[i % 2][j])
      }
      // 不要放在里面求ans 因为如果只有一行的情况就不对了
    }
  }
  return Math.min(...dp[1])
};