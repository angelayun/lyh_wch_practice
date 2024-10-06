/**
 * @param {number[]} nums
 * @return {number}
 */
var deleteAndEarn = function (nums) {
  const n = nums.length
  let cnt = new Map()
  let maxVal = Number.MIN_SAFE_INTEGER
  for (let x of nums) {
    cnt.set(x, (cnt.get(x) || 0) + 1)
    maxVal = Math.max(maxVal, x)
  }
  let dp = new Array(maxVal + 2).fill(0)
  for (let i = 0; i < maxVal; i++) {
    dp[i + 2] = Math.max(dp[i] + cnt.has(i) ? cnt.get(i) * i : 0, dp[i + 1])
  }
  return dp[n + 1]
};