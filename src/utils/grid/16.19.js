/**
 * @param {number[][]} land
 * @return {number[]}
 */
var pondSizes = function (grid) {
  const n = grid.length
  const m = grid[0].length
  // 这里是8个方向
  /*   let directions = [
      [0, 1],
      [0, -1],
      [1, 1],
      [-1, 1],
      [1, 0],
      [-1, 0],
      [1, -1],
      [-1, -1]
    ] */


  let directions = [
    [0, 1],
    [0, -1],

    [1, 0],
    [-1, 0],
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1],
  ]
  const dfs = (i, j) => {
    let count = 1
    grid[i][j] = Number.MAX_SAFE_INTEGER
    for (let [x, y] of directions) {
      let ii = x + i, jj = j + y;
      if (ii < 0 || ii >= n || jj < 0 || jj >= m) continue
      // console.log(i, j, ii, jj)
      if (grid[ii][jj] == '0') {
        grid[ii][jj] = Number.MAX_SAFE_INTEGER
        count += dfs(ii, jj)
      }
    }
    return count
  }
  let areas = []
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (grid[i][j] == '0') {
        areas.push(dfs(i, j))
      }
    }
  }
  return areas.sort((a, b) => a - b)
};