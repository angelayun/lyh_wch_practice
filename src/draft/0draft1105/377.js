/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var combinationSum4 = function (nums, target) {
  const n = nums.length;
  let dp = () => new Array(target + 1).fill(0);
  dp[0] = 1;
  for (let i = 0; i <= target; i++) {
    for (let x of nums) {
      let x = nums[i];
      if (x < i) {
        dp[i] += dp[i - x];
      }
    }
  }
  return dp[target];
};
