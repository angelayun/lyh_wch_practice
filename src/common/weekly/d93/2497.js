/**
 * @param {number[]} vals
 * @param {number[][]} edges
 * @param {number} k
 * @return {number}
 */
var maxStarSum = function (vals, edges, k) {
  let graph = Array.from({ length: vals.length }, () => []);
  for (let [x, y] of edges) {
    if (vals[y] > 0) {
      graph[x].push(vals[y]);
    }
    if (vals[x] > 0) {
      graph[y].push(vals[x]);
    }
  }
  console.log(graph);
  let ans = Number.MIN_SAFE_INTEGER;
  for (let [i, a] of graph.entries()) {
    a.sort((p, q) => q - p);
    if (a.length > k) {
      a = a.slice(0, k);
    }
    let sum = vals[i];
    for (let v of a) {
      sum += v;
    }
    ans = Math.max(ans, sum);
  }
  return ans;
};
