/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number[][]} query
 * @return {number[]}
 */
var minimumCost = function (n, edges, query) {
  let graph = Array.from({ length: n }, () => new Array());
  for (let [x, y, w] of edges) {
    graph[x].push([y, w]);
    graph[y].push([x, w]);
  }
  let ids = new Array(n).fill(-1);
  let andVal = [];
  const dfs = (x) => {
    // 属于哪个联通分量  默认从0开始编号
    ids[x] = andVal.length;
    let and = -1;
    for (let [y, w] of graph[x]) {
      and &= w;
      if (ids[y] != -1) {
        and &= dfs(y);
      }
    }
    return and;
  };
  for (let i = 0; i < n; i++) {
    if (ids[i] == -1) {
      andVal.push(dfs(i));
    }
  }
  let ans = [];
  for (let [x, y] of query) {
    if (ids[x] != ids[y]) {
      ans.push(-1);
    } else {
      ans.push(andVal[ids[x]]);
    }
  }
  return ans;
};
