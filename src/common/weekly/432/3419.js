/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number} threshold
 * @return {number}
 */
var minMaxWeight = function (n, edges, threshold) {
  if (edges.length < n - 1) return -1;
  let graph = Array.from({ length: n }, () => []);
  let maxW = 0;
  for (let [x, y, w] of edges) {
    graph[y].push([x, w]);
    maxW = Math.max(maxW, w);
  }
  let vis = new Array(n).fill(0);
  const dfs = (x, upper) => {
    vis[x] = upper;
    let cnt = 1;
    for (let [y, w] of graph[x]) {
      if (w <= upper && vis[y] != upper) {
        cnt += dfs(y, upper);
      }
    }
    return cnt;
  };
  let left = 0,
    right = maxW + 1;
  while (left + 1 < right) {
    let mid = left + ((right - left) >> 1);
    if (dfs(0, mid) == n) right = mid;
    else left = mid;
  }
  return right > maxW ? -1 : right;
};
