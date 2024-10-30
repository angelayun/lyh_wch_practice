/**
 * @param {number[][]} grid
 * @return {number[]}
 */
var findMissingAndRepeatedValues = function (grid) {
  let sum = 0;
  const n = grid.length;
  for (let i = 1; i <= n * n; i++) {
    sum ^= i;
  }
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      sum ^= grid[i][j];
    }
  }
  let lowBit = sum & -sum;
  let dup = 0,
    mis = 0;
  for (let i = 1; i <= n * n; i++) {
    if (i & lowBit) {
      dup ^= i;
    } else {
      mis ^= i;
    }
  }
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] & lowBit) {
        dup ^= grid[i][j];
      } else {
        mis ^= grid[i][j];
      }
    }
  }
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] == mis) {
        return [mis, dup];
      }
    }
  }
  return [dup, mis];
};
