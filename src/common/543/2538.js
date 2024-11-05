/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number[]} price
 * @return {number}
 */
var maxOutput = function (n, edges, price) {
  let graph = Array.from({ length: n }, () => new Array());
  for (let [x, y] of edges) {
    graph[x].push(y);
    graph[y].push(x);
  }
  let ans = 0;
  const dfs = (x, fa) => {
    let maxS1 = price[x];
    let p = maxS1;
    let maxS2 = 0;
    for (let y of graph[x]) {
      if (y == fa) continue;
      let [s1, s2] = dfs(y, x);
      ans = Math.max(
        ans,
        // 前面最大带叶子的路径和 + 当前不带叶子的路径和
        maxS1 + s2,
        // 前面最大的不带叶子的路径和 + 当前带叶子的路径和
        maxS2 + s1
      );
      maxS1 = Math.max(maxS1, s1 + p);
      maxS2 = Math.max(maxS2, s2 + p);
    }
    return [maxS1, maxS2];
  };
  dfs(0, -1);
  return ans;
};
