/**
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function (grid) {
  let rows = grid.length, cols = grid[0].length
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (i == 0 && j == 0) continue
      else if (i == 0) grid[i][j] += grid[i][j - 1]
      else if (j == 0) grid[i][j] += grid[i - 1][j]
      else grid[i][j] += Math.max(grid[i][j - 1], grid[i - 1][j])
    }
  }
  return grid[rows - 1][cols - 1]
};