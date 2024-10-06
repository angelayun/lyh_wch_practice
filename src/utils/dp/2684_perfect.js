/**
 * @param {number[][]} grid
 * @return {number}
 */
var maxMoves = function (grid) {
  let rows = grid.length, cols = grid[0].length

  const dp = Array.from({ length: rows }, () => new Array(cols).fill(0))
  for (let j = cols - 2; j >= 0; j--) {
    for (let i = 0; i < rows; i++) {
      for (let k in [i - 1, i, i + 1]) {
        if (k >= 0 && k < rows && grid[k][j + 1] > grid[k][j]) {
          dp[i][j] = Math.max(dp[i][j], dp[k][j + 1] + 1)
        }
      }
    }
  }
  let ans = 0
  for (let i = 0; i < rows; i++) {
    // 第一列的任一单元格出发
    ans = Math.max(ans, dp[i][0])
  }
  return ans
};