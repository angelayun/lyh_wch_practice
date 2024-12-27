/**
 * @param {number[]} nums
 * @return {number}
 */
var beautifulSubarrays = function (nums) {
  let ans = 0;
  // 求的是子数组异或和为0的个数
  let xor = 0;
  let cnt = new Map([[0, 1]]);
  for (let x of nums) {
    xor ^= x;
    ans += cnt.get(xor) ?? 0;
    cnt.set(xor, (cnt.get(xor) || 0) + 1);
  }
  return ans;
};
