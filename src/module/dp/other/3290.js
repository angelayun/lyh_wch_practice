/**
 * @param {number[]} a
 * @param {number[]} b
 * @return {number}
 */
var maxScore = function (a, b) {
  const n = b.length;
  let memo = Array.from({ length: n }, () => new Array(4).fill(-Infinity));
  const dfs = (i, j) => {
    // 选完了
    if (j < 0) return 0;
    // 没选完
    if (i < 0) return -Infinity;
    if (memo[i][j] != -Infinity) {
      return memo[i][j];
    }
    return (memo[i][j] = Math.max(
      dfs(i - 1, j),
      dfs(i - 1, j - 1) + a[j] * b[i]
    ));
  };
  let ans = dfs(n - 1, 3);
  return ans;
};

/**
 * @param {number[]} a
 * @param {number[]} b
 * @return {number}
 */
var maxScore = function (a, b) {
  const n = b.length;
  // TODO 这个初始值的不好写呀
  let dp = Array.from({ length: n + 1 }, () => new Array(5).fill(0));
  dp[0][1] = -Infinity;
  dp[0][2] = -Infinity;
  dp[0][3] = -Infinity;
  dp[0][4] = -Infinity;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < 4; j++) {
      dp[i + 1][j + 1] = Math.max(dp[i][j + 1], dp[i][j] + a[j] * b[i]);
    }
  }
  return dp[n][4];
};

/**
 * @param {number[]} a
 * @param {number[]} b
 * @return {number}
 */
var maxScore = function (a, b) {
  const n = b.length;
  let dp = new Array(5).fill(-Infinity);
  dp[0] = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 3; j >=0; j--) {
      dp[j + 1] = Math.max(dp[j + 1], dp[j] + a[j] * b[i]);
    }
  }
  return dp[4];
};
