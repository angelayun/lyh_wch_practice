/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var longestOnes = function (nums, k) {
  // 给定一个二进制数组 nums 和一个整数 k，如果可以翻转最多 k 个 0 ，则返回 数组中连续 1 的最大个数 。
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