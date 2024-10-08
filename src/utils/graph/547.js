/**
 * @param {number[][]} isConnected
 * @return {number}
 */
var findCircleNum = function (isConnected) {
  const n = isConnected.length
  const visited = new Array(n).fill(false)
  let ans = 0
  /* const dfs = (i) => {
    for (let j = 0; j < n; j++) {
      if (!visited[j] && isConnected[i][j] == 1) {
        visited[j] = true
        dfs(j)
      }
    }
  } */
  const bfs = (k) => {
    let queue = [k]
    while (queue.length) {
      let nextQueue = []
      for (let x of queue) {
        visited[x] = true
        for (let j = 0; j < n; j++) {
          if (!visited[j] && isConnected[x][j] == 1) {
            nextQueue.push(j)
          }
        }
      }
      queue = nextQueue
    }
  }
  for (let i = 0; i < n; i++) {
    if (!visited[i]) {
      // visited[i] = true
      bfs(i)
      ans++
    }
  }
  return ans
};