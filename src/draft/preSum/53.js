/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
  let dp = 0;
  let res = Number.MIN_SAFE_INTEGER;
  for (let x of nums) {
    dp = Math.max(dp, 0) + x;
    res = Math.max(dp, res);
  }
  return res;
};

/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
  let preSum = 0;
  let res = Number.MIN_SAFE_INTEGER;
  let preMin = 0;
  for (let x of nums) {
    preSum += x;
    res = Math.max(preSum - preMin, res);
    preMin = Math.min(preMin, preSum);
  }
  return res;
};
