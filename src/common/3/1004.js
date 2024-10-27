/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var longestOnes = function (nums, k) {
  const n = nums.length
  let zeroCount = 0
  let ans = 0
  for (let left = 0, right = 0; right < n; right++) {
    if (nums[right] == '0') zeroCount++
    while (zeroCount > k) {
      if (nums[left] == '0') {
        zeroCount--
      }
      left++
    }
    ans = Math.max(ans, right - left + 1)
  }
  return ans
};