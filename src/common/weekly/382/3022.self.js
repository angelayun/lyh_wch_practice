/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var minOrAfterOperations = function (nums, k) {
  let ans = 0;
  let mask = 0;
  for (let b = 29; b >= 0; b--) {
    let cnt = 0;
    mask |= 1 << b;
    let and = -1;
    for (let x of nums) {
      and &= x & mask;
      if (and) cnt++;
      else {
        and = -1;
      }
    }
    if (cnt > k) {
      ans |= 1 << b;

      mask ^= 1 << b;
    }
  }
  return ans;
};
