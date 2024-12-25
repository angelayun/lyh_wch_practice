/**
 * @param {number[][]} grid
 * @param {number} k
 * @return {number}
 */
var countPathsWithXorValue = function (grid, k) {
  // MOD 的正确定义法  这个是模板 记住了
  const MOD = 1_000_000_007;
  let mx = 0;
  for (let row of grid) {
    for (let val of row) {
      mx = Math.max(mx, val);
    }
  }
  let u = 1 << (32 - Math.clz32(mx));
  // 也就是说当mx的所有位上都是1的时候 k还要大于它 就算把所有数（经过mx的）都异或一遍都不可能得到一个正确的方案
  if (k >= u) return 0;
  let m = grid.length;
  let n = grid[0].length;
  let memo = Array.from({ length: m }, () =>
    Array.from({ length: n }, () => new Array(u).fill(-1))
  );
  const dfs = (i, j, x) => {
    if (i < 0 || j < 0) return 0;
    let val = grid[i][j];
    if (i == 0 && j == 0) return x == val ? 1 : 0;
    if (memo[i][j][x] != -1) return memo[i][j][x];
    let left = dfs(i, j - 1, x ^ val);
    let up = dfs(i - 1, j, x ^ val);
    return (memo[i][j][x] = (left + up) % MOD);
  };
  return dfs(m - 1, n - 1, k);
};
// TODO 到时候再看题解写一下递推的方式
