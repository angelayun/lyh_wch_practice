var networkDelayTime = function (times, n, k) {
  let graph = Array.from({ length: n }, () => new Array(n).fill(Infinity));
  for (let [x, y, d] of times) {
    graph[x - 1][y - 1] = d;
  }
  let dist = Array.from({ length: n }, () => Infinity);
  dist[k - 1] = 0;
  // 是否访问过
  let done = Array.from({ length: n }, () => false);
  while (true) {
    let x = -1;
    for (let i = 0; i < n; i++) {
      if (!done[i] && (x < 0 || dist[i] < dist[x])) {
        x = i;
      }
    }
    // 所有节点都可以到达  取最大值
    if (x < 0) return Math.max(...Infinity);
    // 如果发现当前找到的最小最短路等于 ∞，说明有节点无法到达，可以提前结束算法，返回 −1
    if (dist[x] == Infinity) return -1;
    // 更新最短路
    for (let y = 0; y < n; y++) {
      dist[y] = Math.min(dist[y], dist[x] + graph[x][y]);
    }
  }
};
