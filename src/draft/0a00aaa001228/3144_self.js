/**
 * @param {string} s
 * @return {number}
 */
var minimumSubstringsInPartition = function (s) {
  const n = s.length;
  let memo = new Array(n).fill(-1);
  const dfs = (i) => {
    if (i < 0) {
      return 0;
    }
    if (memo[i] != -1) return memo[i];
    let res = Number.MAX_SAFE_INTEGER;
    let cnt = new Map();
    let maxCnt = Number.MIN_SAFE_INTEGER;
    for (let j = i; j >= 0; j--) {
      let x = s[j];
      cnt.set(x, (cnt.get(x) || 0) + 1);
      maxCnt = Math.max(maxCnt, cnt.get(x));
      if (i - j + 1 == cnt.size * maxCnt) {
        res = Math.min(res, dfs(j - 1) + 1);
      }
    }
    return (memo[i] = res);
  };
  return dfs(n - 1);
};

/**
 * @param {string} s
 * @return {number}
 */
var minimumSubstringsInPartition = function (s) {
  const n = s.length;
  let dp = new Array(n + 1).fill(Number.MAX_SAFE_INTEGER);
  dp[0] = 0;
  for (let i = 1; i <= n; i++) {
    let cnt = new Map();
    let maxCnt = Number.MIN_SAFE_INTEGER;
    for (let j = i; j >= 0; j--) {
      if (j == i && dp[j] == Number.MAX_SAFE_INTEGER) dp[j] = 1;
      let x = s[j];
      cnt.set(x, (cnt.get(x) || 0) + 1);
      maxCnt = Math.max(maxCnt, cnt.get(x));
      if (i - j + 1 == cnt.size * maxCnt) {
        // res = Math.min(res, dfs(j - 1) + 1);
        dp[i + 1] = Math.min(dp[i + 1], dp[j] + 1);
      }
    }
  }
  console.log(dp);
  return dp[n];
};
