/**
 * @param {number[]} cardPoints
 * @param {number} k
 * @return {number}
 */
var maxScore = function (cardPoints, k) {
  // 求中间最小 中间长度为n-k
  const n = cardPoints.length;
  k = n - k;
  let sum = 0;
  for (let i = 0; i < k; i++) {
    sum += cardPoints[i];
  }
  let total = sum;
  let minSum = sum;
  for (let i = k; i < n; i++) {
    sum += cardPoints[i] - cardPoints[i - k];
    minSum = Math.min(minSum, sum);
    total += cardPoints[i];
  }
  return total - minSum;
};
