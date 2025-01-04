/**
 * @param {number[][]} grid
 * @return {number}
 */
var minimumOperations = function (grid) {
  let ans = 0;
  let rows = grid.length,
    cols = grid[0].length;
  for (let j = 0; j < cols; j++) {
    let prev = -1;
    for (let i = 0; i < rows; i++) {
      let x = grid[i][j];
      ans += Math.max(prev + 1 - x, 0);
      prev = Math.max(prev + 1, x);
    }
  }
  return ans;
};
