/**
 * @param {string} word
 * @return {boolean}
 */
var equalFrequency = function (word) {
  const n = word.length;
  for (let i = 0; i < n; i++) {
    let cnt = new Map();
    for (let j = 0; j < n; j++) {
      if (j != i) cnt.set(word[j], (cnt.get(word[j]) || 0) + 1);
    }
    if (new Set(cnt.values()).size == 1) return true;
  }
  return false;
};
