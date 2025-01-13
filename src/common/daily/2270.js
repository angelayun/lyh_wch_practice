/**
 * @param {number[]} nums
 * @return {number}
 */
var waysToSplitArray = function (nums) {
  const n = nums.length;
  let total = nums.reduce((pre, cur) => pre + cur);
  let ans = 0;
  let preSum = 0;
  for (let i = 0; i < n - 1; i++) {
    preSum += nums[i];
    if (preSum >= total - preSum) {
      ans++;
    }
  }
  return ans;
};
