/**
 * @param {string} s
 * @return {string}
 */
var getSmallestString = function (s) {
  const n = s.length;
  s = s.split('');
  for (let i = 1; i < n; i++) {
    if ((s[i] & 1) == (s[i - 1] & 1) && s[i] < s[i - 1]) {
      [s[i], s[i - 1]] = [s[i - 1], s[i]];
      return s.join('');
    }
  }
  return s.join('')
};
