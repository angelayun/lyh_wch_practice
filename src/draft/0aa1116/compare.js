var networkDelayTime = function (times, n, k) {
  const graph = Array.from({ length: n }, () => Array(n).fill(Infinity)); // 邻接矩阵
  for (const [x, y, d] of times) {
    graph[x - 1][y - 1] = d;
  }

  const dist = Array(n).fill(Infinity);
  dist[k - 1] = 0;
  const done = Array(n).fill(false);
  while (true) {
    let x = -1;
    for (let i = 0; i < n; i++) {
      if (!done[i] && (x < 0 || dist[i] < dist[x])) {
        x = i;
      }
    }
    if (x < 0) {
      return Math.max(...dist);
    }
    if (dist[x] === Infinity) {
      // 有节点无法到达
      return -1;
    }
    done[x] = true; // 最短路长度已确定（无法变得更小）
    for (let y = 0; y < n; y++) {
      // 更新 x 的邻居的最短路
      dist[y] = Math.min(dist[y], dist[x] + graph[x][y]);
    }
  }
};
