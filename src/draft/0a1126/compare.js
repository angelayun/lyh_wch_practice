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
  let cnt = 0;
  const dfs = (x, fa) => {
    let sz0 = 0;
    let ok = true;
    let size = 1;
    for (let y of graph[x]) {
      if (y == fa) continue;
      let curCount = dfs(y, x);
      if (sz0 != 0 && sz0 != curCount) {
        ok = false;
      }
      sz0 = curCount;
      size += curCount;
    }
    cnt += ok;
    return size;
  };
  dfs(0, -1);
  return cnt;
};
