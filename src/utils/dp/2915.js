/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var lengthOfLongestSubsequence = function (nums, target) {
  let f = new Array(target + 1).fill(Number.MIN_SAFE_INTEGER)
  f[0] = 0
  let s = 0
  for (let x of nums) {
    s = Math.min(s + x, target)
    for (let j = s; j >= x; j--) {
      f[j] = Math.max(f[j], f[j - x] + 1)
    }
  }
  return f[target] > 0 ? f[target] : -1
};