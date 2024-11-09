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
  const m = matrix.length,
    n = matrix[0].length;
  // 每一行应该选哪些列
  let mask = new Array(m).fill(0);
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      mask[i] |= matrix[i][j] << j;
    }
  }
  let ans = 0;
  // 这里相当于一个暴力枚举  这一行选或者不选  所以是1<<n
  for (let subset = 0; subset < 1 << n; subset++) {
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
