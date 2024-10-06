/**
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function (grid) {
  const n = grid.length
  const m = grid[0].length
  let directions = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0]
  ]
  const dfs = (i, j) => {
    grid[i][j] = 0
    for (let [x, y] of directions) {
      let ii = x + i, jj = j + y;
      if (ii < 0 || ii >= n || jj < 0 || jj >= m) continue
      if (grid[ii][jj] == 1) {
        grid[ii][jj] = 0
        dfs(ii, jj)
      }
    }
  }
  let count = 0
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (grid[i][j] == '1') {
        dfs(i, j)
        count++
      }
    }
  }
  return count
};