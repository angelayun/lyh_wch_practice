/**
 * @param {number[]} nums
 * @param {number[][]} queries
 * @return {boolean[]}
 */
var isArraySpecial = function (nums, queries) {
  const n = nums.length;
  let preSum = new Array(n).fill(0);
  for (let i = 1; i < n; i++) {
    preSum[i] += preSum[i - 1] + ((nums[i] & 1) == (nums[i - 1] & 1) ? 1 : 0);
  }
  let ans = [];
  for (let [l, r] of queries) {
    ans.push(preSum[r] - preSum[l] > 0 ? false : true);
  }
  return ans;
};
