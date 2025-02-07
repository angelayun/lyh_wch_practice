/**
 * @param {string} num
 * @return {string}
 */
var largestPalindromic = function (num) {
  let cnt = new Map();
  for (let x of num) {
    cnt.set(x, (cnt.get(x) || 0) + 1);
  }
  if (cnt.get('0') == num.length) return '0';
  let s = '';
  for (let d = 9; d > 0; d--) {
    s += d.toString().repeat(cnt.get(d.toString()) >> 1);
  }
  if (s) {
    s += '0'.repeat(cnt.get('0') >> 1);
  }
  let t = s.split('').reverse().join('');
  for (let d = 9; d >= 0; d--) {
    if (cnt.get(d.toString()) & 1) {
      s += d.toString();
      break;
    }
  }
  return s + t;
};
