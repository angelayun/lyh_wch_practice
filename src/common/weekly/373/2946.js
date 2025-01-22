/**
 * @param {number[][]} mat
 * @param {number} k
 * @return {boolean}
 */
var areSimilar = function (mat, k) {
  const n = mat[0].length;
  k %= n;
  if (k == 0) return true;
  for (let i = 0; i < mat.length; i++) {
    let r = mat[i];
    let r0 = r.slice();
    if (i % 2 == 0) {
      r = [...r.slice(k), ...r.slice(0, k)];
    } else {
      r = [...r.slice(n - k), ...r.slice(0, n - k)];
    }
    if (r.join(',') != r0.join(',')) return false;
  }
  return true;
};
