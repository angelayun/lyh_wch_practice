/**
 * @param {number[][]} grid
 * @param {number} k
 * @return {number}
 */
var countSubmatrices = function (grid, k) {
  const n = grid.length,
    m = grid[0].length;
  let preSum = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
  let cnt = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      preSum[i + 1][j + 1] =
        preSum[i + 1][j] + preSum[i][j + 1] - preSum[i][j] + grid[i][j];
      if (preSum[i + 1][j + 1] <= k) cnt++;
    }
  }
  return cnt;
};
