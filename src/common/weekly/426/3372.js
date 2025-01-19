/**
 * @param {number[][]} edges1
 * @param {number[][]} edges2
 * @param {number} k
 * @return {number[]}
 */
var maxTargetNodes = function (edges1, edges2, k) {
  const buildTree = (edges, k) => {
    let graph = Array.from({ length: edges.length + 1 }, () => []);
    for (let [x, y] of edges) {
      graph[x].push(y);
      graph[y].push(x);
    }
    const dfs = (x, fa, d) => {
      if (d > k) return 0;
      let cnt = 1;
      for (let y of graph[x]) {
        if (y != fa) {
          cnt += dfs(y, x, d + 1);
        }
      }
      return cnt;
    };
    return dfs;
  };
  let max2 = 0;
  if (k > 0) {
    let dfs = buildTree(edges2, k - 1);
    for (let i = 0; i < edges2.length + 1; i++) {
      max2 = Math.max(max2, dfs(i, -1, 0));
    }
  }
  let dfs = buildTree(edges1, k);
  let ans = [];
  for (let i = 0; i <= edges1.length; i++) {
    ans.push(dfs(i, -1, 0) + max2);
  }
  return ans;
};
