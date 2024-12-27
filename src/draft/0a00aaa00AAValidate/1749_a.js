/**
 * @param {number[]} nums
 * @return {number}
 */
var maxAbsoluteSum = function (nums) {
  let ans = 0;
  let fMax = 0;
  let fMin = 0;
  for (let x of nums) {
    fMax = Math.max(fMax, 0) + x;
    fMin = Math.min(fMin, 0) + x;
    ans = Math.max(ans, fMax, -fMin);
  }
  return ans;
};
// 上面是动态规划的写法
/**
 * @param {number[]} nums
 * @return {number}
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxAbsoluteSum = function (nums) {
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
