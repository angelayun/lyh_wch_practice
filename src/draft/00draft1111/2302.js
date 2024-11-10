/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var countSubarrays = function (nums, k) {
  let sum = 0;
  let cnt = 0;
  const n = nums.length;
  for (let left = 0, right = 0; right < n; right++) {
    sum += nums[right];
    while (sum * (right - left + 1) >= k) {
      sum -= nums[left];
      left++;
    }
    cnt += left;
  }
  return cnt;
};
