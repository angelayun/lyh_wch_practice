/**
 * @param {number[]} nums
 * @param {number} maximumBit
 * @return {number[]}
 */
var getMaximumXor = function (nums, maximumBit) {
  const n = nums.length;
  let res = new Array(n).fill(0);
  let xor = 0;
  for (let i = 0; i < n; i++) {
    xor ^= nums[i];
    // 枚举低maximumBit位
    let k = 0;
    for (let j = 0; j < maximumBit; j++) {
      if (((1 << j) & xor) == 0) {
        // 这个数位上现在是0 可以让k对应位上的值为1  这样异或值最大
        k |= 1 << j;
      }
    }
    res[n - i - 1] = k;
  }
  return res;
};
