/**
 * @param {number[]} power
 * @return {number}
 */
var maximumTotalDamage = function (power) {
  let maxVal = Math.max(...power)
  let bucket = new Array(maxVal + 1).fill(0)
  for (let x of power) {
    bucket[x]++
  }
  // 选择了当前值，前面俩都不能选择
  let dp = new Array(maxVal + 1).fill(0)
  dp[1] = bucket[1]
  dp[2] = bucket[2]
  for (let i = 3; i <= maxVal; i++) {
    dp[i] = Math.max(dp[i - 1], dp[i - 2], dp[i - 3] + i * bucket[i])
  }
  return dp[maxVal]
};