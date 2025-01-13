/**
 * @param {number} m
 * @param {number} n
 * @param {number[]} horizontalCut
 * @param {number[]} verticalCut
 * @return {number}
 */
var minimumCost = function (m, n, horizontalCut, verticalCut) {
  // 从小到大排序  下面倒序遍历
  horizontalCut.sort((a, b) => a - b);
  verticalCut.sort((a, b) => a - b);
  let ans = 0;
  // 前面横切的数量
  let cntH = 1;
  // 前面竖切的数量
  let cntV = 1;
  let i = m - 2,
    j = n - 2;
  while (i >= 0 || j >= 0) {
    // 谁大就先切谁
    if (j < 0 || (i >= 0 && horizontalCut[i] > verticalCut[j])) {
      // 现在是横切  系数要乘以之前竖切的数量  然后横切数量+1
      ans += horizontalCut[i--] * cntV;
      cntH++;
    } else {
      // 现在是竖切  系数要乘以之前横切的数量   然后竖切数量+1
      ans += verticalCut[j--] * cntH;
      cntV++;
    }
  }
  return ans;
};
