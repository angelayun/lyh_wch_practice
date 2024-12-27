/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maxSubarraySum = function (nums, k) {
  // 前缀和
  const prev = new Array(nums.length + 1).fill(0);
  for (let i = 1; i <= nums.length; i++) prev[i] = prev[i - 1] + nums[i - 1];

  const minS = new Array(k).fill(Infinity);
  let ans = -Infinity;

  for (let j = 0; j < prev.length; j++) {
    const s = prev[j];
    const i = j % k;
    ans = Math.max(ans, s - minS[i]);
    minS[i] = Math.min(minS[i], s);
  }

  return ans;
};
// TODO 一遍优化的写法还没通过
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maxSubarraySum = function (nums, k) {
  const minS = new Array(k).fill(Infinity);
  let ans = -Infinity;
  let preSum = 0;
  for (let j = 0; j < prev.length; j++) {
    preSum += nums[j];
    const i = j % k;
    ans = Math.max(ans, preSum - minS[i]);
    minS[i] = Math.min(minS[i], preSum);
  }

  return ans;
};
