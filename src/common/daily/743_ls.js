var networkDelayTime = function (times, n, k) {
  const g = Array.from({ length: n }, () => Array(n).fill(Infinity)); // 邻接矩阵
  for (const [x, y, d] of times) {
    g[x - 1][y - 1] = d;
  }

  const dis = Array(n).fill(Infinity);
  dis[k - 1] = 0;
  const done = Array(n).fill(false);
  while (true) {
    let x = -1;
    for (let i = 0; i < n; i++) {
      if (!done[i] && (x < 0 || dis[i] < dis[x])) {
        x = i;
      }
    }
    // 只有所有的都访问过了  x才会等于-1
    if (x < 0) {
      return Math.max(...dis);
    }
    if (dis[x] === Infinity) {
      // 有节点无法到达
      return -1;
    }
    done[x] = true; // 最短路长度已确定（无法变得更小）
    for (let y = 0; y < n; y++) {
      // 更新 x 的邻居的最短路
      dis[y] = Math.min(dis[y], dis[x] + g[x][y]);
    }
  }
};

var networkDelayTime = function (times, n, k) {
  const g = Array.from({ length: n }, () => []); // 邻接表
  for (const [x, y, d] of times) {
    g[x - 1].push([y - 1, d]);
  }

  const dis = Array(n).fill(Infinity);
  dis[k - 1] = 0;
  const pq = new MinPriorityQueue({ priority: (p) => p[0] });
  pq.enqueue([0, k - 1]);
  while (!pq.isEmpty()) {
    const [dx, x] = pq.dequeue().element;
    if (dx > dis[x]) {
      // x 之前出堆过
      continue;
    }
    for (const [y, d] of g[x]) {
      const newDis = dx + d;
      if (newDis < dis[y]) {
        dis[y] = newDis; // 更新 x 的邻居的最短路
        pq.enqueue([newDis, y]);
      }
    }
  }
  const mx = Math.max(...dis);
  return mx < Infinity ? mx : -1;
};
