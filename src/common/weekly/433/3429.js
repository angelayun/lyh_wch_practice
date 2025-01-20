/**
 * @param {number} n
 * @param {number[][]} cost
 * @return {number}
 */
var minCost = function (n, cost) {
  let memo = Array.from({ length: n >> 1 }, () =>
    Array.from({ length: 4 }, () => new Array(4).fill(-1))
  );
  const dfs = (i, preJ, preK) => {
    if (i < 0) return 0;
    if (memo[i][preJ][preK] != -1) return memo[i][preJ][preK];
    let res = Number.MAX_SAFE_INTEGER;
    for (let j = 0; j < 3; j++) {
      if (j == preJ) continue;
      for (let k = 0; k < 3; k++) {
        if (k != preK && k != j) {
          res = Math.min(
            res,
            dfs(i - 1, j, k) + cost[i][j] + cost[cost.length - 1 - i][k]
          );
        }
      }
    }
    return (memo[i][preJ][preK] = res);
  };
  return dfs((n >> 1) - 1, 3, 3);
};
