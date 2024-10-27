/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function (s, t) {
  let cnt = new Map()
  for (let x of t) {
    cnt.set(x, (cnt.get(x) || 0) + 1)
  }
  let validCount = cnt.size
  let minLen = s.length
  const n = s.length
  for (let left = 0, right = 0; right < n; right++) {
    let x = s[right]
    if (cnt.has(x)) {
      cnt.set(x, (cnt.get(x) || 0) - 1)
      if (cnt.get(x) == 0) validCount--
    }
    if (validCount == 0) {
      minLen = Math.min(minLen, right - left + 1)
    }
    while (cnt.get(x) <= 0) {
      let y = s[left]
      if (cnt.has(y)) {
        if (cnt.get(y) == 0) validCount++
        cnt.set(y, (cnt.get(y) || 0) + 1)
      }
    }
  }
  return minLen
};