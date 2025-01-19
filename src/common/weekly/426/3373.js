/**
 * @param {number[][]} edges1
 * @param {number[][]} edges2
 * @return {number[]}
 */
var maxTargetNodes = function (edges1, edges2) {
  let count = (edges) => {
    let g = Array.from({ length: edges.length + 1 }, () => []);
    for (let [x, y] of edges) {
      g[x].push(y);
      g[y].push(x);
    }
    let cnt = [0, 0];
    const dfs = (x, fa, d) => {
      cnt[d]++;
      for (let y of g[x]) {
        if (y != fa) {
          dfs(y, x, d ^ 1);
        }
      }
    };
    dfs(0, -1, 0);
    return [g, cnt];
  };
  let [_, cnt2] = count(edges2);
  let max2 = Math.max(...cnt2);
  let [g, cnt1] = count(edges1);
  let ans = Array.from({ length: g.length }, () => max2);
  const dfs = (x, fa, d) => {
    ans[x] += cnt1[d];
    for (let y of g[x]) {
      if (y != fa) {
        dfs(y, x, d ^ 1);
      }
    }
  };
  dfs(0, -1, 0);
  return ans;
};
