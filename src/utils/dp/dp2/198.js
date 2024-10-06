/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
  const n = nums.length
  /* const memo = new Array(n).fill(-1)
  const dfs = (i) => {
    if (i < 0) return 0
    if (memo[i] != -1) return memo[i]
    return memo[i] = Math.max(dfs(i - 1), dfs(i - 2) + nums[i])
  }
  return dfs(n - 1) */
  // 不偏移dp 偏移nums[i]也行
  /* let dp = new Array(n + 2).fill(0)
  for (let i = 2; i < dp.length; i++) {
    dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i - 2])
  }
  return dp[dp.length - 1] */
  let f0 = 0, f1 = 0
  for (let i = 0; i < n; i++) {
    // dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i])
    let newF = Math.max(f1, f0 + nums[i])
    f0 = f1
    f1 = newF
  }
  return f1
};