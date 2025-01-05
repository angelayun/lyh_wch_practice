/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubarrays = function (nums) {
  let cnt = 0;
  let mask = -1;
  for (let x of nums) {
    mask &= x;
    if (mask == 0) {
      cnt++;
      mask = -1;
    }
  }
  return Math.max(cnt, 1);
};
