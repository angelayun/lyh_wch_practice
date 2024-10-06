/**
 * @param {number[][]} matrix
 * @return {number}
 */
var minFallingPathSum = function (matrix) {
  let rows = matrix.length, cols = matrix[0].length
  for (let i = 1; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (j == 0) {
        // 第一列
        matrix[i][j] += Math.min(matrix[i - 1][j], matrix[i - 1][j + 1])
      } else if (j == cols - 1) {
        // 最后一列
        matrix[i][j] += Math.min(matrix[i - 1][j], matrix[i - 1][j - 1])
      } else {
        matrix[i][j] += Math.min(matrix[i - 1][j + 1], matrix[i - 1][j], matrix[i - 1][j - 1])
      }
    }
  }
  let ans = Math.min(...matrix[rows - 1])
  return ans
};