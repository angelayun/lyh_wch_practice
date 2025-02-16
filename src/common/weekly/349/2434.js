/**
 * @param {string} s
 * @return {string}
 */
var smallestString = function (s) {
  s = s.split('');
  let i = 0;
  const n = s.length;
  let flag = false;
  while (i < n) {
    if (s[i] != 'a') {
      flag = true;
      for (let j = i; j < n; j++) {
        if (s[j] == 'a') break;
        s[j] = String.fromCharCode(s[j].charCodeAt() - 1);
      }
    }
    if (flag) break;
    i++;
  }
  if (!flag) {
    s[n - 1] = 'z';
  }
  return s.join('');
};
/**
 * @param {string} s
 * @return {string}
 */
var smallestString = function (s) {
  s = s.split('');
  let i = 0;
  const n = s.length;
  while (i < n) {
    if (s[i] != 'a') {
      for (let j = i; j < n; j++) {
        if (s[j] == 'a') break;
        s[j] = String.fromCharCode(s[j].charCodeAt() - 1);
      }
      return s.join('');
    }
    i++;
  }
  s[n - 1] = 'z';
  return s.join('');
};
