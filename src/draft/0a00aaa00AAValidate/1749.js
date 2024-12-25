/**
 * @param {number[]} nums
 * @return {number}
 */
var maxAbsoluteSum = function (nums) {
  let fMax = 0,
    fMin = 0;
  let ans = 0;
  for (let x of nums) {
    fMax = Math.max(fMax, 0) + x;
    fMin = Math.min(fMin, 0) + x;
    ans = Math.max(ans, fMax, -fMin);
  }
  return ans;
};

/**
 * @param {number[]} nums
 * @return {number}
 */
var maxAbsoluteSum = function (nums) {
  let preSum = 0;
  let mx = 0,
    mn = 0;
  for (let x of nums) {
    preSum += x;
    mx = Math.max(mx, preSum);
    mn = Math.min(mn, preSum);
  }
  return mx - mn;
};
