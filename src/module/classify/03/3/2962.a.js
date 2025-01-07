/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var countSubarrays = function (nums, k) {
  const n = nums.length;
  let maxVal = Math.max(...nums);
  let ans = 0;
  let cnt = 0;
  for (let left = 0, right = 0; right < n; right++) {
    cnt += nums[right] == maxVal ? 1 : 0;
    while (cnt >= k) {
      cnt -= nums[left] == maxVal ? 1 : 0;
      left++;
    }
    ans += left;
  }
  return ans;
};
