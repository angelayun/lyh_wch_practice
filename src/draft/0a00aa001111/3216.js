/**
 * @param {string} s
 * @return {string}
 */
var getSmallestString = function (s) {
  t = s.split('');
  for (let i = 0; i < s.length; i++) {
    if (s[i] < s[i - 1] && (s[i] & 1) == (s[i - 1] & 1)) {
      [t[i], t[i - 1]] = [t[i - 1], t[i]];
      break;
    }
  }
  return t.join('');
};
