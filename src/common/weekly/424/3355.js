/**
 * @param {number[]} nums
 * @param {number[][]} queries
 * @return {boolean}
 */
var isZeroArray = function (nums, queries) {
  let n = nums.length;
  let diff = new Array(n + 1).fill(0);
  for (let [l, r] of queries) {
    diff[l]++;
    diff[r + 1]--;
  }
  let sumD = 0;
  for (let i = 0; i < n; i++) {
    sumD += diff[i];
    // 此时sumD中表示x=nums[i]要减掉多少
    if (x > sumD) {
      return false;
    }
  }
  return true;
};
