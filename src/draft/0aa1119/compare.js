/**
 * @param {number[][]} img
 * @return {number[][]}
 */
var imageSmoother = function (img) {
  let m = img.length,
    n = img[0].length;
  let sum = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      sum[i][j] =
        sum[i - 1][j] + sum[i][j - 1] - sum[i - 1][j - 1] + img[i - 1][j - 1];
    }
  }
  let ans = Array.from({ length: m }, () => new Array(n).fill(0));
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      let a = Math.max(0, i - 1),
        b = Math.max(0, j - 1);
      let c = Math.min(m - 1, i + 1),
        d = Math.min(n - 1, j + 1);
      let total = sum[c + 1][d + 1] - sum[a][d + 1] - sum[c + 1][b] + sum[a][b];
      let cnt = (c - a + 1) * (d - b + 1);
      ans[i][j] = ~~(total / cnt);
    }
  }
  return ans;
};
// 前缀和的解法
