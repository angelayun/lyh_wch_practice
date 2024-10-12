/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var minimumSubarrayLength = function (nums, k) {
  let count = 0
  const n = nums.length
  for (let right = 0; right < n; right++) {

    for (let left = right - 1; left >= 0; left--) {
      if (nums[left] == (nums[left] | nums[right])) break
      nums[left] |= nums[right]

    }
    if (nums[right] >= k) {
      count++
    }
  }
  return count
};
// 这一题目暂时没写出来  上面写的不对