const bitLen = (n) => {
  let count = 0;
  while (n) {
    n &= n - 1;
    count++;
  }
  return count;
};
/**
 * @param {number[][]} matrix
 * @param {number} numSelect
 * @return {number}
 */
var maximumRows = function (matrix, numSelect) {
  // 你最多只能选择numSelect个列
  // 如果一行中所有的 1 都被你选中的列所覆盖，则认为这一行被 覆盖 了。
  const m = matrix.length,
    n = matrix[0].length;
  // 每一行应该选哪些列
  let mask = new Array(m).fill(0); // 每一行的mask
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      mask[i] |= matrix[i][j] << j;
    }
  }
  let ans = 0;
  // 这里相当于一个暴力枚举  这一列选或者不选  所以是1<<n
  for (let subset = 0; subset < 1 << n; subset++) {
    // 选择列的个数等于 numSelect
    if (bitLen(subset) == numSelect) {
      let coveredRows = 0;
      for (let row of mask) {
        if ((row & subset) == row) {
          coveredRows++;
        }
      }
      ans = Math.max(ans, coveredRows);
    }
  }
  return ans;
};
