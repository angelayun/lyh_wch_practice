/**
 * @param {string} s
 * @param {string} t
 * @param {number} k
 * @return {boolean}
 */
var isPossibleToRearrange = function (s, t, k) {
  let a = [],
    b = [];
  let n = s.length;
  k = ~~(n / k);
  for (let i = k; i <= n; i += k) {
    a.push(s.substring(i - k, i));
    b.push(t.substring(i - k, i));
  }
  a.sort();
  b.sort();
  return a.join('') == b.join('');
};
