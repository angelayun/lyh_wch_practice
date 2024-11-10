/**
 * @param {string} s1
 * @param {string} s2
 * @return {number}
 */
var minimumDeleteSum = function (s1, s2) {
  const n = s1.length,
    m = s2.length;
  let memo = Array.from({ length: n }, () => new Array(m).fill(-1));

  const dfs = (i, j) => {
    if (i < 0) {
      let sum = 0;
      for (let k = 0; k <= j; k++) {
        sum += s2[k].charCodeAt();
      }
      return sum;
    }
    if (j < 0) {
      let sum = 0;
      for (let k = 0; k <= i; k++) {
        sum += s1[k].charCodeAt();
      }
      return sum;
    }
    if (memo[i][j] != -1) return memo[i][j];

    if (s1[i] == s2[j]) return (memo[i][j] = dfs(i - 1, j - 1));
    return (memo[i][j] = Math.min(
      dfs(i - 1, j) + s1[i].charCodeAt(),
      dfs(i, j - 1) + s2[j].charCodeAt()
    ));
  };
  return dfs(n - 1, m - 1);
};

/**
 * @param {string} s1
 * @param {string} s2
 * @return {number}
 */
var minimumDeleteSum = function (s1, s2) {
  const n = s1.length,
    m = s2.length;
  // 相同于第0行第0列就是dummyNode哨兵节点的感觉
  let dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
  let sum = 0;
  // 初始化第一行
  for (let i = 0; i <= m; i++) {
    dp[0][i] = sum;
    sum += s2[i] != null ? s2[i].charCodeAt() : 0;
  }
  // 初始化第一列
  sum = 0;
  for (let i = 0; i <= n; i++) {
    dp[i][0] = sum;
    sum += s1[i] != null ? s1[i].charCodeAt() : 0;
  }
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (s1[i] == s2[j]) dp[i + 1][j + 1] = dp[i][j];
      else
        dp[i + 1][j + 1] = Math.min(
          dp[i][j + 1] + s1[i].charCodeAt(),
          dp[i + 1][j] + s2[j].charCodeAt()
        );
    }
  }
  return dp[n][m];
};

/**
 * @param {string} s1
 * @param {string} s2
 * @return {number}
 */
var minimumDeleteSum = function (s1, s2) {
  const n = s1.length,
    m = s2.length;
  // 相同于第0行第0列就是dummyNode哨兵节点的感觉
  let dp = new Array(m + 1).fill(0);
  let sum = 0;
  for (let i = 0; i <= m; i++) {
    dp[i] = sum;
    sum += s2[i].charCodeAt();
  }
  sum = 0;
  for (let i = 0; i < n; i++) {
    let pre = sum;
    sum += s1[i].charCodeAt();
    dp[0] = sum;
    for (let j = 0; j < m; j++) {
      let t = dp[j + 1];
      if (s1[i] == s2[j]) dp[j + 1] = pre;
      else {
        dp[j + 1] = Math.min(
          dp[j] + s2[j].charCodeAt(),
          dp[j + 1] + s1[i].charCodeAt()
        );
      }
      pre = t;
    }
  }
  return dp[m];
};
