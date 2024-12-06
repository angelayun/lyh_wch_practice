/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var maxPalindromes = function (s, k) {
  let chars = s.split('');
  let n = chars.length;
  let dp = new Array(n + 1).fill(0);
  for (let i = 0; i < n; i++) {
    dp[i + 1] = Math.max(dp[i + 1], dp[i]);
    for (let j = 0; j <= 1; j++) {
      let l = i,
        r = i + 1;
      while (l >= 0 && r <= n && chars[l] == chars[r]) {
        if (r - l + 1 >= k) {
          dp[r + 1] = Math.max(dp[r + 1], dp[l] + 1);
          break;
        }
        l--;
        r++;
      }
    }
  }
  return dp[n];
};
