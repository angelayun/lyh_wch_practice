/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number} source
 * @param {number} destination
 * @return {boolean}
 */
var validPath = function (n, edges, source, destination) {
  let graph = Array.from({ length: n }, () => new Array())
  for (let [x, y] of edges) {
    graph[x].push(y)
    graph[y].push(x)
  }
  const visited = new Array(n).fill(0)

  const dfs = (source, destination) => {
    // 如果起点和终点相同的情况
    if (source == destination) return true
    visited[source] = true
    for (let next of graph[source]) {
      if (!visited[next] && dfs(next, destination))
        return true
    }
    return false
  }
  return dfs(source, destination)
};

/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number} source
 * @param {number} destination
 * @return {boolean}
 */
var validPath = function(n, edges, source, destination) {

};