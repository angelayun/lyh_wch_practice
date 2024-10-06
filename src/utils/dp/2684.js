
/**
 * @param {number[][]} grid
 * @return {number}
 */
var maxMoves = function (grid) {
  let rows = grid.length, cols = grid[0].length
  const memo = Array.from({ length: rows }, () => new Array(cols).fill(-1))
  const dfs = (i, j) => {
    // ans 已经达到最大值
    if (j == cols - 1) return 0
    if (memo[i][j] != -1) return memo[i][j]
    let res = 0
    for (let k = Math.max(i - 1, 0); k < Math.min(i + 2, rows); k++) {
      if (grid[k][j + 1] > grid[i][j])
        res = Math.max(res, dfs(k, j + 1) + 1)
    }
    return memo[i][j] = res
  }
  let ans = 0
  for (let i = 0; i < rows; i++) {
    // 第一列的任一单元格出发
    ans = Math.max(ans, dfs(i, 0))
  }
  return ans
};