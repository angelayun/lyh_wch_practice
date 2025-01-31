/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
var stringHash = function (s, k) {
  const n = s.length;
  let res = [];
  for (let i = 0; i < n; i += k) {
    let sum = 0;
    for (let j = i; j < i + k; j++) {
      sum += s[j].charCodeAt() - 'a'.charCodeAt();
      sum %= 26;
    }
    res.push(String.fromCharCode(sum.charCodeAt() + 'a'.charCodeAt()));
  }
  return res;
};
