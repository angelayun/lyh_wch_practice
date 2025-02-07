/**
 * @param {number[]} rolls
 * @param {number} k
 * @return {number}
 */
var shortestSequence = function (rolls, k) {
  let ans = 1;
  let s = new Set();
  for (let x of rolls) {
    if (!s.has(x)) {
      s.add(x);
      if (s.size == k) {
        // 找到了1-k的所有数字
        ans++;
        s = new Set();
      }
    }
  }
  return ans;
};
/**
 * @param {number[]} rolls
 * @param {number} k
 * @return {number}
 */
var shortestSequence = function (rolls, k) {
  let ans = 1;
  let mark = new Array(k + 1).fill(0);
  let left = k;
  for (let x of rolls) {
    if (mark[x] < ans) {
      mark[x] = ans;
      left -= 1;
      if (left == 0) {
        // 又重新新一轮
        ans++;
        left = k;
      }
    }
  }
  return ans;
};
