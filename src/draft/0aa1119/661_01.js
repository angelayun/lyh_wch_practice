/**
 * @param {number[][]} img
 * @return {number[][]}
 */
var imageSmoother = function (img) {
  let m = img.length,
    n = img[0].length;
  let sum = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      sum[i + 1][j + 1] = sum[i + 1][j] + sum[i][j + 1] - sum[i][j] + img[i][j];
    }
  }
  let ans = Array.from({ length: m }, () => new Array(n).fill(0));

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      let a = Math.max(i - 1, 0),
        b = Math.max(j - 1, 0);
      let c = Math.min(i + 1, m - 1),
        d = Math.min(j + 1, n - 1);
      let total = sum[c + 1][d + 1] - sum[a][d + 1] - sum[c + 1][b] - sum[a][b];
      let cnt = (c - a + 1) * (d - b + a);
      ans[i][j]= total/cnt
    }
  }
  return ans
};
