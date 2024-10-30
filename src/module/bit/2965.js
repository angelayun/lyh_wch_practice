/**
 * 给你一个下标从 0 开始的二维整数矩阵 grid，大小为 n * n ，其中的值在 [1, n2] 范围内。除了 a 出现 两次，b 缺失 之外，每个整数都 恰好出现一次 。

任务是找出重复的数字a 和缺失的数字 b 。

返回一个下标从 0 开始、长度为 2 的整数数组 ans ，其中 ans[0] 等于 a ，ans[1] 等于 b 。

 */
/**
 * @param {number[][]} grid
 * @return {number[]}
 */
var findMissingAndRepeatedValues = function (grid) {
  let sum = 0;
  const n = grid.length;
  for (let i = 1; i <= n * n; i++) sum ^= i;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      sum ^= grid[i][j];
    }
  }
  // 这样操作一波后  a出现了3次  b出现了1次  其它每个数字都出现两次并且被^没有
  // sum中存的是a^b的值
  let lowBit = sum & -sum;
  let dup = 0,
    miss = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] & lowBit) {
        dup ^= grid[i][j];
      } else {
        miss ^= grid[i][j];
      }
    }
  }
  // 要的lowBit分类
  for (let i = 1; i <= n * n; i++) {
    if (i & lowBit) {
      dup ^= i;
    } else {
      miss ^= i;
    }
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (miss == grid[i][j]) {
        return [miss, dup];
      }
    }
  }
  return [dup, miss];
};
