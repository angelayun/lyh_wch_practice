/**
 * @param {string} word
 * @param {number} k
 * @return {number}
 */
var minimumOperationsToMakeKPeriodic = function (word, k) {
  const n = word.length;
  const cnt = new Map();
  for (let i = k; i <= n; i += k) {
    let sub = word.slice(i - k, i);
    cnt.set(sub, (cnt.get(sub) ?? 0) + 1);
  }
  let mx = Math.max(...Array.from(cnt.values()));
  return Math.floor(n / k) - mx;
};
