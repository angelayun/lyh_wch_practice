/**
 * @param {number[][]} edges1
 * @param {number[][]} edges2
 * @return {number}
 */
var minimumDiameterAfterMerge = function (edges1, edges2) {
  const diameter = (edges) => {
    const n = edges.length;
    // 看示例就知道这里为什么是n+1
    const graph = Array.from({ length: n + 1 }, () => []);
    for (const [u, v] of edges) {
      graph[u].push(v);
      graph[v].push(u);
    }
    let res = 0;
    const dfs = (x, fa) => {
      let maxLen = 0;
      for (let y of graph[x]) {
        // y 是 x 的子节点  那么 看哪个子节点最大  作为当前函数返回值
        if (y !== fa) {
          const subLen = dfs(y, x) + 1;
          // 前面一个子节点的链路  加  当前 子节点的链接   是否能形成一条更长的链路
          res = Math.max(res, maxLen + subLen);
          maxLen = Math.max(maxLen, subLen);
        }
      }
      return maxLen;
    };
    dfs(0, -1);
    return res;
  };
  let d1 = diameter(edges1);
  let d2 = diameter(edges2);
  // 看灵神的那个图  两颗树的直径假设都是5  那么结果是3+3+1=7
  return Math.max(d1, d2, ((d1 + 1) >> 1) + ((d2 + 1) >> 1) + 1);
};
