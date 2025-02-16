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

// 下面是另外一种写法
/**
 * @param {number[][]} grid
 * @return {number}
 */
var minimumOperations = function (grid) {
  // 获取网格的行数 m 和列数 n
  const m = grid.length;
  const n = grid[0].length;
  // 初始化动态规划所需的变量
  let f0 = 0;
  let f1 = 0;
  let pre = -1;

  // 遍历每一列
  for (let i = 0; i < n; i++) {
    // 初始化一个长度为 10 的数组 cnt 用于记录每列中 0 - 9 每个数字出现的次数
    const cnt = new Array(10).fill(0);
    // 遍历每一行，统计当前列中每个数字出现的次数
    for (const row of grid) {
      cnt[row[i]]++;
    }
    // 初始化最大值、次大值以及最大值对应的数字
    let mx = -1;
    let mx2 = 0;
    let x = -1;
    // 遍历 0 - 9 每个数字
    for (let v = 0; v < 10; v++) {
      // 根据当前数字 v 是否和上一列选取的数字 pre 相同，来决定使用 f0 还是 f1 进行状态转移
      const res = (v !== pre ? f0 : f1) + cnt[v];
      // 如果 res 大于当前最大值 mx
      if (res > mx) {
        // 更新次大值为原来的最大值
        mx2 = mx;
        // 更新最大值为 res
        mx = res;
        // 记录最大值对应的数字
        x = v;
      } else if (res > mx2) {
        // 如果 res 小于最大值但大于次大值，更新次大值为 res
        mx2 = res;
      }
    }
    // 更新 f0 为当前列的最大值
    f0 = mx;
    // 更新 f1 为当前列的次大值
    f1 = mx2;
    // 更新 pre 为当前列选取的数字
    pre = x;
  }
  // 最终结果为网格总元素个数减去最后一列的最大值
  return m * n - f0;
};
