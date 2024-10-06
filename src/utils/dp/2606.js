/**
 * @param {string} s
 * @param {string} chars
 * @param {number[]} vals
 * @return {number}
 */
var maximumCostSubstring = function (s, chars, vals) {
  let mapping = new Array(26).fill(0)
  for (let i = 0; i < 26; i++) {
    mapping[i] = i + 1
  }
  for (let i = 0; i < vals.length; i++) {
    mapping[chars[i].charCodeAt() - 'a'.charCodeAt()] = vals[i]
  }
  let ans = 0, f = 0
  for (let c of s) {
    f = Math.max(f, 0) + mapping[c.charCodeAt() - 'a'.charCodeAt()]
    ans = Math.max(ans, f)
  }
  return ans
};