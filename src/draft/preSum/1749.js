/**
 * @param {number[]} nums
 * @return {number}
 */
var maxAbsoluteSum = function (nums) {
  // 用dp的思路来写一遍吧
  const n = nums.length;
  let dpMax = 0,
    dpMin = 0;
  let ans = 0;
  for (let x of nums) {
    dpMax = Math.max(dpMax, 0) + x;
    dpMin = Math.min(dpMin, 0) + x;
    ans = Math.max(ans, dpMax, -dpMin);
  }
  return ans;
};

/**
 * @param {number[]} nums
 * @return {number}
 */
var maxAbsoluteSum = function (nums) {
  // 用前缀和的思路来写一遍吧
  let preSum = 0;
  let preMax = 0;
  let preMin = 0;
  for (let x of nums) {
    preSum += x;
    preMax = Math.max(preMax, preSum);
    preMin = Math.min(preMin, preSum);
  }
  return preMax - preMin;
};
