/**
 * @param {number} n
 * @param {number[][]} queries
 * @return {number[]}
 */
var shortestDistanceAfterQueries = function (n, queries) {
  let from = Array.from({ length: n }, () => new Array());
  let f = new Array(n).fill(0);
  for (let i = 1; i < n; i++) {
    // f[i] 为从 0 到 i 的最短路。
    f[i] = i;
  }

  let ans = new Array(queries.length);
  for (let qi = 0; qi < queries.length; qi++) {
    let [l, r] = queries[qi];
    from[r].push(l);
    // 左端点+1 < 右端点  对应的值
    if (f[l] + 1 < f[r]) {
      // 更新最短距离
      f[r] = f[l] + 1;
      // 右端点右边的点都应该看一下是否是最近的
      for (let i = r + 1; i < n; i++) {
        f[i] = Math.min(f[i], f[i - 1] + 1);
        // 这有种递归的
        for (let j of from[i]) {
          f[i] = Math.min(f[i], f[j] + 1);
        }
      }
    }
    ans[qi] = f[n - 1];
  }
  return ans;
};
