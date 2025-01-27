/**
 * @param {number[][]} grid
 * @return {number}
 */
var minimumOperations = function (grid) {
  const rows = grid.length,
    cols = grid[0].length;
  let cnt = 0;
  for (let i = 1; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let curVal = Math.max(grid[i - 1][j] + 1, grid[i][j]);
      cnt += curVal - grid[i][j];
      grid[i][j] = curVal;
    }
  }
  return cnt;
};
