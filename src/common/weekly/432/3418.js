/**
 * @param {number[][]} coins
 * @return {number}
 */
var maximumAmount = function (coins) {
  const rows = coins.length,
    cols = coins[0].length;
  let memo = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () =>
      new Array(3).fill(Number.MIN_SAFE_INTEGER)
    )
  );
  const dfs = (i, j, k) => {
    if (i < 0 || j < 0) return Number.MIN_SAFE_INTEGER;
    let x = coins[i][j];
    if (i == 0 && j == 0) {
      return k > 0 ? Math.max(x, 0) : x;
    }
    if (memo[i][j][k] != Number.MIN_SAFE_INTEGER) return memo[i][j][k];
    // 选
    let res = Math.max(dfs(i - 1, j, k), dfs(i, j - 1, k)) + x;
    if (k && x < 0) {
      // 不选
      res = Math.max(res, dfs(i - 1, j, k - 1), dfs(i, j - 1, k - 1));
    }
    return (memo[i][j][k] = res);
  };
  return dfs(rows - 1, cols - 1, 2);
};
