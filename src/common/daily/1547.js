var minCost = function (n, cuts) {
  cuts.push(0);
  cuts.push(n);
  cuts.sort((a, b) => a - b);

  const m = cuts.length;
  const memo = Array.from({ length: m }, () => Array(m));
  // 切割一根左端点为 cuts[i]，右端点为 cuts[j] 的棍子的最小成本。
  function dfs(i, j) {
    if (i + 1 === j) {
      // 无需切割
      return 0;
    }
    if (memo[i][j]) {
      // 之前计算过
      return memo[i][j];
    }
    let res = Infinity;
    for (let k = i + 1; k < j; k++) {
      res = Math.min(res, dfs(i, k) + dfs(k, j));
    }
    return (memo[i][j] = res + cuts[j] - cuts[i]);
  }
  return dfs(0, m - 1);
};

var minCost = function (n, cuts) {
  cuts.push(0);
  cuts.push(n);
  cuts.sort((a, b) => a - b);

  const m = cuts.length;
  // f[i][j] 的定义和 dfs(i,j) 的定义是一样的，都表示切割一根左端点为 cuts[i]，右端点为 cuts[j] 的棍子的最小成本。
  const f = Array.from({ length: m }, () => Array(m).fill(0));
  // 要计算 f[i][j]，必须先把 f[k][j] 算出来，由于 i<k，那么只有 i 从大到小枚举才能做到。同理，必须先把同一行的 f[i][k] 算出来，由于 j>k，那么只有 j 从小到大枚举才能做到。
  for (let i = m - 3; i >= 0; i--) {
    for (let j = i + 2; j < m; j++) {
      let res = Infinity;
      for (let k = i + 1; k < j; k++) {
        res = Math.min(res, f[i][k] + f[k][j]);
      }
      f[i][j] = res + cuts[j] - cuts[i];
    }
  }
  return f[0][m - 1];
};
