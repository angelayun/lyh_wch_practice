/**
 * @param {string} s
 * @param {number[][]} queries
 * @return {number[]}
 */
var platesBetweenCandles = function (s, queries) {
  const n = s.length;
  let preSum = new Array(n + 1).fill(0);
  let left = new Array(n).fill(0);
  let right = new Array(n).fill(0);
  let p = -1;
  for (let i = 0; i < n; i++) {
    preSum[i + 1] += preSum[i] + (s[i] == '*' ? 1 : 0);
    if (s[i] == '|') p = i;
    left[i] = p;
  }
  p = n;
  for (let i = n - 1; i >= 0; i--) {
    if (s[i] == '|') p = i;
    right[i] = p;
  }
  const m = queries.length;
  let ans = new Array(m).fill(0);
  for (let i = 0; i < m; i++) {
    let [l, r] = queries[i];
    let realLeft = right[l];
    let realRight = left[r];
    if (realLeft < realRight) {
      ans[i] = preSum[realRight + 1] - preSum[realLeft];
    }
  }
  return ans;
};
