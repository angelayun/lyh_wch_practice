/**
 * @param {number[][]} obstacleGrid
 * @return {number}
 */
var uniquePathsWithObstacles = function (obstacleGrid) {
  let rows = obstacleGrid.length, cols = obstacleGrid[0].length
  // 如果起点或终点有障碍物  肯定到达不了
  if (obstacleGrid[0][0] == 1 || obstacleGrid[rows - 1][cols - 1] == 1) return 0
  /* let dp = Array.from({ length: rows }, () => new Array(cols).fill(0))
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (i == 0 && j == 0) dp[i][j] = 1
      else if (i == 0) dp[i][j] = obstacleGrid[i][j - 1] == 1 ? 0 : dp[i][j - 1]
      else if (j == 0) dp[i][j] = obstacleGrid[i - 1][j] == 1 ? 0 : dp[i - 1][j]
      else dp[i][j] = (obstacleGrid[i - 1][j] == 1 ? 0 : dp[i - 1][j]) + (obstacleGrid[i][j - 1] == 1 ? 0 : dp[i][j - 1])
    }
  }
  return dp[rows - 1][cols - 1] */

  let dp = Array.from({ length: 2 }, () => new Array(cols).fill(0))
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (i == 0 && j == 0) dp[i % 2][j] = 1
      else if (i == 0) dp[i % 2][j] = obstacleGrid[i][j - 1] == 1 ? 0 : dp[i % 2][j - 1]
      else if (j == 0) dp[i % 2][j] = obstacleGrid[i - 1][j] == 1 ? 0 : dp[(i - 1) % 2][j]
      else dp[i % 2][j] = (obstacleGrid[i - 1][j] == 1 ? 0 : dp[(i - 1) % 2][j]) + (obstacleGrid[i][j - 1] == 1 ? 0 : dp[i % 2][j - 1])
    }
  }
  return dp[(rows - 1) % 2][cols - 1]
};