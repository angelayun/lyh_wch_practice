/**
 * @param {number[][]} grid
 * @return {number[]}
 */
var findMissingAndRepeatedValues = function (grid) {
  const n = grid.length;
  let res = 0;
  for (let i = 1; i <= n * n; i++) {
    res ^= i;
  }
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      res ^= grid[i][j];
    }
  }
  let arr = [0, 0];
  let lowBit = res & -res;
  for (let i = 1; i <= n * n; i++) {
    arr[i & lowBit ? 1 : 0] ^= i;
  }
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      arr[grid[i][j] & lowBit ? 1 : 0] ^= grid[i][j];
    }
  }
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] == arr[1]) {
        [arr[0], arr[1]] = [arr[1], arr[0]];
        break;
      }
    }
  }
  return arr;
};
