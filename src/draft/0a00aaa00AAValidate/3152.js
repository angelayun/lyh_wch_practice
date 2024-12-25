/**
 * @param {number[]} nums
 * @param {number[][]} queries
 * @return {boolean[]}
 */
var isArraySpecial = function (nums, queries) {
  let preSum = [0];
  for (let i = 1; i < nums.length; i++) {
    preSum.push(
      preSum[preSum.length - 1] + ((nums[i] & 1) == (nums[i - 1] & 1) ? 1 : 0)
    );
  }
  let res = [];
  for (let [start, end] of queries) {
    res.push(preSum[end] - preSum[start] > 0 ? false : true);
  }
  return res;
};
