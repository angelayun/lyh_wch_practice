/**
 * @param {number[][]} frame
 * @return {number}
 */
var jewelleryValue = function (frame) {
  const n = frame.length,
    m = frame[0].length;

  for (let i = 1; i < n; i++) {
    for (let j = 1; j < m; j++) {
      frame[i][j] += frame[i - 1][j - 1];
    }
  }
  return frame[n - 1][m - 1];
};
