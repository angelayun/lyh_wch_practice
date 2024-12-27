/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySum = function (nums, k) {
  let cnt = new Map([[0, 1]]);
  let ans = 0;
  let preSum = 0;
  for (let x of nums) {
    preSum += x;
    ans += cnt.get(preSum - k) ?? 0;
    cnt.set(preSum, (cnt.get(preSum) || 0) + 1);
  }
  return ans;
};
