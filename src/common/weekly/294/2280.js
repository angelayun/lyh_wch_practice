/**
 * @param {number[][]} stockPrices
 * @return {number}
 */
var minimumLines = function (a) {
  a.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  let preK = Infinity;
  let n = a.length;
  let cnt = 0;
  // 对于一条直线，如果已知该直线上两个不同的点（x1,y1）和（x2,y2），那么这条直线的斜率等于这两点纵坐标之差与横坐标之差的比值 k = (y2-y1)/(x2-x1)
  for (let i = 1; i < n; i++) {
    let dy = a[i][1] - a[i - 1][1];
    let dx = a[i][0] - a[i - 1][0];
    let k = dy / dx;
    if (k != preK) {
      cnt++;
      preK = k;
    }
  }
  return cnt;
};
/**
 * @param {number[][]} stockPrices
 * @return {number}
 */
var minimumLines = function (stockPrices) {
  stockPrices.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  let preDy = 1,
    preDx = 0;
  let n = stockPrices.length;
  let ans = 0;
  for (let i = 1; i < n; i++) {
    let dy = stockPrices[i][1] - stockPrices[i - 1][1];
    let dx = stockPrices[i][0] - stockPrices[i - 1][0];
    if (dy * preDx != dx * preDy) {
      ans++;
      preDy = dy;
      preDx = dx;
    }
  }
  return ans;
};
