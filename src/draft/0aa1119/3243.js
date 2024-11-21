/**
 * @param {number} n
 * @param {number[][]} queries
 * @return {number[]}
 */
var shortestDistanceAfterQueries = function (n, queries) {
  const graph = Array.from({ length: n }, () => new Array());
  for (let i = 0; i < n - 1; i++) {
    graph[i].push(i + 1);
  }
  const m = queries.length;
  let ans = new Array(m).fill(0);
  let vis = new Array(m);
  const bfs = (i) => {
    // 从0出发到n-1
    let queue = [0];
    let step = 1;
    while (true) {
      let nextQueue = [];
      for (let x of queue) {
        for (let y of graph[x]) {
          // 从x 到y  如果y是最末结点  找到了最短路
          if (y == n - 1) return step;
          if (vis[y] != i) {
            vis[y] = i;
            nextQueue.push(y);
          }
        }
      }
      queue = nextQueue;
      step++;
    }
  };
  for (let i = 0; i < queries.length; i++) {
    let [l, r] = queries[i];
    graph[l].push(r);
    ans[i] = bfs(l);
  }
  return ans;
};
