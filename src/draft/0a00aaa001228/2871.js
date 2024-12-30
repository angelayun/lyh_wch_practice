/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubarrays = function (nums) {
  let ands = -1;
  let count = 0;
  const n = nums.length;
  for (let i = 0; i < n; i++) {
    let x = nums[i];
    ands &= x;
    if (ands == 0) {
      ands = -1;
      count++;
    }
  }
  return Math.max(count, 1);
};
