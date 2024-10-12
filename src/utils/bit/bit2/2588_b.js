/**
 * @param {number[]} nums
 * @return {number}
 */
var beautifulSubarrays = function (nums) {
  // 位上是偶数位1 1^1=0 前缀和相等  异或的前缀和
  let cnt = new Map([[0, 1]])
  let s = 0
  let ans = 0
  for (let x of nums) {
    s ^= x
    ans += cnt.get(s) || 0
    cnt.set(s, (cnt.get(s) || 0) + 1)
  }
  return ans
};