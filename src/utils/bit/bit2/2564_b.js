/**
 * @param {string} s
 * @param {number[][]} queries
 * @return {number[][]}
 */
var substringXorQueries = function (s, queries) {
  let cnt = new Map()
  const NOT = [-1, -1]
  let index = s.indexOf('0')
  cnt.set(0, [index, index])
  const n = s.length
  for (let left = 0; left < n; left++) {
    if (s[left] == '0') continue
    for (let right = left, x = 0; right < Math.min(left + 30, n); right++) {
      x = (x << 1) + (s[right] & 1)
      if (!cnt.has(x)) {
        cnt.set(x, [left, right])
      }
    }
  }
  let ans = []
  for (let [source, target] of queries) {
    ans.push(cnt.get(source ^ target) || NOT)
  }
  return ans
};