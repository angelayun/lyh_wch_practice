/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var countSubarrays = function (nums, k) {
  const n = nums.length;
  let sum = 0;
  let cnt = 0;
  for (let left = 0, right = 0; right < n; right++) {
    sum += nums[right];
    while (sum * (right - left + 1) >= k) {
      sum -= nums[left++];
    }
    cnt += right - left + 1;
  }
  return cnt;
};
