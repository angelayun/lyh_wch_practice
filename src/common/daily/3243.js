/**
 * @param {number} n
 * @param {number[][]} queries
 * @return {number[]}
 */
var shortestDistanceAfterQueries = function (n, queries) {
  let graph = Array.from({ length: n }, () => new Array());
  // 初始化i都有一条指向i+1的边
  for (let i = 0; i < n - 1; i++) {
    graph[i].push(i + 1);
  }
  const bfs = (i) => {
    let queue = [0];
    let step = 1;
    while (true) {
      let nextQueue = [];
      for (let x of queue) {
        for (let y of graph[x]) {
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
  let ans = new Array(queries.length).fill(0);
  // 这个vis的技巧很棒
  let vis = new Array(n);
  for (let i = 0; i < queries.length; i++) {
    let [l, r] = queries[i];
    graph[l].push(r);
    ans[i] = bfs(i);
  }
  return ans;
};
