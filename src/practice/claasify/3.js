/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  let ans = 1;
  let win = new Set()
  for (let left = 0, right = 0; right < s.length; right++) {
    let x = s[right]
    // 在加它之前发现已经有重复的了  缩小窗口 直至没有重复的
    while (win.has(x)) {
      win.delete(s[left++])
    }
    win.add(s[right])
    ans = Math.max(ans, right - left + 1)
  }
  return ans
};