/**
 * @param {number[][]} grid
 * @param {number} k
 * @return {number}
 */
var numberOfPaths = function (grid, k) {
  const MOD = 10 ** 9 + 7
  // 我没有看出来我这一段哪里有问题
  /* const m = grid.length, n = grid[0].length
  let memo = Array.from({ length: m }, () => Array.from({ length: n }, () => new Array(51).fill(-1)))
  const dfs = (i, j, v) => {
    if (i < 0 || j < 0) return 0
    v = (v + grid[i][j]) % MOD
    if (i == j && j == 0) return Number(v == 0)
    if (memo[i][j][v] != -1) return memo[i][j][v]
    return memo[i][j][v] = (dfs(i - 1, j, v) % MOD + dfs(i, j - 1, v) % MOD) % MOD
  }
  return dfs(m - 1, n - 1, 0) */
  const m = grid.length, n = grid[0].length
  var f = Array.from({ length: m + 1 }, () => Array.from({ length: n + 1 }, () => new Array(k).fill(-1)))
  f[0][1][0] = 1;
  for (var i = 0; i < m; ++i)
    for (var j = 0; j < n; ++j)
      for (var v = 0; v < k; ++v)
        f[i + 1][j + 1][(v + grid[i][j]) % k] = (f[i + 1][j][v] + f[i][j + 1][v]) % MOD;
  return f[m][n][0];
};