/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number[][]} query
 * @return {number[]}
 */
var minimumCost = function (n, edges, query) {
  /**
   * 1、先建图
   * 2、通过ids来判断节点是否有被访问过
   * 3、ands数据是有多少个连通分量就有多少条数据
   * 4、ids存的是对应联通分量的索引号
   */
  let graph = Array.from({ length: n }, () => new Array())
  for (let [x, y, w] of edges) {
    graph[x].push([y, w])
    graph[y].push([x, w])
  }
  let ids = new Array(n).fill(-1)
  let andVal = []
  const dfs = (x) => {
    ids[x] = andVal.length
    let and = -1
    for (let [y, w] of graph[x]) {
      and &= w
      if (ids[y] == -1) {
        and &= dfs(y)
      }
    }
    return and
  }
  for (let i = 0; i < n; i++) {
    if (ids[i] == -1) {
      andVal.push(dfs(i))
    }
  }
  let ans = []
  for (let [x, y] of query) {
    if (ids[x] != ids[y]) {
      // 不在一个联通分量里面
      ans.push(-1)
    } else {
      ans.push(andVal[ids[x]])
    }
  }
  return ans
};