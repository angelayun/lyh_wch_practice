/**
 * @param {number[][]} grid
 * @return {number}
 */
var maxScore = function (grid) {
  let pos = new Map();
  let rows = grid.length,
    cols = grid[0].length;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let x = grid[i][j];
      // x对应的value的值是它所在的行号的集合
      pos.set(x, (pos.get(x) || 0) | (1 << i));
    }
  }
  // 所有的x
  let allNums = Array.from(pos.keys());
  let n = allNums.length;
  let memo = Array.from({ length: n }, () => new Array(1 << rows).fill(-1));
  // 在 [1,i] 中选数字，所选数字所处的行号不能在集合 j 中，每行至多一个数且没有相同元素时，所选元素之和的最大值。
  const dfs = (i, j) => {
    if (i < 0) return 0;
    if (memo[i][j] != -1) return memo[i][j];
    // 不选
    let res = dfs(i - 1, j);
    // 枚举第k行的x
    let x = allNums[i];
    for (let t = pos.get(x), lb; t > 0; t ^= lb) {
      lb = t & -t;
      if ((j & lb) == 0) {
        // 没有选择过第k行的数
        res = Math.max(res, dfs(i - 1, j | lb) + x);
      }
    }
    return (memo[i][j] = res);
  };
  return dfs(n - 1, 0);
};
// 听懂视频的意思了
// TODO 一会来写
