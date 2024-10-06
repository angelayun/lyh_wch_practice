/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
  // dp[i] 打劫前i间房屋可获得的最高金额
  const n = nums.length
  /* let dp = new Array(n + 2).fill(0)
  for (let i = 0; i < n; i++) {
    dp[i + 2] = Math.max(dp[i] + nums[i], dp[i + 1])
  }
  return dp[n + 1] */
  let f0 = 0, f1 = 0
  for (let i = 0; i < n; i++) {
    /* f0 = f1
    f1 = Math.max(f0 + nums[i], f1) */
    // 必须写成下面这样  不能用上面注释的那俩句
    [f0, f1] = [f1, Math.max(f0 + nums[i], f1)]
  }
  return f1
};