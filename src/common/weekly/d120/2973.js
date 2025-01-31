/**
 * @param {number[][]} edges
 * @param {number[]} cost
 * @return {number[]}
 */
var placedCoins = function (edges, cost) {
  let n = cost.length;
  let graph = Array.from({ length: n }, () => []);
  for (let [x, y] of edges) {
    graph[x].push(y);
    graph[y].push(x);
  }
  let ans = new Array(n).fill(1);
  const dfs = (x, fa) => {
    let a = [cost[x]];
    for (let y of graph[x]) {
      if (y != fa) {
        a.push(...dfs(y, x));
      }
    }
    a.sort((a, b) => a - b);
    let m = a.length;
    if (m >= 3) {
      ans[x] = Math.max(
        a[a.length - 3] * a[a.length - 2] * a[a.length - 1],
        a[0] * a[1] * a[a.length - 1],
        0
      );
    }
    if (m > 5) {
      a = [a[0], a[1], a[a.length - 3], a[a.length - 2], a[a.length - 1]];
    }
    return a;
  };
  dfs(0, -1);
  return ans;
};
