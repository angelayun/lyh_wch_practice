/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
  // 这种解答方式有点类似于   121. 买卖股票的最佳时机
  /* let preMin = 0, preSum = 0
  let ans = Number.MIN_SAFE_INTEGER
  for (let x of nums) {
    preSum += x
    ans = Math.max(ans, preSum - preMin)
    // 这一句写在ans后面可保证 子数组不能为空
    preMin = Math.min(preMin, preSum)
  }
  return ans */
  const n = nums.length
  /*  const dp = new Array(n + 1).fill(0)
   let ans = Number.MIN_SAFE_INTEGER
   for (let i = 0; i < n; i++) {
     dp[i + 1] = Math.max(dp[i], 0) + nums[i]
     ans = Math.max(ans, dp[i + 1])
   }
   return ans */
  const dp = new Array(n).fill(0)
  let ans = nums[0]
  for (let i = 1; i < n; i++) {
    dp[i] = Math.max(dp[i - 1], 0) + nums[i]
    ans = Math.max(ans, dp[i])
  }
  return ans
  // 空间优化
  /*  let ans = Number.MIN_SAFE_INTEGER
   let dp = 0
   for (let i = 0; i < n; i++) {
     dp = Math.max(dp, 0) + nums[i]
     ans = Math.max(ans, dp)
   }
   return ans */
};