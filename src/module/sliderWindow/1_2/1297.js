/**
 * @param {string} s
 * @param {number} maxLetters
 * @param {number} minSize
 * @param {number} maxSize
 * @return {number}
 */
var maxFreq = function (s, maxLetters, minSize, maxSize) {
  let cnt = new Map();
  const n = s.length;
  for (let i = 0; i < n - minSize - 1; i++) {
    let cur = s.slice(i, i + minSize);
    let set = new Set(cur);
    if (set.size <= maxLetters) {
      cnt.set(cur, (cnt.get(cur) || 0) + 1);
    }
  }
  return cnt.size == 0 ? 0 : Math.max(...cnt.values());
};
