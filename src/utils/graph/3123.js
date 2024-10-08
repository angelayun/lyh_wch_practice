/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {boolean[]}
 */
var findAnswer = function (n, edges) {
  // 所有图的都优先使用邻接表
  let graph = Array.from({ length: n }, () => new Array())
  for (let i = 0; i < edges.length; i++) {
    let [x, y, w] = edges[i]
    graph[x].push([y, w, i])
    graph[y].push([x, w, i])
  }
  // 下面是dijkstra算法模板
  let dist = new Array(n).fill(Number.MAX_SAFE_INTEGER)
  dist[0] = 0
  const heap = new PriorityQueue({
    compare: (a, b) => a[1] - b[1]
  });
  heap.enqueue([0, 0])
  while (!heap.isEmpty()) {
    let [dx, x] = heap.dequeue()
    if (dx > dist[x]) {
      continue
    }
    for (let [y, w,] of graph[x]) {
      let newDist = dx + w
      if (newDist < dist[y]) {
        dist[y] = newDist
        heap.enqueue([newDist, y])
      }
    }
  }
  let ans = new Array(edges.length).fill(false)
  if (dist[n - 1] == Number.MAX_SAFE_INTEGER) return ans
  let visited = new Array(n).fill(false)
  // 从终点出发 dfs
  const dfs = (y) => {
    visited[y] = true
    for (let [x, w, i] of graph[y]) {
      if (dist[x] + w != dist[y]) continue
      ans[i] = true
      if (!visited[x]) dfs(x)
    }
  }
  dfs(n - 1)
  return ans
};