/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var shortestSubarray = function (nums, k) {
  const n = nums.length;
  let ans = n + 1;
  let sum = 0;
  for (let left = 0, right = 0; right < n; right++) {
    sum += nums[right];
    while (sum >= k) {
      ans = Math.min(ans, right - left + 1);
      sum -= nums[left];
      left++;
    }
  }
  return ans > n ? -1 : ans;
};
// 这个思路只考虑了数组中值全部为正数的情况
