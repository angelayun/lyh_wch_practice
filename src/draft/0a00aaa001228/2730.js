/**
 * @param {string} s
 * @return {number}
 */
var longestSemiRepetitiveSubstring = function (s) {
  let hasRepeat = false;
  let maxLen = 1;
  for (let left = 0, right = 0; right < s.length; right++) {
    while (hasRepeat && s[right] == s[right - 1]) {
      if (s[left] == s[left + 1]) {
        hasRepeat = false;
      }
      left++;
    }
    if (s[right] == s[right - 1]) hasRepeat = true;
    maxLen = Math.max(maxLen, right - left + 1);
  }
  return maxLen;
};
