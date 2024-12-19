/**
 * @param {number[]} nums
 * @param {number} maximumBit
 * @return {number[]}
 */
var getMaximumXor = function (nums, maximumBit) {
  // 本质上是怎么样让异或结果值最大  只有对应位是0的时候  你是1（不需要考虑它是1的时候 因为你的mask位对应都是0 ）
  const n = nums.length;
  let res = new Array(n).fill(0);
  let xor = 0;
  for (let i = 0; i < n; i++) {
    xor ^= nums[i];
    let k = 0;
    for (let j = 0; j < maximumBit; j++) {
      if ((xor & (1 << j)) == 0) {
        k |= 1 << j;
      }
    }
    res[n - i - 1] =  k;
  }
  return res;
};
