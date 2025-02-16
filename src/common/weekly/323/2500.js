/**
 * @param {number[][]} grid
 * @return {number}
 */
var deleteGreatestValue = function (grid) {
  let ans = 0;
  for (let row of grid) {
    // 从大到小排序
    row.sort((a, b) => b - a);
  }
  for (let j = 0; j < grid[0].length; j++) {
    let max = 0;
    for (let i = 0; i < grid.length; i++) {
      max = Math.max(max, grid[i][j]);
    }
    ans += max;
  }
  return ans;
};
