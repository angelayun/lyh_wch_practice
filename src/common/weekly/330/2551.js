/**
 * @param {number[]} weights
 * @param {number} k
 * @return {number}
 */
var putMarbles = function (weights, k) {
  const n = weights.length;
  for (let i = 0; i < n - 1; i++) {
    weights[i] += weights[i + 1];
  }
  
};
