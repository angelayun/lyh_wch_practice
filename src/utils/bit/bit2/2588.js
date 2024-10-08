/**
 * @param {number[]} nums
 * @return {number}
 */
var beautifulSubarrays = function (nums) {
  /* 
  1、需要两个数在第k位上都是1  所以是偶数个1
  2、1^1=0 就可以把偶数个1变成0
  3、前缀和相等  这里可以类比异或和
   */
  let cnt = new Map([[0, 1]])
  let s = 0
  let ans = 0
  for (let x of nums) {
    s ^= x
    ans += cnt.get(s) || 0
    cnt.set(x, (cnt.get(x) || 0) + 1)
  }
  return ans
};