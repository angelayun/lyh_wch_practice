/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var minOperations = function (nums, k) {
  let cnt = 0;
  for (let x of nums) {
    if (x < k) cnt++;
  }
  return cnt;
};
