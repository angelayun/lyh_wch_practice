/**
 * @param {string} s
 * @param {number[][]} queries
 * @return {number[][]}
 */
var substringXorQueries = function (s, queries) {
  const NOT = [-1, -1]
  let cnt = new Map()
  let index = s.indexOf('0')
  cnt.set(0, [index, index])
  for (let left = 0, n = s.length; left < n; left++) {
    if (s[left] == '0') continue
    for (let right = left, x = 0; right < Math.min(n, left + 30); right++) {
      x = (x << 1) + (s[right] & 1)
      if (!cnt.has(x)) {
        cnt.set(x, [left, right])
      }
    }
  }
  let ans = []
  for (let [left, right] of queries) {
    ans.push(cnt.get(left ^ right) || NOT)
  }
  return ans
};