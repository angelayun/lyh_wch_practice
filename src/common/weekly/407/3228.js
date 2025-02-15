/**
 * @param {string} s
 * @return {number}
 */
var maxOperations = function (s) {
  let cnt1 = 0;
  let ans = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] == '1') cnt1++;
    else if (i > 0 && s[i - 1] == '1') {
      // 遇到的相间位置  当前位置是0
      ans += cnt1;
    }
  }
  return ans;
};
