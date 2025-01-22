/**
 * @param {number[][]} piles
 * @param {number} k
 * @return {number}
 */
var maxValueOfCoins = function (piles, k) {
  const n = piles.length;
  let memo = Array.from({ length: n }, () => new Array(k + 1).fill(0));
  const dfs = (i, j) => {
    if (i < 0) return 0;
    if (memo[i][j] != 0) return memo[i][j];
    // 不选这一组中的任何物品
    let res = dfs(i - 1, j);
    let v = 0;
    for (let w = 0; w < Math.min(j, piles[i].length); w++) {
      v += piles[i][w];
      res = Math.max(res, dfs(i - 1, j - w - 1) + v);
    }
    return (memo[i][j] = res);
  };
  return dfs(n - 1, k);
};
