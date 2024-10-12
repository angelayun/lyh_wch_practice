/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var countSubarrays = function (nums, k) {
  let count = 0;
  let leftPoint = 0,
    rightPoint = 0;
  for (let [right, x] of nums.entries()) {
    for (let left = right - 1; left >= 0; left--) {
      if ((nums[left] & x) == nums[left]) break;
      nums[left] &= x;
    }
    // 那么随着i的变大，nums[left]变小 有单调性
    while (leftPoint <= right && nums[leftPoint] < k) leftPoint++;
    // 循环结束后， nums[leftPoint]>=k
    while (rightPoint <= right && nums[rightPoint] <= k) rightPoint++;
    // 循环结束后，nums[rightPoint]>k
    count += rightPoint - leftPoint;
  }
  return count;
};