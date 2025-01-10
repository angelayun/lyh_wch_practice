/**
 * @param {string} word
 * @param {string[]} forbidden
 * @return {number}
 */
var longestValidSubstring = function (word, forbidden) {
  let fb = new Set(forbidden);
  let ans = 0;
  for (let left = 0, right = 0; right < word.length; right++) {
    for (let i = right; i < Math.max(right - 10, left - 1); i--) {
      if (fb.has(word.slice(i, right + 1))) {
        left = i + 1;
        break;
      }
    }
    ans = Math.max(ans, right - left + 1);
  }
  return ans;
};
