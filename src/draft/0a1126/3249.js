/**
 * @param {number[][]} edges
 * @return {number}
 */
var countGoodNodes = function (edges) {
  const n = edges.length + 1;
  let graph = Array.from({ length: n }, () => []);
  for (let [x, y] of edges) {
    graph[x].push(y);
    graph[y].push(x);
  }
  let ans = 0;
  const dfs = (x, fa) => {
    let pre = 0;
    let ok = true;
    let size = 1;
    for (let y of graph[x]) {
      if (y == fa) continue;
      let count = dfs(y, x);
      if (pre != 0 && pre != count) {
        ok = false;
      }
      pre = count;
      size += count;
    }
    ans += ok;
    return size;
  };
  dfs(0, -1);
  return ans;
};
