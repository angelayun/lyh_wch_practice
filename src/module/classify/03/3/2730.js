/**
 * @param {string} s
 * @return {number}
 */
var longestSemiRepetitiveSubstring = function (s) {
  let sameCount = 0
  const n = s.length
  let ans = 1
  for (let left = 0, right = 0; right < n; right++) {
    if (right > 0 && s[right - 1] == s[right]) {
      sameCount++
    }
    while (sameCount > 1) {
      if (s[left] == s[left + 1]) {
        sameCount--
      }
      left++
    }
    ans = Math.max(ans, right - left + 1)
  }
  return ans
};