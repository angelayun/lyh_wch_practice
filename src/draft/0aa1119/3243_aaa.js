/**
 * @param {number} n
 * @param {number[][]} queries
 * @return {number[]}
 */
var shortestDistanceAfterQueries = function (n, queries) {
  let from = Array.from({ length: n }, () => new Array());
  let f = new Array(n).fill(0);
  // f[i]从0到i点的最短路径
  for (let i = 0; i < n; i++) f[i] = i;
  let ans = new Array(queries.length);
  for (let qi = 0; qi < queries.length; qi++) {
    let [l, r] = queries[qi];
    from[r].push(l);
    if (f[l] + 1 < f[r]) {
      f[r] = f[l] + 1;
      for (let i = r + 1; i < n; i++) {
        f[i] = Math.min(f[i], f[i - 1] + 1);
        for (let j of from[i]) {
          f[i] = Math.min(f[i], f[j] + 1);
        }
      }
    }
    ans[qi] = f[n - 1];
  }
  return ans;
};
