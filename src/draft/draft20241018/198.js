/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
  const n = nums.length
  let memo = new Array(n).fill(-1)
  const dfs = (i) => {
    if (i < 0) return 0
    if (memo[i] != -1) return memo[i]
    let res = Math.max(dfs(i - 1), dfs(i - 2) + nums[i])
    return memo[i] = res
  }
  return dfs(n - 1)

};

/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
  const n = nums.length
  const dp = new Array(n + 2).fill(0)
  for (let i = 2; i < n + 2; i++) {
    dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i - 2])
  }
  return dp[n + 1]

};

/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
  const n = nums.length
  const dp = new Array(n + 2).fill(0)
  for (let i = 0; i < n; i++) {
    dp[i + 2] = Math.max(dp[i + 1], dp[i] + nums[i])
  }
  return dp[n + 1]

};

/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
  const n = nums.length
  let f0 = 0, f1 = 0;
  for (let i = 0; i < n; i++) {
    let newF = Math.max(f1, f0 + nums[i])
    f0 = f1
    f1 = newF
  }
  return f1
};