/**
 * @param {number[]} candiesCount
 * @param {number[][]} queries
 * @return {boolean[]}
 */
var canEat = function (candiesCount, queries) {
  const n = queries.length;
  const m = candiesCount.length;
  let ans = new Array(n);
  let sum = new Array(m + 1).fill(0n);
  for (let i = 0; i < m; i++) {
    sum[i + 1] = sum[i] + BigInt(candiesCount[i]);
  }
  for (let i = 0; i < n; i++) {
    let [t, d, c] = queries[i];

    d = BigInt(d);
    c = BigInt(c);
    d += 1n;
    let a = sum[t] / c + 1n;
    let b = sum[t + 1];
    ans[i] = a <= d && d <= b;
  }
  return ans;
};
