/**
 * @param {string[][]} paths
 * @return {string}
 */
var destCity = function (paths) {
  let graph = new Map()
  for (let [source, destination] of paths) {
    let list = []
    if (graph.has(source)) {
      list = graph.get(source)
    }
    list.push(destination)
    graph.set(source, list)
  }
  let visited = new Set(paths[0][0])
  let queue = [paths[0][0]]
  let ans = []
  while (queue.length) {
    let nextQueue = []
    for (let source of queue) {
      if (graph.has(source)) {
        for (let next of graph.get(source)) {
          if (!visited.has(next)) {
            nextQueue.push(next)
          }
        }
      }
    }
    if (nextQueue.length) {
      ans = nextQueue
    }
    queue = nextQueue
  }
  return ans[0]
};