/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var countSubarrays = function (nums, k) {
  let count = 0
  let leftPoint = 0, rightPoint = 0
  const n = nums.length
  for (let right = 0; right < n; right++) {
    for (let left = right - 1; left >= 0; left--) {
      if (nums[left] & nums[right] == nums[left]) break
      nums[left] &= nums[right]
    }
    // 这一轮&之后  相当于num[right]没做操作，但是nums[right]之前的都有&操作
    while (leftPoint <= right && nums[leftPoint] < k) leftPoint++ //此时leftPoint刚好指向一个等于k的位置
    while (rightPoint <= right && nums[rightPoint] <= k) rightPoint++ // 此时rightPoint刚好指向第一个大于等于k的位置  也就是左闭右开区间
    count += rightPoint - leftPoint
  }
  return count
};