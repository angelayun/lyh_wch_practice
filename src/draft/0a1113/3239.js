/**
 * @param {number[][]} grid
 * @return {number}
 */
var minFlips = function (grid) {
  let rows = grid.length,
    cols = grid[0].length;
  // 先计算如果是让行回文需要的次数
  let rCnt = 0;
  for (let row of grid) {
    let i = 0,
      j = cols - 1;
    while (i < j) {
      if (row[i] != row[j]) {
        rCnt++;
      }
      i++;
      j--;
    }
  }
  let cCnt = 0;
  for (let i = 0; i < cols; i++) {
    let top = 0,
      bottom = rows - 1;
    while (top < bottom) {
      if (grid[top][i] != grid[bottom][i]) {
        cCnt++;
      }
      top++;
      bottom--;
    }
  }
  return Math.min(rCnt, cCnt);
};
