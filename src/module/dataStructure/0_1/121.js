/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  let minPrice = prices[0];
  let res = 0;
  for (let i = 1; i < prices.length; i++) {
    res = Math.max(res, prices[i] - minPrice);
    minPrice = Math.min(minPrice, prices[i]);
  }
  return res;
};
