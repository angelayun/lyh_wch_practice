/**
 * @param {string} s
 * @return {number}
 */
var minimumSubstringsInPartition = function (s) {
  const n = s.length;
  let memo = new Array(n).fill(-1);
  const dfs = (i) => {
    if (i < 0) return 0;
    if (memo[i] != -1) return memo[i];
    let res = Number.MAX_SAFE_INTEGER;
    let cnt = new Array(26).fill(0);
    let maxCount = 0;
    let k = 0;
    for (let j = i; j >= 0; j--) {
      let index = s[j].charCodeAt() - 'a'.charCodeAt();
      cnt[index]++;
      if (cnt[index] == 1) k++;
      maxCount = Math.max(maxCount, cnt[index]);
      if (maxCount * k == i - j + 1) {
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
    let cnt = new Array(26).fill(0);
    let maxCount = 0;
    let k = 0;
    for (let j = i; j >= 1; j--) {
      let index = s[j - 1].charCodeAt() - 'a'.charCodeAt();
      cnt[index]++;
      if (cnt[index] == 1) k++;
      maxCount = Math.max(maxCount, cnt[index]);
      if (maxCount * k == i - j + 1) {
        dp[i] = Math.min(dp[i], dp[j - 1] + 1);
      }
    }
  }
  return dp[n];
};
