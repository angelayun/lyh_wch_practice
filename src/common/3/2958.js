/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maxSubarrayLength = function (nums, k) {
  let ans = 0
  const n = nums.length
  let cnt = new Map()
  for (let left = 0, right = 0; right < n; right++) {
    let x = nums[right]
    cnt.set(x, (cnt.get(x) || 0) + 1)
    while (cnt.get(x) > k) {
      let y = nums[left]
      cnt.set(y, (cnt.get(y) || 0) - 1)
      left++
    }
    ans = Math.max(ans, right - left + 1)
  }
  return ans
};