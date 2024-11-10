/**
 * @param {string} s1
 * @param {string} s2
 * @param {string} s3
 * @return {boolean}
 */
var isInterleave = function (s1, s2, s3) {
  let n = s1.length,
    m = s2.length;
  if (n + m != s3.length) return false;
  if (n == 0) return s2 == s3;
  if (m == 0) return s1 == s3;
  let memo = Array.from({ length: n }, () => new Array(m).fill(-1));
  const dfs = (i, j) => {
    if (i < 0) {
      // 如果s1都判断完了  判断剩余的s2是否满足条件
      for (let k = 0; k <= j; k++) {
        if (s2[k] != s3[k]) return false;
      }
      return true;
    }
    if (j < 0) {
      // 如果s2都判断完了  判断剩余的s1是否满足条件
      for (let k = 0; k <= i; k++) {
        if (s1[k] != s3[k]) return false;
      }
      return true;
    }
    if (memo[i][j] != -1) return memo[i][j];
    return (memo[i][j] =
      (s1[i] == s3[i + j + 1] && dfs(i - 1, j)) ||
      (s2[j] == s3[i + j + 1] && dfs(i, j - 1)));
  };
  return dfs(n - 1, m - 1);
};

/**
 * @param {string} s1
 * @param {string} s2
 * @param {string} s3
 * @return {boolean}
 */
var isInterleave = function (s1, s2, s3) {
  let n = s1.length,
    m = s2.length;
  if (n + m != s3.length) return false;
  if (n == 0) return s2 == s3;
  if (m == 0) return s1 == s3;
  let dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(false));
  dp[0][0] = true;

  // 第0行进行初始化
  for (let j = 1; j <= m; j++) {
    dp[0][j] = s2[j - 1] == s3[j - 1] && dp[0][j - 1];
  }
  // 第0列进行初始化
  for (let i = 1; i <= n; i++) {
    dp[i][0] = s1[i - 1] == s3[i - 1] && dp[i - 1][0];
  }
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      dp[i + 1][j + 1] =
        (s1[i] == s3[i + j + 1] && dp[i][j + 1]) ||
        (s2[j] == s3[i + j + 1] && dp[i + 1][j]);
    }
  }
  return dp[n][m];
};

var isInterleave = function (s1, s2, s3) {
  let n = s1.length,
    m = s2.length;
  if (n + m != s3.length) return false;
  if (n == 0) return s2 == s3;
  if (m == 0) return s1 == s3;
  let dp = new Array(m + 1).fill(false);
  dp[0] = true;

  // 第0行进行初始化
  for (let j = 1; j <= m; j++) {
    dp[j] = s2[j - 1] == s3[j - 1] && dp[j - 1];
  }
  for (let i = 0; i < n; i++) {
    dp[0] = dp[0] && s1[i] == s3[i];
    for (let j = 0; j < m; j++) {
      dp[j + 1] =
        (s1[i] == s3[i + j + 1] && dp[j + 1]) ||
        (s2[j] == s3[i + j + 1] && dp[j]);
    }
  }
  return dp[m];
};
