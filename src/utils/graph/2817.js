/**
 * @param {number[][]} grid
 * @return {number}
 */
var maximumSafenessFactor = function (grid) {
  let n = grid.length
  let queue = []
  let dist = Array.from({ length: n }, () => new Array(n).fill(-1))
  let directions = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0]
  ]
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      let x = grid[i][j]
      if (x) {
        queue.push([i, j])
        dist[i][j] = 0
      }
    }
  }
  let groups = [queue]
  while (queue.length) {
    // 多源bfs
    let nextQueue = []
    for (let k = 0; k < queue.length; k++) {
      let [i, j] = queue[k]
      for (let d of directions) {
        let x = i + d[0], y = j + d[1]

        if (x >= 0 && x < n && y >= 0 && y < n && dist[x][y] < 0) {
          nextQueue.push([x, y])
          dist[x][y] = groups.length
        }
      }
    }
    queue = nextQueue
    groups.push(queue)
  }
  // 并查集模板
  let fa = Array.from({ length: n * n }, () => 0)
  for (let i = 0; i < n * n; i++) {
    fa[i] = i
  }
  const find = (x) => {
    if (fa[x] != x) {
      fa[x] = find(fa[x])
    }
    return fa[x]
  }
  for (let ans = groups.length - 2; ans > 0; ans--) {
    let g = groups[ans]
    for (let p of g) {
      let i = p[0], j = p[1]
      for (let d of directions) {
        let x = i + d[0], y = j + d[1]
        if (0 <= x && x < n && 0 <= y && y < n && dist[x][y] >= dist[i][j]) {
          fa[find(x * n + y)] = find(i * n + j)
        }
      }
    }
    if (find(0) == find(n * n - 1)) return ans
  }
  return 0
};