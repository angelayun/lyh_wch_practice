/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maxSubarraySum = function (nums, k) {
  const n = nums.length;
  let sum = new Array(n + 1).fill(0);
  for (let i = 0; i < n; i++) {
    sum[i + 1] = sum[i] + nums[i];
  }
  let minS = new Array(k).fill(~~(Number.MAX_SAFE_INTEGER / 2));
  let ans = BigInt(Number.MIN_SAFE_INTEGER);
  for (let j = 0; j < sum.length; j++) {
    let i = j % k;
    if (sum[j] - minS[i] > ans) {
      ans = sum[j] - minS[i];
    }
    if (sum[j] < minS[i]) {
      minS[i] = sum[j];
    }
  }
  return Number(ans);
};
