/**
 * @param {character[][]} matrix
 * @return {number}
 */
var maximalSquare = function (matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  let maxSide = 0;
  const dp = new Array(rows + 1).fill(0).map(() => new Array(cols + 1).fill(0));
  for (let i = 1; i <= rows; i++) {
    for (let j = 1; j <= cols; j++) {
      if (matrix[i - 1][j - 1] === '1') {
        dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1;
        maxSide = Math.max(maxSide, dp[i][j]);
      }
    }
  }
  return maxSide * maxSide;
};
