const bitCount = (n) => {
  let count = 0;
  while (n) {
    n &= n - 1;
    count++;
  }
  return count;
};
/**
 * @param {number[]} strength
 * @param {number} K
 * @return {number}
 */
var findMinimumTime = function (strength, k) {
  const n = strength.length;
  let memo = new Array(1 << n).fill(-1);
  const dfs = (i) => {
    if (i == 0) return 0;
    if (memo[i] != -1) return memo[i];
    let x = 1 + k * (n - bitCount(i));
    let res = Number.MAX_SAFE_INTEGER;
    for (let j = 0; j < n; j++) {
      if (((i >> j) & 1) > 0) {
        res = Math.min(res, dfs((i ^ (1 << j)) + (strength[j] - 1) / x + 1));
      }
    }
    return (memo[i] = res);
  };
  let aaa = dfs((1 << n) - 1);
  console.log(aaa);
  return 2;
};
// 这个还没写通过  不知道啥情况
