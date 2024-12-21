/**
 * @param {number} n
 * @return {number}
 */
var hammingWeight = function (n) {
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
  // 每一行的mask
  let mask = new Array(m).fill(0);
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      mask[i] |= matrix[i][j] << j;
    }
  }
  let cnt = 0;
  // 列存在选或者不选的情况
  for (let subset = 0; subset < 1 << n; subset++) {
    if (hammingWeight(subset) == numSelect) {
      let rows = 0;
      for (let i = 0; i < m; i++) {
        if ((mask[i] & subset) == mask[i]) {
          rows++;
        }
      }
      cnt = Math.max(cnt, rows);
    }
  }
  return cnt;
};
