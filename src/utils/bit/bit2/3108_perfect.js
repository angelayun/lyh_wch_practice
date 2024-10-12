/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number[][]} query
 * @return {number[]}
 */
var minimumCost = function (n, edges, query) {

  let graph = Array.from({ length: n }, () => [])
  for (let [x, y, w] of edges) {
    graph[x].push([y, w])
    graph[y].push([x, w])
  }
  let ids = new Array(n).fill(-1)
  let ands = []
  const dfs = (x) => {
    let and = -1
    ids[x] = ands.length
    for (let [y, w] of graph[x]) {
      and &= w;
      if (ids[y] == -1)
        and &= dfs(y)
    }
    return and
  }
  for (let i = 0; i < n; i++) {
    if (ids[i] == -1) {
      ands.push(dfs(i))
    }
  }
  console.log(ands, ids)
  const ans = []
  for (let i = 0; i < query.length; i++) {
    let [x, y] = query[i]
    if (x == y) ans[i] = 0
    if (ids[x] != ids[y]) ans.push(-1)
    else ans.push(ands[ids[x]])
  }
  return ans
};
/**
 * 1、先建图
 * 2、通过ids来判断节点是否有被访问过
 * 3、ands数据是有多少个连通分量就有多少条数据
 * 4、ids存的是对应联通分量的索引号
 */