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
      // 出现次数最多
      maxCnt = Math.max(maxCnt, cnt.get(x));
      if (i - j + 1 == cnt.size * maxCnt) {
        res = Math.min(res, dfs(j - 1) + 1);
      }
    }
    return (memo[i] = res);
  };
  return dfs(n - 1);
};
