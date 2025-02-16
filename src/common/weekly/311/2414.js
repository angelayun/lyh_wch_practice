/**
 * @param {string} s
 * @return {number}
 */
var longestContinuousSubstring = function (s) {
  let cnt = 0;
  const n = s.length;
  let ans = 0;
  for (let i = 0; i < n; i++) {
    cnt++;
    if (i == n - 1 || s[i + 1].charCodeAt() != s[i].charCodeAt() + 1) {
      ans = Math.max(ans, cnt);
      cnt = 0;
    } 
  }
  return ans;
};
