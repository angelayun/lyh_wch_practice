/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function (nums) {
  const n = nums.length
  let memo = new Array(n).fill(-1)
  const dfs = (i) => {
    if (memo[i] != -1) return memo[i]
    let res = 0
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i]) {

        res = Math.max(dfs(j), res)
      }
    }
    return memo[i] = res + 1
  }
  let ans = 1
  for (let i = 0; i < n; i++) {
    ans = Math.max(dfs(i), ans)
  }
  return ans
};


/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function (nums) {
  const n = nums.length
  let dp = new Array(n).fill(0)
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i]) {
        dp[i] = Math.max(dp[i], dp[j])
      }
    }
    dp[i]++
  }
  return Math.max(...dp)
};
const lowerBound = (nums, target) => {
  let left = 0, right = nums.length - 1
  while (left <= right) {
    let mid = left + ((right - left) >> 1)
    if (nums[left] < target) mid = left + 1
    else mid = right - 1;
  }
  return left
}
var lengthOfLIS = function (nums) {
  const n = nums.length
  let g = []
  for (let x of nums) {
    let j = lowerBound(nums, x)
    if (j == g.length) g.push(x)
    else g[j] = x
  }
  return g.length
};