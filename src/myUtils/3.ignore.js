const { MinPriorityQueue } = require('datastructures-js');

export var networkDelayTime = function (times, n, k) {
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
