/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
  // 前缀和的思路
  let preSum = 0;
  let minSum = 0;
  let ans = -Infinity;
  for (let i = 0; i < nums.length; i++) {
    let x = nums[i];
    preSum += x;
    ans = Math.max(ans, preSum - minSum);
    minSum = Math.min(preSum, minSum);
  }
  return ans;
};

/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
  const n = nums.length;
  let dp = new Array(n).fill(0);
  dp[0] = nums[0];
  for (let i = 1; i < n; i++) {
    dp[i] = Math.max(dp[i - 1], 0) + nums[i];
  }
  return Math.max(...dp);
};

/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
  const n = nums.length;
  let f0 = nums[0];
  let res = f0;
  for (let i = 1; i < n; i++) {
    let f1 = Math.max(f0, 0) + nums[i];
    f0 = f1;
    res = Math.max(res, f1);
  }
  return res;
};
