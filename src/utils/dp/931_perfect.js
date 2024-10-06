/**
 * @param {number[][]} matrix
 * @return {number}
 */
var minFallingPathSum = function (matrix) {
  let rows = matrix.length, cols = matrix[0].length
  /*   // 这里的memo的初始值不能为-1
    let memo = Array.from({ length: rows }, () => new Array(cols).fill(Number.MIN_SAFE_INTEGER))
    const dfs = (i, j) => {
      // 越界了
      if (j < 0 || j >= cols) return Number.MAX_SAFE_INTEGER
      if (i == 0) return matrix[i][j]
      if (memo[i][j] != Number.MIN_SAFE_INTEGER) return memo[i][j]
      return memo[i][j] = matrix[i][j] + Math.min(
        dfs(i - 1, j),
        dfs(i - 1, j + 1),
        dfs(i - 1, j - 1)
      )
    }
    let ans = Number.MAX_SAFE_INTEGER
    for (let i = 0; i < cols; i++) {
      // 最后一行的最小值
      ans = Math.min(ans, dfs(rows - 1, i))
    }
    return ans */
  /* let dp = Array.from({ length: rows }, () => new Array(cols + 2).fill(Infinity))
  dp[0] = [Infinity, ...matrix[0], Infinity]
  for (let i = 1; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      dp[i][j + 1] = Math.min(
        dp[i - 1][j + 1],
        dp[i - 1][j + 2],
        dp[i - 1][j]
      ) + matrix[i][j]
    }
  } */
  let dp = Array.from({ length: 2 }, () => new Array(cols + 2).fill(Infinity))
  dp[0] = [Infinity, ...matrix[0], Infinity]
  for (let i = 1; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      dp[i % 2][j + 1] = Math.min(
        dp[(i - 1) % 2][j + 1],
        dp[(i - 1) % 2][j + 2],
        dp[(i - 1) % 2][j]
      ) + matrix[i][j]
    }
  }
  let ans = Math.min(...dp[rows - 1])
  return ans
};