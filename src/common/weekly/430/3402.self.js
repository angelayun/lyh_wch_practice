/**
 * @param {number[][]} grid
 * @return {number}
 */
var minimumOperations = function (grid) {
  const rows = grid.length,
    cols = grid[0].length;
  let cnt = 0;

  for (let j = 0; j < cols; j++) {
    for (let i = 1; i < rows; i++) {
      let pre = grid[i - 1][j] + 1;
      if (pre > grid[i][j]) {
        cnt += pre - grid[i][j];
        grid[i][j] = pre;
      }
    }
  }
  return cnt;
};
