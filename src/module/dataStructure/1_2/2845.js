/**
 * @param {number[]} nums
 * @param {number} modulo
 * @param {number} k
 * @return {number}
 */
var countInterestingSubarrays = function (nums, m, k) {
  const n = nums.length;
  let preSum = new Array(n + 1).fill(0);
  for (let i = 0; i < n; i++) {
    preSum[i + 1] = preSum[i] + (nums[i] % m == k);
  }
  let ans = 0;
  let cnt = new Map();
  for (let cur of preSum) {
    ans += cnt.get(((cur % m) - k + m) % m) ?? 0;
    cnt.set(cur % m, (cnt.get(cur % m) || 0) + 1);
  }
  return ans;
};
// 灵神视频两遍遍历的方式
/**
 * @param {number[]} nums
 * @param {number} modulo
 * @param {number} k
 * @return {number}
 */
var countInterestingSubarrays = function (nums, m, k) {
  let ans = 0;
  let cnt = new Map([[0, 1]]);
  let preSum = 0;
  for (let x of nums) {
    preSum += x % m == k;
    ans += cnt.get(((preSum % m) - k + m) % m) ?? 0;
    cnt.set(preSum % m, (cnt.get(preSum % m) || 0) + 1);
  }
  return ans;
};
