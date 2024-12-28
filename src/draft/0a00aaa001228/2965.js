/**
 * @param {number[][]} grid
 * @return {number[]}
 */
var findMissingAndRepeatedValues = function (grid) {
  const n = grid.length;
  let xor = 0;
  for (let i = 1; i <= n * n; i++) {
    xor ^= i;
  }
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      xor ^= grid[i][j];
    }
  }
  let ans = [0, 0];
  let lowBit = xor & -xor;
  for (let i = 1; i <= n * n; i++) {
    ans[i & lowBit ? 1 : 0] ^= i;
  }
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      let x = grid[i][j];
      ans[x & lowBit ? 1 : 0] ^= x;
    }
  }
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      let x = grid[i][j];
      if (ans[1] == x) {
        [ans[0], ans[1]] = [ans[1], ans[0]];
      }
    }
  }
  return ans;
};
