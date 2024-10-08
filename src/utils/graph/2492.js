/**
 * @param {number} n
 * @param {number[][]} roads
 * @return {number}
 */
var minScore = function (n, roads) {
  let graph = Array.from({ length: n }, () => new Array())
  for (let [x, y, d] of roads) {
    // 题目给的是从1开始编号
    x -= 1
    y -= 1
    // 无向图
    graph[x].push([y, d])
    graph[y].push([x, d])
  }
  // 本质上是求联通分量上的最小值
  let ans = Number.MAX_SAFE_INTEGER
  let visited = new Array(n).fill(false)
  const dfs = (x) => {
    visited[x] = true
    for (let [y, d] of graph[x]) {
      ans = Math.min(ans, d)
      if (!visited[y]) {
        dfs(y)
      }
    }
  }
  dfs(0)
  return ans
};