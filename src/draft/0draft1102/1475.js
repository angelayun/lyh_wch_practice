/**
 * @param {number[]} prices
 * @return {number[]}
 */
var finalPrices = function (prices) {
  const n = prices.length;
  let stack = [];
  for (let i = 0; i < n; i++) {
    while (stack.length && prices[stack[stack.length - 1]] > prices[i]) {
      let j = stack.pop();
      prices[j] -= prices[i];
    }
    stack.push(i);
  }
  return prices;
};
