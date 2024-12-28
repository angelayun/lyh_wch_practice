/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKOr = function (nums, k) {
  let ans = 0;
  for (let i = 0; i < 32; i++) {
    let cnt = 0;
    for (let x of nums) {
      cnt += (x >> i) & 1;
    }
    if (cnt >= k) {
      ans |= 1 << i;
    }
  }
  return ans;
};
