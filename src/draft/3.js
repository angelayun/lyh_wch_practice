/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  let ans = 0
  let set = new Set()
  for (let left = 0, right = 0; right < s.length; right++) {
    while (set.has(s[right])) {
      set.delete(s[left++])
    }
    set.add(s[right])
    ans = Math.max(right - left + 1, ans)
  }
  return ans
};