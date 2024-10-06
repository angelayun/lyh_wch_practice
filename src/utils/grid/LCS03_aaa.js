/**
 * @param {string[]} grid
 * @return {number}
 */
var largestArea = function (grid) {
  const n = grid.length
  for (let i = 0; i < n; i++) {
    grid[i] = grid[i].split('')
  }
  const m = grid[0].length
  let directions = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0]
  ]
  const dfs = (i, j, val) => {
    if (i < 0 || j < 0 || i >= rows || j >= cols || grid[i][j] != 1) return 0;
    let count = 1;
    grid[i][j] = '0';
    for (let [x, y] of directions) {

      count += dfs(i + x, y + j, val);
    }
    return count;
  };
  let count = 0
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      // 在四周
      if ((i == 0 || i == n - 1 || j == 0 || j == m - 1)) {
        dfs(i, j, grid[i][j])
      }
    }
  }
  console.log(grid)

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      // 在四周
      if (grid[i][j] != '0') {
        count = Math.max(count, dfs(i, j))
      }
    }
  }
  return count
};