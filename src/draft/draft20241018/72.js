/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance = function (word1, word2) {
  const n = word1.length, m = word2.length
  let memo = Array.from({ length: n }, () => new Array(m).fill(-1))
  const dfs = (i, j) => {
    // 这里的i j都是从0开始计数的  当j=2时  事实上需要编辑的个数为3
    if (i < 0) return j + 1
    else if (j < 0) return i + 1
    if (memo[i][j] != -1) return memo[i][j]
    // 当这两者相等时
    if (word1[i] == word2[j]) {
      return memo[i][j] = dfs(i - 1, j - 1)
    }
    // 删了word1中的某个  或者替换word1中的对应值为words2中对应的值
    return memo[i][j] = Math.min(dfs(i - 1, j), dfs(i, j - 1), dfs(i - 1, j - 1)) + 1
  }
  return dfs(n - 1, m - 1)
};
/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance = function (word1, word2) {
  const n = word1.length, m = word2.length
  const dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0))
  for (let j = 1; j <= m; j++) {
    dp[0][j] = j;
  }
  for (let i = 0; i < n; i++) {
    // 边界条件需要处理
    dp[i + 1][0] = i + 1
    for (let j = 0; j < m; j++) {
      if (word1[i] == word2[j]) {
        dp[i + 1][j + 1] = dp[i][j]
      } else {
        dp[i + 1][j + 1] = Math.min(dp[i][j + 1], dp[i + 1][j], dp[i][j]) + 1
      }
    }
  }
  return dp[n][m]
};
// 递推的空间优化的写法
var minDistance = function (word1, word2) {
  const n = word1.length, m = word2.length
  const dp = Array.from({ length: 2 }, () => new Array(m + 1).fill(0))
  for (let j = 1; j <= m; j++) {
    dp[0][j] = j;
  }
  for (let i = 0; i < n; i++) {
    // 边界条件需要处理
    dp[(i + 1) % 2][0] = i + 1
    for (let j = 0; j < m; j++) {
      if (word1[i] == word2[j]) {
        dp[(i + 1) % 2][j + 1] = dp[i % 2][j]
      } else {
        dp[(i + 1) % 2][j + 1] = Math.min(dp[i % 2][j + 1], dp[(i + 1) % 2][j], dp[i % 2][j]) + 1
      }
    }
  }
  return dp[n % 2][m]
};