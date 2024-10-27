/**
 * @param {number[]} price
 * @param {number} k
 * @return {number}
 */
var maximumTastiness = function (price, k) {
  price.sort((a, b) => a - b)
  console.log(price)
  let ans = Number.MAX_SAFE_INTEGER
  const n = price.length
  for (let i = 0; i < n - k; i++) {
    let diff = price[i + k - 1] - price[i]
    console.log(price[i + k - 1], price[i], diff)
    ans = Math.min(ans, diff)
  }
  return ans
};
// 这个思路完全不对