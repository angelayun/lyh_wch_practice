/**
 * @param {string} word
 * @param {number} numFriends
 * @return {string}
 */
var answerString = function (s, k) {
  if (k == 1) {
    return s;
  }
  let n = s.length;
  let ans = '';
  for (let i = 0; i < n; i++) {
    let sub = s.substring(i, Math.min(i + n - k + 1, n));
    if (sub.localeCompare(ans) > 0) {
      ans = sub;
    }
  }
  return ans;
};
