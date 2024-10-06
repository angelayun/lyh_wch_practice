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
  const dfs = (i, j) => {
    // 越界了
    if (i < 0 || i >= n || j < 0 || j >= m) return 0
    let val = grid[i][j]
    grid[i][j] = -1
    let count = 0
    for (let [x, y] of directions) {
      let ii = i + x, jj = j + y
      if (ii < 0 || ii >= n || jj < 0 || jj >= m) continue
      if (grid[ii][jj] == val) {
        count += dfs(ii, jj)
        grid[ii][jj] = -1
      }
    }
    return count
  }
  // 先把四周的都遍历好
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if ((i == 0 || i == n - 1 || j == 0 || j == m - 1) && grid[i][j] != -1) {
        dfs(i, j)
      }
    }
  }
  /*   let maxCount = 0
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        if (grid[i][j] != -1) {
          maxCount = Math.max(maxCount, dfs(i, j))
        }
      }
    } */
  return maxCount
};
// 这个题目没写出来  后面要再试一下