/**
 * @param {number[][]} grid
 * @return {number}
 */
var minimumOperations = function (grid) {
  let m = grid.length;
  let n = grid[0].length;
  // 统计每一列的每种元素的出现次数到 cnt 数组中，其中 cnt[i][x] 表示第 i 列元素 x 的出现次数。
  let cnt = Array.from({ length: n }, () => new Array(10).fill(0));
  for (let row of grid) {
    for (let j = 0; j < n; j++) {
      cnt[j][row[j]]++;
    }
  }
  let memo = Array.from({ length: n }, () => new Array(11).fill(-1));
  const dfs = (i, j) => {
    if (i < 0) return 0;
    if (memo[i][j] != -1) return memo[i][j];
    let res = 0;
    for (let k = 0; k < 10; k++) {
      // 枚举第 i 列的元素都变成 k
      if (k != j) {
        res = Math.max(res, dfs(i - 1, k) + cnt[i][k]);
      }
    }
    return (memo[i][j] = res);
  };
  return m * n - dfs(n - 1, 10);
};
