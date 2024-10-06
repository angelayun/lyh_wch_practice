/**
 * @param {number} low
 * @param {number} high
 * @param {number} zero
 * @param {number} one
 * @return {number}
 */
var countGoodStrings = function (low, high, zero, one) {
  const MOD = 1_000_000_007
  // dp[i] 表示构造长为 i 的字符串的方案数
  let dp = new Array(high + 1).fill(0)
  dp[0] = 1
  let ans = 0
  for (let i = 1; i < dp.length; i++) {
    if (i >= zero) dp[i] = dp[i - zero]
    if (i >= one) dp[i] += dp[i - one]
    if (i >= low) {
      ans += dp[i]
      ans %= MOD
    }
  }
  return ans
};