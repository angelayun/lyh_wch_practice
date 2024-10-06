/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var combinationSum4 = function (nums, target) {
  /* let memo = new Array(target + 1).fill(-1)
  const dfs = (i) => {
    // 爬第0阶只有1种方案
    if (i <= 0) return 1
    if (memo[i] != -1) return memo[i]
    let res = 0
    for (let x of nums) {
      if (x <= i) {
        res += dfs(i - x)
      }
    }
    return memo[i] = res
  }
  return dfs(target) */
  let dp = new Array(target + 1).fill(0)
  dp[0] = 1
  for (let i = 1; i <= target; i++) {
    let res = 0
    for (let x of nums) {
      if (i > x) {
        res += dp[i - x]
      }
    }
    dp[i] = res
  }
  return dp[target]
};