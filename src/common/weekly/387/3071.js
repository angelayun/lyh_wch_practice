/**
 * @param {number[][]} grid
 * @return {number}
 */
var minimumOperationsToWriteY = function (grid) {
  let cnt1 = new Array(3).fill(0);
  let cnt2 = new Array(3).fill(0);
  let n = grid.length;
  const m = n >> 1;
  // 上半部分求y的上半部分左右对角线
  for (let i = 0; i < m; i++) {
    let row = grid[i];
    cnt1[row[i]]++;
    cnt1[row[n - 1 - i]]++;
    for (let j = 0; j < row.length; j++) {
      if (j != i && j != n - 1 - i) cnt2[grid[i][j]]++;
    }
  }
  // 下半部分求y的下半部分垂直的那条线
  for (let i = m; i < n; i++) {
    let row = grid[i];
    cnt1[row[m]]++;
    for (let j = 0; j < grid[i].length; j++) {
      if (j != m) {
        cnt2[grid[i][j]]++;
      }
    }
  }
  let maxNotChange = 0;
  for (let [i, c1] of cnt1.entries()) {
    for (let [j, c2] of cnt2.entries()) {
      if (i != j) {
        maxNotChange = Math.max(maxNotChange, c1 + c2);
      }
    }
  }
  return n * n - maxNotChange;
};
