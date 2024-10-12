// 這是原先通過的
/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number[][]} query
 * @return {number[]}
 */
var minimumCost = function (n, edges, query) {
  let graph = Array.from({ length: n }, () => []);
  // 先建图
  for (let [x, y, w] of edges) {
    graph[x].push([y, w]);
    graph[y].push([x, w]);
  }
  // 记录每个点所在的连通块的编号
  let ids = new Array(n).fill(-1);
  // 记录每个连通快的边权的and
  let ands = [];
  const dfs = (x) => {
    let and = -1; // -1的二进制位全部都是1
    ids[x] = ands.length; // 记录每个点所在的连通块的编号
    for (let [y, w] of graph[x]) {
      and &= w;
      if (ids[y] < 0) {
        // y没有访问过
        and &= dfs(y);
      }
    }
    return and;
  };
  for (let i = 0; i < n; i++) {
    if (ids[i] < 0) {
      // 当前连通块还没遍历过
      ands.push(dfs(i));
    }
  }
  let ans = [];
  for (let [s, t] of query) {
    if (ids[s] != ids[t]) {
      // 不在同一个连通分量当中
      ans.push(-1);
    } else {
      ans.push(ands[ids[s]]);
    }
  }
  return ans;
};