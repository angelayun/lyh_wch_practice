/**
 * @param {number[][]} edges
 * @return {number}
 */
var countGoodNodes = function (edges) {
  const n = edges.length + 1;
  const graph = Array.from({ length: n }, () => new Array());
  for (let [x, y] of edges) {
    graph[x].push(y);
    graph[y].push(x);
  }
  let cnt = 0;
  const dfs = (x, fa) => {
    let size = 1,
      sz0 = 0,
      ok = true;
    for (let y of graph[x]) {
      if (y == fa) continue;
      let curCount = dfs(y, x);
      if (sz0 == 0) {
        sz0 = curCount;
      } else if (curCount != sz0) {
        ok = false;
      }
      size += curCount;
    }
    cnt += ok;
    return size;
  };
  dfs(0, -1);
  return cnt;
};
