/**
 * @param {number[][]} times
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var networkDelayTime = function (times, n, k) {
  // 先建图
  let graph = Array.from({ length: n }, () => new Array(n).fill(Infinity));
  for (let [x, y, d] of times) {
    graph[x - 1][y - 1] = d;
  }
  let dist = new Array(n).fill(Infinity);
  // 起点的距离为0
  dist[k - 1] = 0;
  let done = new Array(n).fill(false);
  while (true) {
    let x = -1;
    for (let i = 0; i < n; i++) {
      if (!done[i] && (x < 0 || dist[i] < dist[x])) {
        x = i;
      }
    }
    if (x == -1) {
      return Math.max(...dist);
    }
    if (dist[x] == Infinity) return -1;
    done[x] = true;
    // 更新距离
    for (let y = 0; y < n; y++) {
      dist[y] = Math.min(dist[y], dist[x] + graph[x][y]);
    }
  }
};
// 待验证
