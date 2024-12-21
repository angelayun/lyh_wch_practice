/**
 * @param {number[][]} matrix
 * @param {number} numSelect
 * @return {number}
 */
var maximumRows = function (matrix, numSelect) {
  const bitLen = (n) => {
    let count = 0;
    while (n) {
      n &= n - 1;
      count++;
    }
    return count;
  };
  const m = matrix.length,
    n = matrix[0].length;
  // 每一行的mask 如果这一列为1则对应位就是1
  let mask = new Array(m).fill(0);
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      mask[i] |= matrix[i][j] << j;
    }
  }
  let maxRow = 0;
  // 列  选或不选  有2^n次
  for (let subset = 0; subset < 1 << n; subset++) {
    // 选择列的个数要刚好等于numSelect
    if (bitLen(subset) == numSelect) {
      let rows = 0;
      for (let mk of mask) {
        if ((mk & subset) == mk) {
          rows++;
        }
      }
      maxRow = Math.max(maxRow, rows);
    }
  }
  return maxRow;
};
