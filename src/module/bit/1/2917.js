/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKOr = function (nums, k) {
  let res = 0;
  for (let i = 0; i < 32; i++) {
    let count = 0;
    for (let x of nums) {
      if ((x >> i) & 1) count++;
    }
    if (count >= k) {
      res |= 1 << i;
    }
  }
  return res;
};
