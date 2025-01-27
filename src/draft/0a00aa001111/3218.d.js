/**
 * @param {number} m
 * @param {number} n
 * @param {number[]} horizontalCut
 * @param {number[]} verticalCut
 * @return {number}
 */
var minimumCost = function (m, n, horizontalCut, verticalCut) {
  horizontalCut.sort((a, b) => a - b);
  verticalCut.sort((a, b) => a - b);
  let i = 0,
    j = 0;
  let ans = 0;
  while (i < m - 1 || j < n - 1) {
    if (j == n - 1 || (i < m - 1 && horizontalCut[i] < verticalCut[j])) {
      ans += horizontalCut[i++] * (n - j);
    } else {
      ans += verticalCut[j++] * (m - i);
    }
  }
  return ans;
};
