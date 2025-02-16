/**
 * @param {number[]} vals
 * @param {number[][]} edges
 * @return {number}
 */
var numberOfGoodPaths = function (vals, edges) {
  const n = vals.length;
  // 构建图的邻接表
  const g = Array.from({ length: n }, () => []);
  for (const [x, y] of edges) {
    g[x].push(y);
    g[y].push(x);
  }

  // 并查集的父节点数组
  const fa = Array.from({ length: n }, (_, i) => i);
  // size[x] 表示节点值等于 vals[x] 的节点个数
  const size = new Array(n).fill(1);

  // 并查集查找函数
  function find(x) {
    if (fa[x] !== x) {
      fa[x] = find(fa[x]);
    }
    return fa[x];
  }

  let ans = n; // 单个节点的好路径

  // 按照节点值从小到大排序
  const sortedNodes = vals
    .map((val, index) => [val, index])
    .sort((a, b) => a[0] - b[0]);

  for (const [vx, x] of sortedNodes) {
    const fx = find(x);
    for (const y of g[x]) {
      const fy = find(y);
      if (fy === fx || vals[fy] > vx) {
        continue; // 只考虑最大节点值不超过 vx 的连通块
      }
      if (vals[fy] === vx) {
        // 可以构成好路径
        ans += size[fx] * size[fy]; // 乘法原理
        size[fx] += size[fy]; // 统计连通块内节点值等于 vx 的节点个数
      }
      fa[fy] = fx; // 把小的节点值合并到大的节点值上
    }
  }
  return ans;
};
