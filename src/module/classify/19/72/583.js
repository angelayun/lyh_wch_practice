/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance = function (word1, word2) {
  const n = word1.length,
    m = word2.length;
  let memo = Array.from({ length: n }, () => new Array(m).fill(-1));
  const dfs = (i, j) => {
    // 边界条件  当i走到-1或者说没有位置的时候  j剩余多少个字符
    if (i < 0) return j + 1;
    if (j < 0) return i + 1;
    if (memo[i][j] != -1) return memo[i][j];
    if (word1[i] == word2[j]) return (memo[i][j] = dfs(i - 1, j - 1));
    return (memo[i][j] = Math.min(dfs(i - 1, j), dfs(i, j - 1)) + 1);
  };
  return dfs(n - 1, m - 1);
};

/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance = function (word1, word2) {
  const n = word1.length,
    m = word2.length;
  // 相同于第0行第0列就是dummyNode哨兵节点的感觉
  let dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
  //第一行[0][j] 初始化为j
  for (let i = 0; i <= m; i++) {
    dp[0][i] = i;
  }
  //第一列[i][0]，初始化为i
  for (let i = 0; i <= n; i++) {
    dp[i][0] = i;
  }
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (word1[i] == word2[j]) dp[i + 1][j + 1] = dp[i][j];
      else dp[i + 1][j + 1] = Math.min(dp[i][j + 1], dp[i + 1][j]) + 1;
    }
  }
  return dp[n][m];
};

/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance = function (word1, word2) {
  const n = word1.length,
    m = word2.length;
  // 相同于第0行第0列就是dummyNode哨兵节点的感觉
  let dp = new Array(m + 1).fill(0);
  for (let i = 0; i <= m; i++) {
    dp[i] = i;
  }
  for (let i = 0; i < n; i++) {
    dp[0] = i + 1
    let pre = i;
    for (let j = 0; j < m; j++) {
      let t = dp[j + 1];
      if (word1[i] == word2[j]) dp[j + 1] = pre;
      else {
        dp[j + 1] = Math.min(dp[j], dp[j + 1]) + 1;
      }
      pre = t;
    }
  }
  return dp[m];
};
