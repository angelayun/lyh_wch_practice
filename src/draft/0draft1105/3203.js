/**
 * @param {number[][]} edges1
 * @param {number[][]} edges2
 * @return {number}
 */
var minimumDiameterAfterMerge = function (edges1, edges2) {
  const dfs = (edges) => {
    const n = edges.length;
    const graph = Array.from({ length: n + 1 }, () => new Array());
    for (let [x, y] of edges) {
      graph[x].push(y);
      graph[y].push(x);
    }
    let ans = 0;
    const innerDfs = (x, fa) => {
      let maxLen = 0;
      for (let y of graph[x]) {
        if (y == fa) continue;
        let subLen = dfs(y, x) + 1;
        ans = Math.max(ans, maxLen + subLen);
        maxLen = Math.max(maxLen, subLen);
      }
      return maxLen;
    };
    innerDfs(x, -1);
    return ans;
  };
  let d1 = dfs(edges1);
  let d2 = dfs(edges2);
  return Math.max(d1, d2, ((d1 + 1) >> 1) + ((d2 + 1) >> 1) + 1);
};
