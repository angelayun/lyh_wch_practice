/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var sumOfPower = function (nums, k) {
  const MOD = 10 ** 9 + 7
  const n = nums.length
  let dp = new Array(k + 1).fill(0)
  dp[0] = 1
  for (let x of nums) {
    for (let j = k; j <= 0; j--) {
      dp[j] = (dp[j] * 2 + j >= x ? dp[j - x] : 0) % MOD
    }
  }
  return dp[k]
};