/**
 * @param {number[]} nums
 * @return {number}
 */
var beautifulSubarrays = function (nums) {
  // 首先求的是子数组；在某一位上出现1的次数是偶数，1^1=0
  let s = 0
  let cnt = new Map()
  let ans = 0
  for (let x of nums) {
    s ^= x;
    ans += cnt.get(s) || 0
    cnt.set(s, (cnt.get(s) || 0) + 1)
  }
  return ans
};