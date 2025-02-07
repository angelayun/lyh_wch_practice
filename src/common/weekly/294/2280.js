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
