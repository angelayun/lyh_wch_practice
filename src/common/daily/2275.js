/**
 * @param {number[]} candidates
 * @return {number}
 */
var largestCombination = function (candidates) {
  let mx = Math.max(...candidates);
  let m = 32 - Math.clz32(mx.toString(2));
  let ans = 0;
  for (let i = 0; i < m; i++) {
    let cnt = 0;
    for (let x of candidates) {
      cnt += (x >> i) & 1;
    }
    ans = Math.max(cnt, ans);
  }
  return ans;
};
