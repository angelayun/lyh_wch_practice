/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maxSubarraySum = function (nums, k) {
  const n = nums.length;
  let preSum = new Array(n + 1).fill(0);
  for (let i = 0; i < n; i++) {
    preSum[i + 1] = preSum[i] + nums[i];
  }
  let ans = Number.MIN_SAFE_INTEGER;
  let minS = new Array(k).fill(Number.MAX_SAFE_INTEGER);
  for (let j = 0; j < n; j++) {
    // [0,j) 的前缀和为 preSum[j]
    let s = preSum[j];
    // [i,j)的长度为k
    let i = j % k;
    ans = Math.max(ans, s - minS[i]);
    minS[j] = Math.min(minS[j], s);
  }
  return ans;
};
