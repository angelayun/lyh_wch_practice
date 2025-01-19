/**
 * @param {string} s
 * @return {number}
 */
var minAnagramLength = function (s) {
  const n = s.length;
  let half = n >> 1;
  for (let k = 1; k <= half; k++) {
    if (n % k) continue;
    let cnt0 = new Array(26).fill(0);
    for (let j = 0; j < k; j++) {
      cnt0[s[j].charCodeAt() - 'a'.charCodeAt()]++;
    }
    let ok = true;
    for (let i = k * 2; i <= n; i += k) {
      let cnt1 = new Array(26).fill(0);
      for (let j = i - k; j < i; j++) {
        cnt1[s[j].charCodeAt() - 'a'.charCodeAt()]++;
      }
      if (cnt0.join(',') != cnt1.join(',')) {
        ok = false;
        break;
      }
    }
    if (ok) return k;
  }
  return n;
};
