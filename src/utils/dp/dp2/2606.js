/**
 * @param {string} s
 * @param {string} chars
 * @param {number[]} vals
 * @return {number}
 */
var maximumCostSubstring = function (s, chars, vals) {
  let cnt = Array.from({ length: 26 }, (v, i) => i + 1)
  for (let i = 0; i < chars.length; i++) {
    let x = chars[i].charCodeAt() - 'a'.charCodeAt()
    cnt[x] = vals[i]
  }
  /* let dp = new Array(s.length).fill(0)
  let index = s[0].charCodeAt() - 'a'.charCodeAt()
  let ans = cnt[index] != 0 ? cnt[index] : index + 1
  dp[0] = ans
  for (let i = 1; i < s.length; i++) {
    index = s[i].charCodeAt() - 'a'.charCodeAt()
    dp[i] = Math.max(dp[i - 1], 0) + (cnt[index] != 0 ? cnt[index] : index + 1)
    ans = Math.max(ans, dp[i])
  }
  return ans */
  let index = s[0].charCodeAt() - 'a'.charCodeAt()
  let ans = cnt[index]
  let dp = ans
  for (let i = 1; i < s.length; i++) {
    index = s[i].charCodeAt() - 'a'.charCodeAt()
    dp = Math.max(dp, 0) + cnt[index]
    ans = Math.max(ans, dp)
  }
  return ans
};