/**
 * @param {number[]} nums
 * @param {number[][]} queries
 * @return {boolean[]}
 */
var isArraySpecial = function (nums, queries) {
  const n = nums.length;
  let preSum = [0];
  for (let i = 0; i < n; i++) {
    preSum.push(
      preSum[preSum.length - 1] + ((nums[i] & 1) == (nums[i - 1] & 1) ? 1 : 0)
    );
  }
  let ans = [];
  for (let [start, end] of queries) {
    ans.push(preSum[end] - preSum[start] > 0 ? true : false);
  }
  return ans;
};
