/**
 * @param {string} word
 * @param {number} k
 * @return {number}
 */
var minimumDeletions = function (word, k) {
  let cnt = new Array(26).fill(0);
  for (let c of word) {
    cnt[c.charCodeAt() - 'a'.charCodeAt()]++;
  }
  cnt.sort((a, b) => a - b);
  let maxSave = 0;
  for (let i = 0; i < 26; i++) {
    let sum = 0;
    for (let j = i; j < 26; j++) {
      // 至多保留cnt[i]+k
      sum += Math.min(cnt[j], cnt[i] + k);
    }
    maxSave = Math.max(maxSave, sum);
  }
  return word.length - maxSave;
};
