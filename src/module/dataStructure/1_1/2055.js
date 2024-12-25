/**
 * @param {string} s
 * @param {number[][]} queries
 * @return {number[]}
 */
var platesBetweenCandles = function (s, queries) {
  let n = s.length;
  // sum[i]表示s[:1]中盘子的个数
  let sum = new Array(n + 1).fill(0);
  // left[i]表示i左侧最近蜡烛的位置
  let left = new Array(n).fill(0);
  let p = -1;
  for (let i = 0; i < n; i++) {
    let b = s[i];
    sum[i + 1] = sum[i];
    if (b == '|') p = i;
    else sum[i + 1]++;
    left[i] = p;
  }
  // right[i]表示i右侧最近蜡烛的位置
  let right = new Array(n).fill(0);
  p = n;
  for (let i = n - 1; i >= 0; i--) {
    if (s[i] == '|') {
      p = i;
    }
    right[i] = p;
  }
  let ans = new Array(queries.length).fill(0);
  for (let i = 0; i < queries.length; i++) {
    let q = queries[i];
    // 用最近蜡烛位置来代替查询的范围，从而去掉不符合要求的盘子
    let [l, r] = [right[q[0]], left[q[1]]];
    if (l < r) {
      ans[i] = sum[r] - sum[l];
    }
  }
  return ans;
};
