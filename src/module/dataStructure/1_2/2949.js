/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var beautifulSubstrings = function (s, k) {
  for (let d = 1; ; d++) {
    if ((d * d) % (4 * k) == 0) {
      k = d;
      break;
    }
  }
  let sum = [0];
  for (let c of s) {
    let x = 'aeiou'.includes(c) ? 1 : -1;
    sum.push(sum[sum.length - 1] + x);
  }
  let ans = 0;
  let cnt = new Map();
  for (let i = 0; i < sum.length; i++) {
    let cur = sum[i];
    let key = `${i % k}_${cur}`;
    ans += cnt.get(key) ?? 0;
    cnt.set(key, (cnt.get(key) || 0) + 1);
  }
  return ans;
};
