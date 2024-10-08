/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number}
 */
var magnificentSets = function (n, edges) {
  // 首先建图
  let graph = Array.from({ length: n }, () => new Array())
  for (let [x, y] of edges) {
    // 题目说了是从1开始编号的
    x--
    y--
    graph[x].push(y)
    graph[y].push(x)
  }
  // 充当vis数组的作用，避免在BFS内部重复创建vis数组
  let time = new Array(n).fill(0)
  let clock = 0
  // 返回从start出发的最大深度
  const bfs = (start) => {
    let depth = 0
    clock++
    time[start] = clock
    let queue = [start]
    while (queue.length) {
      let nextQueue = []
      let size = queue.length
      for (let i = 0; i < size; i++) {
        let x = queue[i]
        for (let y of graph[x]) {
          if (time[y] != clock) {
            // 没有同一次BFS中访问过
            time[y] = clock
            nextQueue.push(y)
          }
        }
      }
      depth++
      queue = nextQueue
    }
    return depth
  }
  let color = new Array(n).fill(0)
  let nodes = []
  const isBiPartite = (x, c) => {
    nodes.push(x)
    color[x] = c
    for (let y of graph[x]) {
      if (color[y] == c || color[y] == 0 && !isBiPartite(y, -c))
        return false
    }
    return true
  }
  let ans = 0
  for (let i = 0; i < color.length; i++) {
    let c = color[i]
    if (c) continue
    nodes = []
    // 如果不是二分图（也就是说有奇环） 则无法分组
    if (!isBiPartite(i, 1)) return -1
    let maxDepth =0
    // 否则可以分组
    for (let x of nodes) {
      maxDepth = Math.max(maxDepth,bfs(x))
    }
    ans +=maxDepth
  }
  return ans
};