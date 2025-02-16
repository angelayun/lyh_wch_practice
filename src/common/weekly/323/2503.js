/**
 * @param {number[][]} grid
 * @param {number[]} queries
 * @return {number[]}
 */
var maxPoints = function (grid, queries) {
  // 并查集查找函数
  const find = (x, fa) => {
    if (fa[x] !== x) {
      fa[x] = find(fa[x], fa);
    }
    return fa[x];
  };

  // 并查集合并函数
  const merge = (from, to, fa, size) => {
    from = find(from, fa);
    to = find(to, fa);
    if (from !== to) {
      fa[from] = to;
      size[to] += size[from];
    }
  };
  const m = grid.length;
  const n = grid[0].length;
  const mn = m * n;
  const dirs = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  // 初始化并查集的父节点数组和连通块大小数组
  const fa = new Array(mn).fill(0).map((_, i) => i);
  const size = new Array(mn).fill(1);

  // 矩阵元素从小到大排序，方便离线处理
  const a = [];
  for (let i = 0; i < m; ++i) {
    for (let j = 0; j < n; ++j) {
      a.push([grid[i][j], i, j]);
    }
  }
  a.sort((p, q) => p[0] - q[0]);

  // 查询的下标按照查询值从小到大排序，方便离线处理
  const k = queries.length;
  const id = Array.from({ length: k }, (_, i) => i);
  id.sort((i, j) => queries[i] - queries[j]);

  const ans = new Array(k).fill(0);
  let j = 0;
  for (let i of id) {
    const q = queries[i];
    for (; j < mn && a[j][0] < q; ++j) {
      const [, x, y] = a[j];
      // 枚举周围四个格子，值小于 q 才可以合并
      for (let d of dirs) {
        const x2 = x + d[0];
        const y2 = y + d[1];
        if (x2 >= 0 && x2 < m && y2 >= 0 && y2 < n && grid[x2][y2] < q) {
          merge(x * n + y, x2 * n + y2, fa, size); // 把坐标压缩成一维的编号
        }
      }
    }
    if (grid[0][0] < q) {
      ans[i] = size[find(0, fa)]; // 左上角的连通块的大小
    }
  }
  return ans;
};
