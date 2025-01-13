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
  let ans = 0;
  let i = 0,
    j = 0;
  while (i < m - 1 || j < n - 1) {
    if (j == n - 1 || (i < m - 1 && horizontalCut[i] < verticalCut[j])) {
      ans += horizontalCut[i++] * (n - j);
    } else {
      ans += verticalCut[j++] * (m - i);
    }
  }
  return ans;
};
// 这个用灵神的思路写的果然不一样