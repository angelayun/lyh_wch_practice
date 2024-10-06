/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function (rows, cols) {
  let dp = Array.from({ length: 2 }, () => new Array(cols).fill(0))
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (i == 0 || j == 0) dp[i % 2][j] = 1
      else dp[i % 2][j] = dp[(i - 1) % 2][j] + dp[i % 2][j - 1]
    }
  }
  // console.log(dp)
  return dp[(rows - 1) % 2][cols - 1]
};


/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function (rows, cols) {
  /* let dp = Array.from({ length: rows }, () => new Array(cols).fill(0))
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (i == 0 && j == 0) dp[i][j] = 1
      else if (i == 0) dp[i][j] = dp[i][j - 1]
      else if (j == 0) dp[i][j] = dp[i - 1][j]
      else dp[i][j] = dp[i - 1][j] + dp[i][j - 1]
    }
  }
  return dp[rows - 1][cols - 1] */
  /* let dp = Array.from({ length: 2 }, () => new Array(cols).fill(0))
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (i == 0 && j == 0) dp[i % 2][j] = 1
      else if (i == 0) dp[i % 2][j] = dp[i % 2][j - 1]
      else if (j == 0) dp[i % 2][j] = dp[(i - 1) % 2][j]
      else dp[i % 2][j] = dp[(i - 1) % 2][j] + dp[i % 2][j - 1]
    }
  }
  return dp[(rows - 1) % 2][cols - 1] */
  let dp = new Array(cols + 1).fill(0)
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (i == 0 && j == 0) [j+1] = 1
      else if (i == 0) dp[j+1] = dp[j ]
      else if (j == 0) dp[j+1] = dp[j]
      else dp[i % 2][j] = dp[(i - 1) % 2][j] + dp[i % 2][j - 1]
    }
  }
  return dp[(rows - 1) % 2][cols - 1]
};