/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var countSubarrays = function (nums, k) {
  const n = nums.length;
  let leftPoint = 0,
    rightPoint = 0;
  let ans = 0;
  for (let right = 0; right < n; right++) {
    for (let left = right - 1; left >= 0; left--) {
      if ((nums[left] & nums[right]) == nums[left]) break;
      nums[left] &= nums[right];
    }
    while (leftPoint <= right && nums[leftPoint] < k) leftPoint++;
    while (rightPoint <= right && nums[rightPoint] <= k) leftPoint++;
    ans += rightPoint - leftPoint;
  }
  return ans;
};
