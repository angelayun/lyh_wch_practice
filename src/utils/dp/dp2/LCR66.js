/**
 * @param {number[][]} frame
 * @return {number}
 */
var jewelleryValue = function (frame) {
  let rows = frame.length, cols = frame[0].length
  /* let memo = Array.from({ length: rows }, () => new Array(cols).fill(-1))
  const dfs = (i, j) => {
    if (i < 0 || j < 0) return 0
    if (memo[i][j] != -1) return memo[i][j]
    return memo[i][j] = Math.max(dfs(i - 1, j), dfs(i, j - 1)) + frame[i][j]
  }
  return dfs(rows - 1, cols - 1) */
  /* let dp = Array.from({ length: rows + 1 }, () => new Array(cols + 1).fill(0))
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      dp[i + 1][j + 1] = Math.max(dp[i][j + 1], dp[i + 1][j]) + frame[i][j]
    }
  }
  return dp[rows][cols] */
  /* let dp = Array.from({ length: 2 }, () => new Array(cols + 1).fill(0))
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      dp[(i + 1) % 2][j + 1] = Math.max(dp[i % 2][j + 1], dp[(i + 1) % 2][j]) + frame[i][j]
    }
  }
  return dp[rows % 2][cols] */
  /* let dp = new Array(cols + 1).fill(0)
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      dp[j + 1] = Math.max(dp[j + 1], dp[j]) + frame[i][j]
    }
  }
  return dp[cols] */
  // 增加原地修改的方式
  let f = frame[0]
  for (let j = 1; j < cols; j++) {
    f[j] += f[j - 1]
  }
  for (let i = 1; i < rows; i++) {
    f[0] += frame[i][0]
  }
};