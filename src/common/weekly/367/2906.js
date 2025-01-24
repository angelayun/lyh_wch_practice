/**
 * @param {number[][]} grid
 * @return {number[][]}
 */
var constructProductMatrix = function (grid) {
  const rows = grid.length,
    cols = grid[0].length;
  const MOD = 12345;
  let ans = Array.from({ length: rows }, () => new Array(cols).fill(1));
  let suffix = 1;
  for (let row = rows - 1; row >= 0; row--) {
    for (let col = cols - 1; col >= 0; col--) {
      ans[row][col] = (ans[row][col] * suffix) % MOD;
      suffix = (suffix * grid[row][col]) % MOD;
    }
  }
  let prefix = 1;
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      ans[row][col] = (ans[row][col] * prefix) % MOD;
      prefix = (prefix * grid[row][col]) % MOD;
    }
  }
  return ans;
};
/**
 * @param {number[][]} grid
 * @return {number[][]}
 */
var constructProductMatrix = function (grid) {
  const rows = grid.length,
    cols = grid[0].length;
  const MOD = 12345;
  let ans = Array.from({ length: rows }, () => new Array(cols).fill(1));
  let suffix = 1;
  for (let row = rows - 1; row >= 0; row--) {
    for (let col = cols - 1; col >= 0; col--) {
      ans[row][col] = suffix;
      suffix = (suffix * grid[row][col]) % MOD;
    }
  }
  let prefix = 1;
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      ans[row][col] = (ans[row][col] * prefix) % MOD;
      prefix = (prefix * grid[row][col]) % MOD;
    }
  }
  return ans;
};
