/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var countSubarrays = function (nums, k) {
  const n = nums.length;
  const maxVal = Math.max(...nums);
  let ans = 0;
  let count = 0;
  for (let left = 0, right = 0; right < n; right++) {
    if (nums[right] == maxVal) count++;
    while (count >= k) {
      // 以left为左端点  [left,right] [left,right+1] [left,right+1] [left,n-1]
      ans += n - right;
      if (nums[left++] == maxVal) count--;
    }
  }
  return ans;
};
