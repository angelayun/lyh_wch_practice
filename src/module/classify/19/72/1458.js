/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var maxDotProduct = function (nums1, nums2) {
  const n = nums1.length,
    m = nums2.length;
  let memo = Array.from({ length: n }, () => new Array(m).fill(-Infinity));
  const dfs = (i, j) => {
    if (i < 0 || j < 0) return -Infinity;
    if (memo[i][j] != -Infinity) return memo[i][j];
    // 选  同时看前面位置的最大点积dfs(i−1,j−1)是否大于0，如果小于0的话，越加越小，不如不要，跟0取max就可以实现
    memo[i][j] = Math.max(dfs(i - 1, j - 1), 0) + nums1[i] * nums2[j];
    // 如果不选的话
    memo[i][j] = Math.max(dfs(i - 1, j), dfs(i, j - 1), memo[i][j]);
    return memo[i][j];
  };
  return dfs(n - 1, m - 1);
};

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var maxDotProduct = function (nums1, nums2) {
  const n = nums1.length,
    m = nums2.length;
  let dp = Array.from({ length: n + 1 }, () =>
    new Array(m + 1).fill(-Infinity)
  );
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      dp[i + 1][j + 1] = Math.max(
        Math.max(dp[i][j], 0) + nums1[i] * nums2[j],
        dp[i][j + 1],
        dp[i + 1][j]
      );
    }
  }
  return dp[n][m];
};

var maxDotProduct = function (nums1, nums2) {
  const n = nums1.length,
    m = nums2.length;
  let dp = Array.from({ length: n + 1 }, () =>
    new Array(m + 1).fill(-Infinity)
  );
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      dp[i + 1][j + 1] = Math.max(
        Math.max(dp[i][j], 0) + nums1[i] * nums2[j],
        dp[i][j + 1],
        dp[i + 1][j]
      );
    }
  }
  return dp[n][m];
};

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var maxDotProduct = function (nums1, nums2) {
  const n = nums1.length,
    m = nums2.length;
  let dp = new Array(m + 1).fill(-Infinity);

  for (let i = 0; i < n; i++) {
    // 相当于初始化第一列
    dp[0] = -Infinity;
    let pre = -Infinity;
    for (let j = 0; j < m; j++) {
      let temp = dp[j + 1];
      dp[j + 1] = Math.max(
        Math.max(pre, 0) + nums1[i] * nums2[j],
        dp[j + 1],
        dp[j]
      );
      pre = temp;
    }
  }
  return dp[m];
};
