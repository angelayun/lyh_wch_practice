/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var lengthOfLongestSubsequence = function (nums, target) {
  const n = nums.length;
  const memo = Array.from({ length: n }, () => new Array(target + 1).fill(-1));
  // 从前i个数中选择 值为c的长度最大值
  const dfs = (i, c) => {
    if (i < 0) {
      return c == 0 ? 0 : -Infinity;
    }
    if (memo[i][c] != -1) return memo[i][c];
    let res = 0;
    if (c < nums[i]) {
      return (memo[i][c] = dfs(i - 1, c));
    }

    return (memo[i][c] = Math.max(dfs(i - 1, c), dfs(i - 1, c - nums[i]) + 1));
  };
  let ans = dfs(n - 1, target);
  return ans > -1 ? ans : -1;
};

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var lengthOfLongestSubsequence = function (nums, target) {
  const n = nums.length;
  const dp = Array.from({ length: n + 1 }, () =>
    new Array(target + 1).fill(-Infinity)
  );
  dp[0][0] = 0;
  for (let i = 0; i < n; i++) {
    for (let c = 0; c <= target; c++) {
      if (nums[i] > c) {
        dp[i + 1][c] = dp[i][c];
      } else {
        dp[i + 1][c] = Math.max(dp[i][c], dp[i][c - nums[i]] + 1);
      }
    }
  }
  let ans = dp[n][target];
  console.log(ans)
  // return ans <= 0 ? -1 : ans;
  return 0
};
