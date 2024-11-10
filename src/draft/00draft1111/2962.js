/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var countSubarrays = function (nums, k) {
  const n = nums.length;
  let maxVal = Math.max(...nums);
  let cnt = 0;
  let ans = 0;
  for (let left = 0, right = 0; right < n; right++) {
    if (nums[right] == maxVal) cnt++;
    while (cnt >= k) {
      // 以right为右端点 left为左端点
      ans += left;
      if (nums[left] == maxVal) cnt--;
      left++;
    }
  }
  return ans;
};
