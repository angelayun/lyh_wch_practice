/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number}
 */
var findShortestCycle = function (n, edges) {
  let graph = Array.from({ length: n }, () => new Array())
  for (let [x, y] of edges) {
    graph[x].push(y)
    graph[y].push(x)
  }
  const bfs = (start) => {
    let ans = Number.MAX_SAFE_INTEGER
    // 表示从start到i的最短路的长度
    let dist = new Array(n).fill(-1)
    dist[start] = 0
    let queue = [[start, -1]]
    while (queue.length) {
      let nextQueue = []
      let size = queue.length
      for (let i = 0; i < size; i++) {
        let [x, fa] = queue[i]
        for (let y of graph[x]) {
          if (dist[y] < 0) {
            // 第一次遇到
            dist[y] = dist[x] + 1
            nextQueue.push([y, x])
          } else if (y != fa) {
            ans = Math.min(ans, dist[x] + dist[y] + 1)
          }
        }
      }
      queue = nextQueue
    }
    return ans
  }
  let ans = Number.MAX_SAFE_INTEGER
  for (let i = 0; i < n; i++) {
    ans = Math.min(ans, bfs(i))
  }
  return ans == Number.MAX_SAFE_INTEGER ? -1 : ans
};