/**
 * @param {number[][]} grid
 * @return {number}
 */
var minFallingPathSum = function (grid) {
  const m = grid.length, n = grid[0].length
  let memo = Array.from({ length: m }, () => Array.from({ length: n }, () => Number.MAX_SAFE_INTEGER))
  let ans = Number.MAX_SAFE_INTEGER

  const dfs = (i, j, v) => {
    if (j < 0 || j >= n) return Number.MAX_SAFE_INTEGER
    if (i <= 0) {
      return ans = Math.min(ans, v + grid[i][j])
    }
    if (memo[i][j]!=) return memo[i][j].get(v)
    let res = Number.MAX_SAFE_INTEGER
    for (let k = 0; k < n; k++) {
      if (j != k) {

        res = Math.min(res, dfs(i - 1, k, v + grid[i - 1][k]))
      }
    }
    memo[i][j].set(v, res)
    return res
  }
  for (let j = 0; j < n; j++) {
    dfs(m - 1, j, grid[i][j])
  }
  return ans
};
// 这个题目写成这样也是无语  哎