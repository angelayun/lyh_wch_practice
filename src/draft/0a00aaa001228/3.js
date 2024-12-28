/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  let maxLen = 0;
  let winSet = new Set();
  for (let left = 0, right = 0; right < s.length; right++) {
    while (winSet.has(s[right])) {
      winSet.delete(s[left++]);
    }
    winSet.add(s[right]);
    maxLen = Math.max(maxLen, right - left + 1);
  }
  return maxLen;
};
