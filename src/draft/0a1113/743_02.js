var networkDelayTime = function (times, n, k) {
  // 建立邻接表
  let graph = Array.from({ length: n }, () => []);
  for (let [x, y, d] of times) {
    graph[x - 1].push([y - 1, d]);
  }
  let dist = new Array(n).fill(Infinity);
  dist[k - 1] = 0;
  const pq = new MinPriorityQueue({ priority: (p) => p[0] });
  // 按照距离从近及远  所以入的是[距离,元素]
  pq.enqueue([0, k - 1]);
  while (!pq.isEmpty()) {
    // 出堆
    const [dx, x] = pq.dequeue().element;
    // x 之前出堆过
    if (dx > dist[x]) continue;
    for (let [dy, y] of graph[x]) {
      const newDis = dx + d;
      if (newDis < dist[y]) {
        // 更新x的领导的最短路
        dist[y] = newDis;
        // pq.
      }
    }
  }
};
